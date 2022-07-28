import React, { useState, useRef } from 'react'
import * as THREE from 'three'

class Item extends React.Component {
  
  constructor(props, state) {
    super(props)
    this.initial = {
      position: props.position ?? [0, 0, 0],
      scale: props.scale ?? [1, 1, 1],
      draggable: props.draggable,
    }
    this.grabbing = false
    this.grabBoundingBox = null
    this.grabPosition = null
    this.uuid = null
    this.itemsLocation = []

    this.state = {
      position: (new THREE.Vector3(this.initial.position[0], this.initial.position[1], this.initial.position[2])),
    }
    this.child = React.createElement(this.props.children.type, {
      ...this.props.children.props,
      onUpdate: ((e) => {
        this.props.objectList.current[this.props.nanoid] = { boundingBox: new THREE.Box3().setFromObject(e), whitelist: this.props.whitelist, blacklist: this.props.blacklist }
      })
    })
    // React.cloneElement
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.pointerPosition != nextProps.pointerPosition) {
      this.moveItemPosition()
    }
    return (
      this.state !== nextState || this.grabbing || this.initial.draggable !== nextProps.draggable
    )
  }

  onUpdateSetBoundingBox(e) {
    const boundingBox = new THREE.Box3().setFromObject(e)
    if (Number.isFinite(boundingBox.min.x) || this.props.objectList.current[this.props.nanoid] == undefined) {
      this.props.objectList.current[this.props.nanoid] = { boundingBox: boundingBox, whitelist: this.props.whitelist, blacklist: this.props.blacklist }
    }
  }

  moveItemPosition() {
    const pixel = 64
    if (this.grabbing && this.props.grab.object != null) {
      // console.log(this.props.grab, this.uuid)
      // if (this.props.grab.object.parent.uuid == this.uuid) {
        const objectMoveDelta = this.props.pointerPosition.point.clone().sub(this.props.grab.position ?? (new THREE.Vector3(0, 0, 0)))
        const objectPosition = this.grabPosition.clone().add(objectMoveDelta)
        const objectBoundingBox = { min: this.grabBoundingBox.min.clone().add(objectMoveDelta), max: this.grabBoundingBox.max.clone().add(objectMoveDelta) }

        const leftProjection = this.itemsLocation.filter((v) => ((v.whitelist.left.length == 0 || v.whitelist.left.includes(this.props.tag)) && !v.blacklist.left.includes(this.props.tag))).sort((a, b) => b.max.z - a.max.z)
        const rightProjection = this.itemsLocation.filter((v) => ((v.whitelist.right.length == 0 || v.whitelist.right.includes(this.props.tag)) && !v.blacklist.right.includes(this.props.tag))).sort((a, b) => b.max.x - a.max.x)
        const topProjection = this.itemsLocation.filter((v) => ((v.whitelist.top.length == 0 || v.whitelist.top.includes(this.props.tag)) && !v.blacklist.top.includes(this.props.tag))).sort((a, b) => b.max.y - a.max.y)

        const leftCloseSpaces = [{ x: objectBoundingBox.min.x, y: objectBoundingBox.min.y }, { x: objectBoundingBox.max.x, y: objectBoundingBox.min.y }, { x: objectBoundingBox.min.x, y: objectBoundingBox.max.y }, { x: objectBoundingBox.max.x, y: objectBoundingBox.max.y }]
          .map((v) => { return [v, leftProjection.findIndex((w) => (objectBoundingBox.max.z > w.max.z && w.max.x > v.x && w.min.x < v.x && w.max.y > v.y && w.min.y < v.y))] })
          .filter((v) => v.at(1) != -1)
          .map((v) => [v.at(0), leftProjection.at(v.at(1)), leftProjection.slice(0, v.at(1))])
          .map((v) => {
            return [v.at(0), v.at(1).max.z, v.at(2).reduce((a, c) => { //c: cover, v.at(0): vertex
              return {
                minXDelta: Math.min(a.minXDelta, v.at(0).x > c.max.x ? v.at(0).x - c.max.x : Infinity),
                maxXDelta: Math.min(a.maxXDelta, c.min.x > v.at(0).x ? c.min.x - v.at(0).x : Infinity),
                minYDelta: Math.min(a.minYDelta, v.at(0).y > c.max.y ? v.at(0).y - c.max.y : Infinity),
                maxYDelta: Math.min(a.maxYDelta, c.min.y > v.at(0).y ? c.min.y - v.at(0).y : Infinity),
              }
            }, { minXDelta: v.at(0).x - v.at(1).min.x, maxXDelta: v.at(1).max.x - v.at(0).x, minYDelta: v.at(0).y - v.at(1).min.y, maxYDelta: v.at(1).max.y - v.at(0).y })]
          })
          .filter((v) => ((v.at(2).maxXDelta + v.at(2).minXDelta) > (objectBoundingBox.max.x - objectBoundingBox.min.x) && (v.at(2).maxYDelta + v.at(2).minYDelta) > (objectBoundingBox.max.y - objectBoundingBox.min.y)))
          .map((v) => [v.at(1), { minX: v.at(0).x - v.at(2).minXDelta, maxX: v.at(0).x + v.at(2).maxXDelta, minY: v.at(0).y - v.at(2).minYDelta, maxY: v.at(0).y + v.at(2).maxYDelta }])
        const rightCloseSpaces = [{ z: objectBoundingBox.min.z, y: objectBoundingBox.min.y }, { z: objectBoundingBox.max.z, y: objectBoundingBox.min.y }, { z: objectBoundingBox.min.z, y: objectBoundingBox.max.y }, { z: objectBoundingBox.max.z, y: objectBoundingBox.max.y }]
          .map((v) => { return [v, rightProjection.findIndex((w) => (objectBoundingBox.max.x > w.max.x && w.max.z > v.z && w.min.z < v.z && w.max.y > v.y && w.min.y < v.y))] })
          .filter((v) => v.at(1) != -1)
          .map((v) => [v.at(0), rightProjection.at(v.at(1)), rightProjection.slice(0, v.at(1))])
          .map((v) => {
            return [v.at(0), v.at(1).max.x, v.at(2).reduce((a, c) => {
              return {
                minZDelta: Math.min(a.minZDelta, v.at(0).z > c.max.z ? v.at(0).z - c.max.z : Infinity),
                maxZDelta: Math.min(a.maxZDelta, c.min.z > v.at(0).z ? c.min.z - v.at(0).z : Infinity),
                minYDelta: Math.min(a.minYDelta, v.at(0).y > c.max.y ? v.at(0).y - c.max.y : Infinity),
                maxYDelta: Math.min(a.maxYDelta, c.min.y > v.at(0).y ? c.min.y - v.at(0).y : Infinity),
              }
            }, { minZDelta: v.at(0).z - v.at(1).min.z, maxZDelta: v.at(1).max.z - v.at(0).z, minYDelta: v.at(0).y - v.at(1).min.y, maxYDelta: v.at(1).max.y - v.at(0).y })]
          })
          .filter((v) => ((v.at(2).maxZDelta + v.at(2).minZDelta) > (objectBoundingBox.max.z - objectBoundingBox.min.z) && (v.at(2).maxYDelta + v.at(2).minYDelta) > (objectBoundingBox.max.y - objectBoundingBox.min.y)))
          .map((v) => [v.at(1), { minZ: v.at(0).z - v.at(2).minZDelta, maxZ: v.at(0).z + v.at(2).maxZDelta, minY: v.at(0).y - v.at(2).minYDelta, maxY: v.at(0).y + v.at(2).maxYDelta }])
        const topCloseSpaces = [{ x: objectBoundingBox.min.x, z: objectBoundingBox.min.z }, { x: objectBoundingBox.max.x, z: objectBoundingBox.min.z }, { x: objectBoundingBox.min.x, z: objectBoundingBox.max.z }, { x: objectBoundingBox.max.x, z: objectBoundingBox.max.z }]
          .map((v) => { return [v, topProjection.findIndex((w) => (objectBoundingBox.max.y > w.max.y && w.max.x > v.x && w.min.x < v.x && w.max.z > v.z && w.min.z < v.z))] })
          .filter((v) => v.at(1) != -1)
          .map((v) => [v.at(0), topProjection.at(v.at(1)), topProjection.slice(0, v.at(1))])
          .map((v) => {
            return [v.at(0), v.at(1).max.y, v.at(2).reduce((a, c) => {
              return {
                minXDelta: Math.min(a.minXDelta, v.at(0).x > c.max.x ? v.at(0).x - c.max.x : Infinity),
                maxXDelta: Math.min(a.maxXDelta, c.min.x > v.at(0).x ? c.min.x - v.at(0).x : Infinity),
                minZDelta: Math.min(a.minZDelta, v.at(0).z > c.max.z ? v.at(0).z - c.max.z : Infinity),
                maxZDelta: Math.min(a.maxZDelta, c.min.z > v.at(0).z ? c.min.z - v.at(0).z : Infinity),
              }
            }, { minXDelta: v.at(0).x - v.at(1).min.x, maxXDelta: v.at(1).max.x - v.at(0).x, minZDelta: v.at(0).z - v.at(1).min.z, maxZDelta: v.at(1).max.z - v.at(0).z })]
          })
          .filter((v) => ((v.at(2).maxXDelta + v.at(2).minXDelta) > (objectBoundingBox.max.x - objectBoundingBox.min.x) && (v.at(2).maxZDelta + v.at(2).minZDelta) > (objectBoundingBox.max.z - objectBoundingBox.min.z)))
          .map((v) => [v.at(1), { minX: v.at(0).x - v.at(2).minXDelta, maxX: v.at(0).x + v.at(2).maxXDelta, minZ: v.at(0).z - v.at(2).minZDelta, maxZ: v.at(0).z + v.at(2).maxZDelta }])
        const leftClosestSpace = leftCloseSpaces.reduce((a, c) => {
          const distance = ((v) => v * v)(Math.max(c.at(1).minX - Math.min(c.at(1).minX, objectBoundingBox.min.x), Math.max(objectBoundingBox.max.x, c.at(1).maxX) - c.at(1).maxX))
            + ((v) => v * v)(Math.max(c.at(1).minY - Math.min(c.at(1).minY, objectBoundingBox.min.y), Math.max(objectBoundingBox.max.y, c.at(1).maxY) - c.at(1).maxY))
            + ((v) => v * v)(c.at(0) - objectBoundingBox.min.z)
          return a.distance > distance ? { distance: distance, space: c } : a
        }, { distance: Infinity, space: {} })
        const rightClosestSpace = rightCloseSpaces.reduce((a, c) => {
          const distance = ((v) => v * v)(Math.max(c.at(1).minZ - Math.min(c.at(1).minZ, objectBoundingBox.min.z), Math.max(objectBoundingBox.max.z, c.at(1).maxZ) - c.at(1).maxZ))
            + ((v) => v * v)(Math.max(c.at(1).minY - Math.min(c.at(1).minY, objectBoundingBox.min.y), Math.max(objectBoundingBox.max.y, c.at(1).maxY) - c.at(1).maxY))
            + ((v) => v * v)(c.at(0) - objectBoundingBox.min.x)
          return a.distance > distance ? { distance: distance, space: c } : a
        }, { distance: Infinity, space: {} })
        const topClosestSpace = topCloseSpaces.reduce((a, c) => {
          const distance = ((v) => v * v)(Math.max(c.at(1).minX - Math.min(c.at(1).minX, objectBoundingBox.min.x), Math.max(objectBoundingBox.max.x, c.at(1).maxX) - c.at(1).maxX))
            + ((v) => v * v)(Math.max(c.at(1).minZ - Math.min(c.at(1).minZ, objectBoundingBox.min.z), Math.max(objectBoundingBox.max.z, c.at(1).maxZ) - c.at(1).maxZ))
            + ((v) => v * v)(c.at(0) - objectBoundingBox.min.y)
          return a.distance > distance ? { distance: distance, space: c } : a
        }, { distance: Infinity, space: {} })
        const closestSpace = [leftClosestSpace, rightClosestSpace, topClosestSpace].reduce((a, c, index) => {
          if (Number.isFinite(c.distance)) {
            return a.distance > c.distance ? { ...c, index: index } : a
          }
          return a
        }, { index: -1, distance: Infinity, space: {} })
        if (closestSpace.index != -1 && closestSpace.distance < 5) {
          const moveX = (closestSpace.index == 1) ? closestSpace.space.at(0) - objectBoundingBox.min.x : ((((closestSpace.space.at(1).minX * pixel | 7) + 1) / pixel) - Math.min((((closestSpace.space.at(1).minX * pixel | 7) + 1) / pixel), objectBoundingBox.min.x) + ((closestSpace.space.at(1).maxX * pixel & -8) / pixel)  - Math.max(objectBoundingBox.max.x, ((closestSpace.space.at(1).maxX * pixel & -8) / pixel) ))
          const moveY = (closestSpace.index == 2) ? closestSpace.space.at(0) - objectBoundingBox.min.y : ((((closestSpace.space.at(1).minY * pixel | 7) + 1) / pixel) - Math.min((((closestSpace.space.at(1).minY * pixel | 7) + 1) / pixel), objectBoundingBox.min.y) + ((closestSpace.space.at(1).maxY * pixel & -8) / pixel)  - Math.max(objectBoundingBox.max.y, ((closestSpace.space.at(1).maxY * pixel & -8) / pixel) ))
          const moveZ = (closestSpace.index == 0) ? closestSpace.space.at(0) - objectBoundingBox.min.z : ((((closestSpace.space.at(1).minZ * pixel | 7) + 1) / pixel) - Math.min((((closestSpace.space.at(1).minZ * pixel | 7) + 1) / pixel), objectBoundingBox.min.z) + ((closestSpace.space.at(1).maxZ * pixel & -8) / pixel)  - Math.max(objectBoundingBox.max.z, ((closestSpace.space.at(1).maxZ * pixel & -8) / pixel) ))
          objectPosition.add(new THREE.Vector3(moveX, moveY, moveZ))
          // objectPosition.sub(new THREE.Vector3(objectPosition.x - (objectPosition.x * 64 & -8) / 64, objectPosition.y - (objectPosition.y * 64 & -8) / 64, objectPosition.z - (objectPosition.z * 64 & -8) / 64))
        }
        
        this.setState((state) => {
          return { ...state, position: objectPosition }
        })
      // }
      // else {
      //   
      // }
    }
    else {
      this.grabbing = false
    }
  }

  render() {
    return this.props.draggable ?
    (
      <mesh
        onUpdate={this.onUpdateSetBoundingBox.bind(this)}
        onPointerDown={(e) => {
          this.grabBoundingBox = new THREE.Box3().setFromObject(e.eventObject)
          this.grabPosition = this.state.position
          this.itemsLocation = (Object.entries(this.props.objectList.current)).filter((v) => (v.at(0) != this.props.nanoid)).map((v) => {
            return { nanoid: v.at(0), min: v.at(1).boundingBox.min, max: v.at(1).boundingBox.max, whitelist: v.at(1).whitelist, blacklist: v.at(1).blacklist }
          })
          this.uuid = e.eventObject.uuid
          this.grabbing = true
        }}
        onPointerUp={(e) => {
          if (this.grabbing) {
            this.grabbing = false
            const boundingBox = new THREE.Box3().setFromObject(e.eventObject)
            
            // const radius = Array.from(e.eventObject.position.clone().sub(boundingBox.min))[this.props.pointerPosition.normal]
            // // const boundingBoxVector = boundingBox.max.clone().sub(boundingBox.min)
            // // Array.from(boundingBoxVector)[this.props.pointerPosition.normal] / 2
            // const radiusVector = (new THREE.Vector3(this.props.pointerPosition.normal == 0 ? 1 : 0, this.props.pointerPosition.normal == 1 ? 1 : 0, this.props.pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius + 0.01)
            // this.setState((state) => {
            //   return { ...state, position: radiusVector.add(this.props.pointerPosition.point) }
            // })
            this.props.objectList.current[this.props.nanoid] = { boundingBox: boundingBox, whitelist: this.props.whitelist, blacklist: this.props.blacklist }
          }
        }}
        position={this.state.position}
          rotation={this.props.rotation}
          scale={this.props.scale}
      >
          {this.child}
      </mesh>
    ) : (
      <mesh
        onUpdate={this.onUpdateSetBoundingBox.bind(this)}
        position={this.state.position}
        rotation={this.props.rotation}
        scale={this.props.scale}
      >
          {this.child}
      </mesh>
    )
  }
}

export default Item