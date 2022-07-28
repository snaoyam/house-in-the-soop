function Background(props) {
    return (
        <mesh
            position={[-1, -1, -1]} rotation={[-Math.PI / 4, Math.PI / 4, Math.PI / 4]} scale={1}>
            <planeGeometry args={[45, 45]} />
            <meshBasicMaterial map={props.map} color={props.color} attach="material" />
        </mesh>
    )
}

export default Background