import React, { useState, useRef } from 'react'
import * as THREE from 'three'

class Object extends React.Component {
  
  constructor(props, state) {
    super(props)
    this.initial = {
      position: props.position,
      scale: props.scale,
      draggable: props.draggable,
    }
    this.objectGrab = false
    this.state = {
      objectPosition: (new THREE.Vector3(props.position[0], props.position[1], props.position[2])),
      boundingBox: null
    }
    this.child = React.createElement(this.props.children.type, {
      ...this.props.children.props,
      onUpdate: ((e) => {
        this.props.objectList.current[this.props.nanoid] = new THREE.Box3().setFromObject(e)
      })
    })
    // React.cloneElement
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state !== nextState || this.objectGrab || this.initial.draggable !== nextProps.draggable
    )
  }

  render() {
    return this.props.draggable ?
    (
      <mesh
        onUpdate={((e) => {
          const boundingBox = new THREE.Box3().setFromObject(e)
          if(Number.isFinite(boundingBox.min.x)) {
            this.props.objectList.current[this.props.nanoid] = boundingBox
          }
        })}
        onPointerDown={() => {
          this.objectGrab = true
        }}
        onPointerUp={(e) => {
          if (this.objectGrab) {
            this.objectGrab = false
            const boundingBox = new THREE.Box3().setFromObject(e.eventObject)
            this.props.objectList.current[this.props.nanoid] = boundingBox
            const radius = Array.from(e.eventObject.position.clone().sub(boundingBox.min))[this.props.pointerPosition.normal]
            // const boundingBoxVector = boundingBox.max.clone().sub(boundingBox.min)
            // Array.from(boundingBoxVector)[this.props.pointerPosition.normal] / 2
            const radiusVector = (new THREE.Vector3(this.props.pointerPosition.normal == 0 ? 1 : 0, this.props.pointerPosition.normal == 1 ? 1 : 0, this.props.pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius + 0.01)
            this.setState((state) => {
              return { ...state, objectPosition: radiusVector.add(this.props.pointerPosition.point) }
            })
          }
        }}
        position={(this.objectGrab && this.props.grab.object != null) ? this.state.objectPosition.clone().add(this.props.pointerPosition.point.clone().sub(this.props.grab.position ?? (new THREE.Vector3(0, 0, 0)))) : this.state.objectPosition}
        rotation={this.props.rotation}
        scale={this.props.scale}
      >
          {this.child}
      </mesh>
    ) : (
      <mesh
        onUpdate={((e) => {
          const boundingBox = new THREE.Box3().setFromObject(e)
          if (Number.isFinite(boundingBox.min.x)) {
            this.props.objectList.current[this.props.nanoid] = boundingBox
          }
        })}
        position={this.state.objectPosition}
        rotation={this.props.rotation}
        scale={this.props.scale}
      >
          {this.child}
      </mesh>
    )
  }
}

export default Object