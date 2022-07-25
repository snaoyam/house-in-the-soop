import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'


var open = false;
var constraint = 100;

function Box({ map, ...props }) {
    const ref = useRef()

    return (
        <mesh
            {...props}
            ref={ref}
        // onClick={(event) => { clicked() }}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
        >
            <boxGeometry args={[1, 1, 0.02]} />
            <meshStandardMaterial map={map} color="#FFFFFF" />
        </mesh>
    )
}

function BoxUpR({ map, ...props }) {
    const ref = useRef()

    useFrame(() => {
        if ((open) && (constraint >= 0)) {
            ref.current.rotation.z -= 0.04
            // console.log(constraint);
            constraint -= 0.5;
        }
    })

    return (
        <group
            ref={ref}
            rotation={[0, 0, Math.PI]}
            position={[0.5, 0.5, 0]}>
            <mesh
                {...props}
                position={[0.25, 0, 0]}
            >
                <boxGeometry args={[0.5, 0.02, 1]} />
                <meshStandardMaterial map={map} color="#FFFFFF" />
            </mesh>
        </group>
    )
}

function BoxUpL({ map, ...props }) {
    const ref = useRef()

    useFrame(() => {
        if ((open) && (constraint >= 0)) {
            ref.current.rotation.z += 0.04
            // console.log(constraint);
            constraint -= 0.5;
        }
    })

    return (
        <group
            ref={ref}
            rotation={[0, 0, Math.PI]}
            position={[-0.5, 0.5, 0]}>
            <mesh
                {...props}
                position={[-0.25, 0, 0]}
            >
                <boxGeometry args={[0.5, 0.02, 1]} />
                <meshStandardMaterial map={map} color="#FFFFFF" />
            </mesh>
        </group>
    )
}

const clicked = (props) => {
    // console.log('dfs')
    if (!open) { constraint = 100; open = true; }
    else {
        props.onClick()
    }
}

function MovingBox(props) {
    return (
        <group
            onClick={(event) => {
                event.stopPropagation()
                clicked(props)
            }}
        // onClick={(event) => { props.onClick() }}
        >
            <BoxUpL map={props.map} key={1} />
            <BoxUpR map={props.map} key={2} />
            <Box map={props.map} key={3} position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Box map={props.map} key={4} position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Box map={props.map} key={5} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
            <Box map={props.map} key={6} position={[0, 0, 0.5]} rotation={[0, 0, 0]} />
            <Box map={props.map} key={7} position={[0, 0, -0.5]} rotation={[0, 0, 0]} />
        </group>
    )
}

export default MovingBox