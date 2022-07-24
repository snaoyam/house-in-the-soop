import { DoubleSide } from "three"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { usePlane, useBox } from '@react-three/cannon'


function TWall(props) {
  //const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
  const [ref, api] = useBox(() => ({ type: 'Static', args: props.scale, mass: 1, ...props}))
  return (
    <mesh ref={ref} position={props.position} rotation={props.rotation} scale={1}>
      <boxGeometry args={props.scale} />
      <meshLambertMaterial color={props.color} attach="material" side={DoubleSide} />
    </mesh>
  )
}

export default TWall