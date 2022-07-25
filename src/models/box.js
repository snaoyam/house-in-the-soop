import { useState } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { usePlane, useBox } from '@react-three/cannon'
// import { useDrag } from "@use-gesture/react"
// import { useDragConstraint } from '../utils/cursor'


function TBox(props) {
  // const [ref, api] = useBox(() => ({ mass: 1, ...props}))
  // const bind = useDragConstraint(ref)
  const [position, setPosition] = useState({position: new THREE.Vector3(props.position[0], props.position[1], props.position[2]), grab: false, positionDiff: null})
  return (
    <mesh 
      /*ref={ref} {...bind}*/
      onPointerDown={(e) => {
        e.stopPropagation()
        setPosition(v => { return {...v, grab: true, startCursorPosition: props.pointerPosition.point } })
      }}
      onPointerUp={(e) => {
        if(position.grab) {
          const radius = Array.from(e.eventObject.scale)[props.pointerPosition.normal] / 2
          // const Array.from(e.eventObject.position)[props.pointerPosition.normal] - Array.from(props.pointerPosition.position)[props.pointerPosition.normal]
          const radiusVector = (new THREE.Vector3(props.pointerPosition.normal == 0 ? 1 : 0, props.pointerPosition.normal == 1 ? 1 : 0, props.pointerPosition.normal == 2 ? 1 : 0)).multiplyScalar(radius)
          setPosition(() => {
            return { position: radiusVector.add(props.pointerPosition.point), grab: false, positionDiff: null }
          })
        }
      }}
      position={position.grab ? ( position.position.clone().add(props.pointerPosition.point.clone().sub(position.startCursorPosition)) ) : position.position} 
      rotation={props.rotation} 
      scale={props.scale}
      // onClick={(e) => console.log('click')}
      // onContextMenu={(e) => console.log('context menu')}
      // onDoubleClick={(e) => console.log('double click')}
      // onWheel={(e) => console.log('wheel spins')}
      // onPointerUp={(e) => console.log('up')}
      // onPointerDown={(e) => console.log('down')}
      // onPointerOver={(e) => console.log('over')}
      // onPointerOut={(e) => console.log('out')}
      // onPointerEnter={(e) => console.log('enter')} // see note 1
      // onPointerLeave={(e) => console.log('leave')} // see note 1
      // onPointerMove={console.log}
      >
      <boxGeometry attach="geometry"/>
      <meshLambertMaterial color={props.color} attach="material" side={THREE.DoubleSide} transparent={true} opacity={position.grab ? 0.4 : 1}  />
    </mesh>
  )
}

export default TBox