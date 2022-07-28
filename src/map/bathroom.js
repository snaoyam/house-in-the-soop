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
import Tub from '../models/tub'
import BathSink from '../models/bathSink'
import Toilet from '../models/toilet'
import BathCabinet from '../models/bathCabinet'
import IndoorPlant from '../models/indoorPlant'
import IndoorPlant2 from '../models/indoorPlant2'
import Shampoo from '../models/shampoo'
import Shampoo2 from '../models/shampoo2'
import Rug from '../models/rug'
import ToiletPaper from '../models/toiletPaper'
import Toothbrush1 from '../models/toothbrush1'
import Toothbrush2 from '../models/toothbrush2'
import Toothpaste from '../models/toothpaste'
import Trashcan from '../models/trashcan'
import WashingMachine from '../models/washmachine'
import Mirror from '../models/mirror'
import Hamper from '../models/hamper'
import WindowFrame from '../models/windowframe'
import Blinds from '../models/blinds'
import Towel from '../models/towel'
import TowelBasket from '../models/towelbasket'
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

const boxPos = [13, 1, 6]
const objectsPos = [13, 1.7, 6]

const objects = [
    { key: 0, position: objectsPos, child: <IndoorPlant /> },
    { key: 1, position: objectsPos, child: <IndoorPlant2 /> },
    { key: 2, position: objectsPos, rotation: [-Math.PI / 2, 0, 0], child: <Toothbrush1 /> },
    { key: 3, position: objectsPos, rotation: [-Math.PI / 2, 0, 0], child: <Toothbrush2 /> },
    { key: 4, position: objectsPos, child: <Toothpaste /> },
    { key: 5, position: objectsPos, child: <Shampoo /> },
    { key: 6, position: objectsPos, child: <Shampoo2 /> },
    { key: 7, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Towel /> },
];
const wallThickness = 0.3
const dimension = { a: 50, b: 50, h: 50 } //a: left, b: right, h: height

const Bathroom = () => {
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
                    <Background color="#684536"
                    />
                    <TWallBack position={[-(wallThickness / 2), dimension.h / 2 - wallThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} />
                    <TWallBack position={[dimension.a / 2 - wallThickness / 2, dimension.h / 2 - wallThickness / 2, -wallThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} />
                    <TWallBack position={[dimension.a / 2, -wallThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} />
                    <Room objectList={objectList} pointerPosition={pointerPosition} grab={grab}
                        position={[0, 0, 0]} dimension={{ a: 15, b: 12, h: 10 }} wallThickness={0.5} wallpaperThickness={0.3}
                        bottomWPTexture={useLoader(TextureLoader, '/texture/tile.jpg')}
                        sideWPTextureL={useLoader(TextureLoader, '/texture/floor3.jpg')}
                        sideWPTextureR={useLoader(TextureLoader, '/texture/floor3.jpg')}
                        wallColor={{ top: "#D9D9D9", bottom: "#D9D9D9", swL: "#efe7db", swR: "#808080" }} />
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[-17, -1, 6]} rotation={[0, Math.PI / 2, 0]}>
                        <Tub /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[6, 0, 1]}>
                        <BathSink /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[12, 0, 1]}>
                        <Toilet /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[6, 0, 3]} rotation={[0, Math.PI / 2, 0]}>
                        <Rug /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[1.5, 0, 2.5]} rotation={[0, Math.PI / 2, 0]}>
                        <WashingMachine /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[1, 0, 5]}>
                        <Hamper /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[15, 3, 1]} rotation={[0, -Math.PI / 2, 0]}>
                        <ToiletPaper /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[18.5, 0, 2]}>
                        <Trashcan /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[6, 5.5, 0.1]}>
                        <Mirror /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[7, 12, 12]} rotation={[0, Math.PI / 2, 0]}>
                        <WindowFrame /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[7, 11.5, 17.7]} rotation={[0, Math.PI / 2, 0]}>
                        <Blinds /></Item>
                    <Item draggable={false} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}
                        position={[13, 0, 10]} rotation={[0, Math.PI / 2, 0]}>
                        <TowelBasket /></Item>
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
                        window.location.href = `/${0}`
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
                        window.location.href = `/${2}`
                    }}
                    src="/arrow.png"
                />
            </Box>
        </Box>
    )
}

export default Bathroom