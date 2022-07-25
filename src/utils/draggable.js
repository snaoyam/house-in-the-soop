import { useState, useRef } from 'react'
import * as THREE from 'three'

function Draggable({ pointerPosition, grab, child }) {
  const [objectPosition, setObjectPosition] = useState(new THREE.Vector3(child.props.position[0], child.props.position[1], child.props.position[2]))
  const objectGrab = useRef(false)
  return (
    <mesh
      onPointerDown={() => { objectGrab.current = true }}
      onPointerUp={(e) => {
        if (objectGrab.current) {
          objectGrab.current = false
          const radius = Array.from(e.eventObject.scale)[pointerPosition.normal] / 2
          const radiusVector = (new THREE.Vector3(pointerPosition.normal == 0 ? 1 : 0, pointerPosition.normal == 1 ? 1 : 0, pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius)
          setObjectPosition(radiusVector.add(pointerPosition.point))
        }
      }}
      position={(objectGrab.current && grab.object != null) ? objectPosition.clone().add(pointerPosition.point.clone().sub(grab.position)) : objectPosition}
      rotation={child.props.rotation}
      scale={child.props.scale}
    >
      {child}
    </mesh>
  )
}

export default Draggable