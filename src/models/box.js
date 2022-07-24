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
        setPosition(v => { return {...v, grab: true, startCursorPosition: props.pointerPosition } })
      }}
      onPointerUp={() => {
        setPosition(v => {
          return {position: v.position.clone().add(props.pointerPosition.clone().sub(position.startCursorPosition)), grab: false, positionDiff: null}
        })
      }}
      position={position.grab ? ( position.position.clone().add(props.pointerPosition.clone().sub(position.startCursorPosition)) ) : position.position} 
      rotation={props.rotation} 
      scale={1}
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
      <boxGeometry args={props.scale} attach="geometry"/>
      <meshLambertMaterial color={props.color} attach="material" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default TBox