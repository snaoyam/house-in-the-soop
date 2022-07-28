import { DoubleSide } from "three"
import { Edges } from '@react-three/drei'


function TWall(props) {
  //const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
  // const [ref, api] = useBox(() => ({ type: 'Static', args: props.scale, mass: 0, ...props}))
  return (
    <group>
      <mesh /*ref={ref}*/ material-transparent material-opacity={0} position={props.position} rotation={props.rotation} scale={1}>
        <boxGeometry args={props.scale} />
        <meshLambertMaterial color={'white'} attach="material" side={DoubleSide} transparent opacity={0} />
      </mesh>
    </group>
  )
}

export default TWall