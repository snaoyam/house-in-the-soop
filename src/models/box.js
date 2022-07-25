import * as THREE from 'three'

function TBox({ color, position }) {
  return (
    <mesh>
      <boxGeometry attach="geometry" />
      <meshLambertMaterial color={color} attach="material" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default TBox