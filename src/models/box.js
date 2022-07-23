import { useState } from 'react'
import { DoubleSide } from "three"
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { usePlane, useBox } from '@react-three/cannon'
// import { useDrag } from "@use-gesture/react"
import { useDragConstraint } from '../utils/drag'


function TBox(props) {
  const [ref, api] = useBox(() => ({ mass: 1, ...props}))
  // const [boxPosition, setBoxPosition] = useState(props.position)
  // const { size, viewport } = useThree();
  // const aspect = size.width / viewport.width;
  // const bind = useDrag(({ offset: [x, y] }) => {
  //   const [ , ,z] = boxPosition
  //   setBoxPosition([x / aspect, -y / aspect, z]);
  // }, { pointerEvents: true })
  const bind = useDragConstraint(ref)
  return (
    <mesh 
      ref={ref} {...bind}
      position={props.position} 
      rotation={props.rotation} 
      scale={1}
      // onClick={e => console.log('click')}
      // onPointerOver={e => console.log('hover')}
      // onPointerOut={e => console.log('unhover')}
      >
      <boxGeometry args={props.scale} attach="geometry"/>
      <meshLambertMaterial color={props.color} attach="material" side={DoubleSide} />
    </mesh>
  )
}

export default TBox