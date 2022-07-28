import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Box } from '@mui/material'
import * as THREE from 'three'
import Room from '../models/room'
import React, { useRef, useState } from "react"
import Draggable from '../utils/item.js'
import { MovingBox, Objects } from '../models/movingBox'
import { TextureLoader } from 'three'
import PostFX from '../utils/PostFX'
import Background from '../models/background'
import KitchenSet from '../models/kitchenset'
import DiningTable from '../models/diningTable'
import FlowerVase1 from '../models/flowervase1'
import FlowerVase2 from '../models/flowervase2'
import CoffeeMachine from '../models/coffeemachine'
import DiningCabinet from '../models/diningCabinet'
import Chicken from '../models/chicken'
import WoodTray from '../models/woodtray'
import Souce from '../models/souce'
import Plant2 from '../models/plant2'
import Dishes from '../models/dishes'
import Shelves from '../models/shelves'
import Item from '../utils/item'
import { nanoid } from 'nanoid'
import TWallBack from '../models/wall_back'

function Effect() {
    const { gl, scene, camera, size } = useThree()
    const renderer = new PostFX(gl)
    return useFrame((state) => {
        renderer.render(scene, camera)
    }, 1)
}

const boxPos = [10, 1, 9]
const objectsPos = [10, 1.7, 9]

const objects = [
    { key: 0, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <CoffeeMachine /> },
    { key: 1, position: objectsPos, child: <FlowerVase1 /> },
    { key: 2, position: objectsPos, child: <FlowerVase2 /> },
    { key: 3, position: objectsPos, child: <Chicken /> },
    { key: 4, position: objectsPos, child: <WoodTray /> },
    { key: 5, position: objectsPos, child: <Souce /> },
    { key: 6, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Dishes /> },
];
const wallThickness = 0.3
const dimension = { a: 50, b: 50, h: 50 } //a: left, b: right, h: height

const Kitchen = () => {
    const cameraPosition = [30, 20, 30]
    const [pointerPosition, setPointerPosition] = useState({ point: null, normal: null })
    const [grab, setGrab] = useState({ object: null, position: null })
    const objectList = useRef({})

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
        }}>
            <Canvas style={{ height: "100vh", width: "100vw" }}
                orthographic camera={{ zoom: 40, position: cameraPosition }}>
                <group material="shader"
                    onPointerDown={(e) => {
                        e.stopPropagation()
                        document.body.style.cursor = 'grabbing'
                        setGrab({
                            object: e.intersections.at(0).object,
                            position: (e.intersections.filter((v) => (v.object.uuid !== e.intersections.at(0).object.uuid)).at(0) ?? { point: null }).point
                        })
                    }}
                    onPointerMove={(e) => {
                        e.stopPropagation()
                        const intersectObject = grab.object !== null ? e.intersections.filter((v) => (v.object.uuid !== grab.object.uuid)) : e.intersections
                        if (intersectObject.length > 0) {
                            const intersection = intersectObject.at(0).point
                            const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersectObject.at(0).object.matrixWorld)
                            const normalVector = intersectObject.at(0).face.normal.clone().applyMatrix3(normalMatrix).normalize()
                            const newNormalVector = ((a, b, c) => (a && !c ? 0 : (b && !a ? 1 : 2)))(normalVector.x > normalVector.y, normalVector.y > normalVector.z, normalVector.z > normalVector.x)
                            setPointerPosition({ point: intersection, normal: newNormalVector })
                        }
                    }}
                    onPointerUp={(e) => {
                        e.stopPropagation()
                        document.body.style.cursor = 'unset'
                        setGrab({ object: null, position: null })
                    }}
                >
                    <Effect />
                    <Background color="#bfc7d6"
                    />
                    <TWallBack position={[-(wallThickness / 2), dimension.h / 2 - wallThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} />
                    <TWallBack position={[dimension.a / 2 - wallThickness / 2, dimension.h / 2 - wallThickness / 2, -wallThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} />
                    <TWallBack position={[dimension.a / 2, -wallThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} />
                    <Room objectList={objectList} pointerPosition={pointerPosition} grab={grab}
                        position={[0, 0, 0]} dimension={{ a: 12, b: 16, h: 10 }} wallThickness={0.3} wallpaperThickness={0.6}
                        bottomWPTexture={useLoader(TextureLoader, '/texture/floor2.webp')}
                        sideWPTextureL={useLoader(TextureLoader, '/texture/whitetile.jpg')}
                        sideWPTextureR={useLoader(TextureLoader, '/texture/whitetile.jpg')}
                        wallColor={{ top: "#f9e3be", bottom: "#f9e3be", swL: "#b39283", swR: "#b39283" }} />
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[1.5, 0, 6]} rotation={[0, Math.PI / 2, 0]}>
                        <KitchenSet /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[8.5, 3.5, 1.5]} rotation={[0, Math.PI / 2, 0]}>
                        <DiningTable /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[7.5, 0, 14]} rotation={[0, Math.PI, 0]} >
                        <DiningCabinet /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[11, 0, 14.5]} >
                        <Plant2 /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[1.3, 2, 14]} rotation={[0, Math.PI / 2, 0]} >
                        <Shelves /></Item>
                    <MovingBox
                        positionB={boxPos} positionD={objectsPos} scale={[2, 2, 2]}
                        map={useLoader(TextureLoader, '/texture/box.png')}
                        dummyTexture={useLoader(TextureLoader, '/texture/newspaper.jpeg')} />
                    {Objects(objects).map(({ key, position, rotation, scale, child }) => <Item draggable={true} key={key} position={position} rotation={rotation} scale={scale} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={key}>{child}</Item>)}
                </group>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* <OrbitControls /> */}
            </Canvas>
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: 'calc(100% - 100px)',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 50px',
            }}>
                <Box
                    component="img"
                    sx={{
                        height: '100%',
                        transform: 'scaleX(-1)',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        window.location.href = `/${1}`
                    }}
                    src="/arrow.png"
                />
                <Box
                    component="img"
                    sx={{
                        height: '100%',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        window.location.href = `/${3}`
                    }}
                    src="/arrow.png"
                />
            </Box>
        </Box>
    )
}

export default Kitchen