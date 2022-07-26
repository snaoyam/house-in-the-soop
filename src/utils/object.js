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
      objectPosition: (new THREE.Vector3(props.position[0], props.position[1], props.position[2]))
    }
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
        onPointerDown={() => {
          this.objectGrab = true
        }}
        onPointerUp={(e) => {
          if (this.objectGrab) {
            this.objectGrab = false
            const boundingBox = new THREE.Box3().setFromObject(e.eventObject)
            const radius = Array.from(e.eventObject.position.clone().sub(boundingBox.min))[this.props.pointerPosition.normal]
            // const bindingBoxVector = boundingBox.max.clone().sub(boundingBox.min)
            // Array.from(bindingBoxVector)[this.props.pointerPosition.normal] / 2
            const radiusVector = (new THREE.Vector3(this.props.pointerPosition.normal == 0 ? 1 : 0, this.props.pointerPosition.normal == 1 ? 1 : 0, this.props.pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius)
            this.setState((state) => {
              return { ...state, objectPosition: radiusVector.add(this.props.pointerPosition.point) }
            })
          }
        }}
        position={(this.objectGrab && this.props.grab.object != null) ? this.state.objectPosition.clone().add(this.props.pointerPosition.point.clone().sub(this.props.grab.position ?? (new THREE.Vector3(0, 0, 0)))) : this.state.objectPosition}
        rotation={this.props.rotation}
        scale={this.props.scale}
      >
        {this.props.child}
      </mesh>
    ) : (
      <mesh
        position={this.state.objectPosition}
        rotation={this.props.rotation}
        scale={this.props.scale}
      >
          {this.props.child}
      </mesh>
    )
  }
}

export default Object