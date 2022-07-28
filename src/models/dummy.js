import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'

function Dummy(props) {
    return (
        <mesh
            {...props}
            // onClick={(event) => { props.onClick() }}
            rotation={[Math.PI / 2, 0, 0]}>
            {/* <planeGeometry args={[1, 1]} attach="geometry" /> */}
            <boxGeometry args={[0.9, 0.9, 0.1]} attach="geometry" />
            <meshLambertMaterial color={props.color} attach="material" />
        </mesh>
    )
}

export default Dummy