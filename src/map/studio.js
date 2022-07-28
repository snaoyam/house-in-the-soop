import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Box } from '@mui/material'
import * as THREE from 'three'
import Room from '../models/room'
import React, { useRef, useState } from "react"
import Draggable from '../utils/draggable.js'
import { MovingBox, Objects } from '../models/movingBox'
import { TextureLoader } from 'three'
import PostFX from '../utils/PostFX'
import Background from '../models/background'
import GameChair from '../models/gamechair'
import GameDesktop from '../models/gamedesktop'
import Poster2 from '../models/poster2'
import Rug3 from '../models/rug3'
import Arcade from '../models/arcade'
import Binback from '../models/binback'
import Projector from '../models/projector'
import Music from '../models/music'
import Speakers from '../models/speakers'
import Nintendo from '../models/nintendo'
import CoffeeTable from '../models/coffeetable'

function Effect() {
    const { gl, scene, camera, size } = useThree()
    const renderer = new PostFX(gl)
    return useFrame((state) => {
        renderer.render(scene, camera)
    }, 1)
}

const boxPos = [2, 1, 5]
const objectsPos = [2, 1.7, 5]

const objects = [
    { key: 0, position: objectsPos, rotation: [Math.PI / 2, 0, 0], child: <Poster2 /> },
    { key: 1, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Binback /> },
    { key: 2, position: objectsPos, child: <Music /> },
    { key: 3, position: objectsPos, child: <Nintendo /> },
    { key: 4, position: objectsPos, child: <CoffeeTable /> },
];

const Studio = () => {
    const cameraPosition = [30, 20, 30]
    const [pointerPosition, setPointerPosition] = useState({ point: null, normal: null })
    const [grab, setGrab] = useState({ object: null, position: null })

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
                    <Background color="#e8bcf0"
                    />
                    <Room position={[0, 0, 0]} dimension={{ a: 12, b: 15, h: 10 }} wallThickness={0.3} wallpaperThickness={0.6}
                        bottomWPTexture={useLoader(TextureLoader, '/texture/floor2.webp')}
                        // sideWPTextureL={useLoader(TextureLoader, '/texture/whitetile.jpg')}
                        // sideWPTextureR={useLoader(TextureLoader, '/texture/whitetile.jpg')}
                        wallColor={{ top: "#cbab7c", bottom: "#cbab7c", swL: "#003366", swR: "#ffffff" }} />
                    <Draggable position={[8.5, 0, 4.5]} rotation={[0, Math.PI, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <GameChair />
                    } />
                    <Draggable position={[9, 3, 2.5]} rotation={[0, -Math.PI / 2, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <GameDesktop />
                    } />
                    <Draggable position={[1, 4, 8]} rotation={[0, Math.PI / 2, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <Projector />
                    } />
                    <Draggable position={[1, 0, 10]} rotation={[0, Math.PI / 2, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <Speakers />
                    } />
                    <Draggable position={[2, 4, 4]} rotation={[0, Math.PI / 5, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <Arcade />
                    } />
                    <Draggable position={[6, 0, 7]} rotation={[0, Math.PI / 2, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <Rug3 />
                    } />
                    <MovingBox
                        positionB={boxPos} positionD={objectsPos} scale={[2, 2, 2]}
                        map={useLoader(TextureLoader, '/texture/box.png')}
                        dummyTexture={useLoader(TextureLoader, '/texture/newspaper.jpeg')} />
                    {Objects(objects).map(({ key, position, rotation, scale, child }) => <Draggable key={key} position={position} rotation={rotation} scale={scale} pointerPosition={pointerPosition} grab={grab} child={child} />)}
                </group>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* <OrbitControls /> */}
            </Canvas>
        </Box>
    )
}

export default Studio