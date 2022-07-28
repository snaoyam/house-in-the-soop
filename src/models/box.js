import * as THREE from 'three'
import { Edges } from '@react-three/drei'

function TBox({ color, position }) {
  return (
    <mesh>
      <boxGeometry attach="geometry" />
      <meshLambertMaterial color={color} attach="material" side={THREE.DoubleSide} />
      <Edges />
    </mesh>
  )
}

export default TBox