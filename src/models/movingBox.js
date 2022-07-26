import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'


var inBox = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 총 n개의 objects 가 있음. 0: 박스에 없음, 1: 박스에 있음
var renderObjects = [];
var index = 0;
var yPos = 1.7;
var isEmpty = false;

function f() {
    inBox[index] = 0;
}

function Objects(objectsList) {
    if ((index < objectsList.length) && (inBox[index] == 0)) {
        renderObjects.push(objectsList[index])
        index++;
        if (index == objectsList.length) {
            yPos = 0;
            isEmpty = true;
        } else { yPos -= 0.12 }
    }
    return renderObjects
}


var open = false;
var constraint = 100;

function Box({ map, ...props }) {
    const ref = useRef()

    return (
        <mesh
            {...props}
            ref={ref}>
            <boxGeometry args={[1, 1, 0.02]} />
            <meshStandardMaterial map={map} color="#FFFFFF" />
        </mesh>
    )
}

function BoxUp({ sign, map, ...props }) {
    const ref = useRef()

    useFrame(() => {
        if ((open) && (constraint >= 0)) {
            ref.current.rotation.z -= sign * 0.07
            constraint -= 0.9;
        }
    })

    return (
        <group
            ref={ref}
            rotation={[0, 0, Math.PI]}
            position={[sign * 0.5, 0.5, 0]}>
            <mesh
                {...props}
                position={[sign * 0.25, 0, 0]}>
                <boxGeometry args={[0.5, 0.02, 1]} />
                <meshStandardMaterial map={map} color="#FFFFFF" />
            </mesh>
        </group>
    )
}

const clicked = () => {
    if (!open) { constraint = 100; open = true; }
    else { f() }
}

function MovingBox(props) {
    const mov = useRef()
    const dummy = useRef()

    useFrame(() => {
        dummy.current.position.y = yPos
        if ((isEmpty) && (mov.current.scale.x >= 0)) {
            mov.current.scale.x -= 0.1
            dummy.current.scale.x = 0
            dummy.current.scale.y = 0
            if (mov.current.scale.x < 0.2) {
                mov.current.scale.x = 0
                mov.current.scale.y = 0
            }
        }
    })

    return (
        <group>
            <mesh
                ref={dummy}
                position={props.positionD}
                scale={props.scale}
                rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[0.9, 0.9, 0.1]} attach="geometry" />
                <meshBasicMaterial map={props.dummyTexture} attach="material" />
            </mesh>
            <group
                ref={mov}
                position={props.positionB}
                scale={props.scale}
                onClick={(event) => {
                    event.stopPropagation()
                    clicked()
                }}>
                <BoxUp sign={1} map={props.map} key={1} />
                <BoxUp sign={-1} map={props.map} key={2} />
                <Box map={props.map} key={3} position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <Box map={props.map} key={4} position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <Box map={props.map} key={5} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
                <Box map={props.map} key={6} position={[0, 0, 0.5]} rotation={[0, 0, 0]} />
                <Box map={props.map} key={7} position={[0, 0, -0.5]} rotation={[0, 0, 0]} />
            </group>
        </group>
    )
}

export { MovingBox, Objects }