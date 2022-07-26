import { DoubleSide } from "three"
import { Edges } from '@react-three/drei'


function Wallpaper(props) {
    return (
        <mesh
            position={props.position}
            rotation={props.rotation}
            map={props.map}
            scale={1}>
            <boxGeometry args={props.scale} attach="geometry" />
            <meshLambertMaterial map={props.map} color={props.color} side={DoubleSide} attach="material" />
            <Edges />
        </mesh>
    )
}

export default Wallpaper