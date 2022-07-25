import { useState, useRef } from 'react'
import * as THREE from 'three'

function TBox(props) {
  const [position, setPosition] = useState(new THREE.Vector3(props.position[0], props.position[1], props.position[2]))
  const grab = useRef(false)
  return (
    <mesh 
      onPointerDown={() => {grab.current = true}}
      onPointerUp={(e) => {
        if (grab.current) {
          grab.current = false
          const radius = Array.from(e.eventObject.scale)[props.pointerPosition.normal] / 2
          const radiusVector = (new THREE.Vector3(props.pointerPosition.normal == 0 ? 1 : 0, props.pointerPosition.normal == 1 ? 1 : 0, props.pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius)
          setPosition(radiusVector.add(props.pointerPosition.point))
        } 
      }}
      position={(grab.current && props.grab.object != null) ? position.clone().add(props.pointerPosition.point.clone().sub(props.grab.position)) : position }
      rotation={props.rotation} 
      scale={props.scale}
      >
      <boxGeometry attach="geometry"/>
      <meshLambertMaterial color={props.color} attach="material" side={THREE.DoubleSide} transparent={true} opacity={grab.current ? 0.3 : 1}  />
    </mesh>
  )
}

export default TBox