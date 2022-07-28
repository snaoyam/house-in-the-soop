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
import Item from '../utils/item'
import { nanoid } from 'nanoid'
import Airconditional from '../models/airconditioner'
import Bed from '../models/bed'
import MarsPoster from '../models/marsposter'
import VenusPoster from '../models/venusposter'
import GamePoster from '../models/gameposter'
import Cabinet1 from '../models/cabinet1'
import Cabinet2 from '../models/cabinet2'
import Cabinet3 from '../models/cabinet3'
import Clothes2 from '../models/clothes2'
import Aircontroller from '../models/aircontroller'
import Cosmetic from '../models/cosmetic'
import Notebook from '../models/notebook'
import Nike from '../models/nike'
import Tablee from '../models/tablee'
import Imac from '../models/imac'
import Shoes from '../models/shoes'
import LavaLamp from '../models/lavalamp'
import Backpack from '../models/backpack'
import Chair from '../models/chair'
import TWallBack from '../models/wall_back'

function Effect() {
    const { gl, scene, camera, size } = useThree()
    const renderer = new PostFX(gl)
    return useFrame((state) => {
        renderer.render(scene, camera)
    }, 1)
}

const boxPos = [12, 1, 6]
const objectsPos = [12, 1.7, 6]

const objects = [
    { key: 0, position: objectsPos, child: <Clothes2 /> },
    { key: 1, position: objectsPos, child: <Aircontroller /> },
    { key: 2, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Cosmetic /> },
    { key: 3, position: objectsPos, rotation: [0, Math.PI, 0], child: <Notebook /> },
    { key: 4, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Nike /> },
    { key: 5, position: objectsPos, rotation: [0, Math.PI, 0], child: <Imac /> },
    { key: 6, position: objectsPos, child: <VenusPoster /> },
    { key: 7, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Shoes /> },
    { key: 8, position: objectsPos, rotation: [0, -Math.PI / 2, 0], child: <LavaLamp /> },
    { key: 9, position: objectsPos, rotation: [0, -Math.PI / 2, 0], child: <Backpack /> },
    { key: 10, position: objectsPos, rotation: [Math.PI / 2, 0, -Math.PI / 2], child: <GamePoster /> },
];
const wallThickness = 0.3
const dimension = { a: 50, b: 50, h: 50 } //a: left, b: right, h: height


const Bedroom = () => {
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
                    <Background color="#2C3F59"
                    />
                    <TWallBack position={[-(wallThickness / 2), dimension.h / 2 - wallThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} />
                    <TWallBack position={[dimension.a / 2 - wallThickness / 2, dimension.h / 2 - wallThickness / 2, -wallThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} />
                    <TWallBack position={[dimension.a / 2, -wallThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} />
                    <Room objectList={objectList} pointerPosition={pointerPosition} grab={grab}
                        position={[0, 0, 0]} dimension={{ a: 14, b: 14, h: 10 }} wallThickness={0.3} wallpaperThickness={0.6}
                        bottomWPTexture={useLoader(TextureLoader, '/texture/floor2.webp')}
                        sideWPTextureL={useLoader(TextureLoader, '/texture/whitebrick.jpg')}
                        sideWPTextureR={useLoader(TextureLoader, '/texture/wallpaper2.jpg')}
                        wallColor={{ top: "#808080", bottom: "#9a7b4f", swL: "#d6cfc7", swR: "#d6cfc7" }} />
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[0.5, 8, 6]} rotation={[0, Math.PI / 2, 0]}>
                        <Airconditional /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[4, -0.3, 7.5]}>
                        <Bed /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[4, 3, 0]} >
                        <MarsPoster /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[1, -0.2, 12]} rotation={[0, Math.PI / 2, 0]} >
                        <Cabinet1 /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[11, 0, 1]} >
                        <Cabinet2 /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[1.5, -0.2, 1]} rotation={[0, -Math.PI / 2, 0]}>
                        < Cabinet3 /></Item >
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[11.3, 0, 10.1]} rotation={[0, Math.PI, 0]}>
                        < Tablee /></Item >
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[11, 0, 11]}>
                        < Chair /></Item >
                    < MovingBox
                        positionB={boxPos} positionD={objectsPos} scale={[2, 2, 2]}
                        map={useLoader(TextureLoader, '/texture/box.png')}
                        dummyTexture={useLoader(TextureLoader, '/texture/newspaper.jpeg')} />
                    {Objects(objects).map(({ key, position, rotation, scale, child }) => <Item draggable={true} key={key} position={position} rotation={rotation} scale={scale} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={key}>{child}</Item>)}
                </group >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* <pointLight position={[30, 30, 30]} /> */}
                {/* <OrbitControls /> */}
            </Canvas >
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
                        window.location.href = `/${2}`
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
                        window.location.href = `/${4}`
                    }}
                    src="/arrow.png"
                />
            </Box>
        </Box >
    )
}

export default Bedroom