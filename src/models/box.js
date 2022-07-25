import { useState } from 'react'
import * as THREE from 'three'

function TBox(props) {
  const [position, setPosition] = useState({position: new THREE.Vector3(props.position[0], props.position[1], props.position[2]), grab: false, positionDiff: null})
  return (
    <mesh 
      /*ref={ref} {...bind}*/
      onPointerDown={(e) => {
        setPosition(v => { return {...v, grab: true, startCursorPosition: props.pointerPosition.point } })
      }}
      onPointerUp={(e) => {
        if(position.grab) {
          const radius = Array.from(e.eventObject.scale)[props.pointerPosition.normal] / 2
          const radiusVector = (new THREE.Vector3(props.pointerPosition.normal == 0 ? 1 : 0, props.pointerPosition.normal == 1 ? 1 : 0, props.pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius)
          setPosition(() => {
            return { position: radiusVector.add(props.pointerPosition.point), grab: false, positionDiff: null }
          })
        }
      }}
      position={position.grab ? ( position.position.clone().add(props.pointerPosition.point.clone().sub(position.startCursorPosition)) ) : position.position} 
      rotation={props.rotation} 
      scale={props.scale}
      >
      <boxGeometry attach="geometry"/>
      <meshLambertMaterial color={props.color} attach="material" side={THREE.DoubleSide} transparent={true} opacity={position.grab ? 0.4 : 1}  />
    </mesh>
  )
}

export default TBox