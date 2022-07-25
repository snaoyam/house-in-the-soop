function Wallpaper(props) {
    return (
        <mesh
            position={props.position}
            rotation={props.rotation}
            scale={1}>
            <boxGeometry args={props.scale} />
            <meshLambertMaterial color={props.color} attach="material" side={DoubleSide} />
            <Edges />

        </mesh>
    )
}

export default Wallpaper