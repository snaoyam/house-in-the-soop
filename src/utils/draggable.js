import { useState, useRef } from 'react'
import * as THREE from 'three'

function Draggable({ position, rotation, scale, pointerPosition, grab, child }) {
  const [objectPosition, setObjectPosition] = useState(new THREE.Vector3(position[0], position[1], position[2]))
  const objectGrab = useRef(false)
  
  return (
    <mesh
      onPointerDown={() => { 
        objectGrab.current = true
      }}
      onPointerUp={(e) => {
        if (objectGrab.current) {
          objectGrab.current = false
          const boundingBox = new THREE.Box3().setFromObject(e.eventObject)
          const radius = Array.from(e.eventObject.position.clone().sub(boundingBox.min))[pointerPosition.normal]
          // const bindingBoxVector = boundingBox.max.clone().sub(boundingBox.min)
          // Array.from(bindingBoxVector)[pointerPosition.normal] / 2
          const radiusVector = (new THREE.Vector3(pointerPosition.normal == 0 ? 1 : 0, pointerPosition.normal == 1 ? 1 : 0, pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius)
          setObjectPosition(radiusVector.add(pointerPosition.point))
        }
      }}
      position={(objectGrab.current && grab.object != null) ? objectPosition.clone().add(pointerPosition.point.clone().sub(grab.position ?? (new THREE.Vector3(0, 0, 0)))) : objectPosition}
      rotation={rotation}
      scale={scale}
    >
      {child}
    </mesh>
  )
}

export default Draggable