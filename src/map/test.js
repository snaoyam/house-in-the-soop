import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { Box } from '@mui/material'
import * as THREE from 'three'
import Room from '../models/room'
import React, { useRef, useState, useEffect, useMemo } from "react"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import Draggable from '../utils/item.js'
import { MovingBox, Objects } from '../models/movingBox'
import { TextureLoader } from 'three'
import PostFX from '../utils/PostFX'
import Background from '../models/background'

// import { Outline } from 'three/examples/jsm/postprocessing/OutlinePass'
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"

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
import Cabinet1 from '../models/cabinet1'
import { Edges } from '@react-three/drei'


extend({ RenderPass, OutlinePass, ShaderPass })
// extend({ EffectComposer })
// extend({ Outline })

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

// const context = React.createContext()
// const Outline = ({ children }) => {
//     const { gl, scene, camera, size } = useThree()
//     const composer = useRef()
//     const hovered = [children]
//     const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
//     useEffect(() => composer.current.setSize(size.width, size.height), [size])
//     // useFrame(() => composer.current.render(), 1)
//     // console.log(children)
//     return (
//         <context.Provider value={hovered}>
//             {children}
//             <effectComposer ref={composer} args={[gl]}>
//                 <renderPass attachArray="passes" args={[scene, camera]} />
//                 <outlinePass
//                     attachArray="passes"
//                     args={[aspect, scene, camera]}
//                     selectedObjects={hovered}
//                     visibleEdgeColor="white"
//                     edgeStrength={50}
//                     edgeThickness={1}
//                 />
//             </effectComposer>
//         </context.Provider>
//     )
// }


const Test = () => {
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
                    {/* <Selection> */}
                    {/* <EffectComposer multisampling={8} autoClear={false}>
                        <Outline visibleEdgeColor={"gray"} hiddenEdgeColor={0x22090a} edgeStrength={10} />
                        <Pixelation granularity={4} />
                    </EffectComposer> */}
                    <Background color="#684536" />
                    <Room position={[0, 0, 0]} dimension={{ a: 15, b: 12, h: 10 }} wallThickness={0.5} wallpaperThickness={0.3}
                        bottomWPTexture={useLoader(TextureLoader, '/texture/tile.jpg')}
                        sideWPTextureL={useLoader(TextureLoader, '/texture/floor3.jpg')}
                        sideWPTextureR={useLoader(TextureLoader, '/texture/floor3.jpg')}
                        wallColor={{ top: "#D9D9D9", bottom: "#D9D9D9", swL: "#efe7db", swR: "#808080" }} />
                    {/* <Select enabled={true}> */}
                    <mesh position={[-17, -1, 6]} rotation={[0, Math.PI / 2, 0]}>
                        <Tub />
                        {/* <Edges /> */}
                    </mesh>
                    <mesh position={[6, 0, 1]}><BathSink /></mesh>
                    <mesh position={[12, 0, 1]}><Toilet /></mesh>
                    <mesh position={[6, 0, 3]} rotation={[0, Math.PI / 2, 0]}><Rug /></mesh>
                    <mesh position={[1.5, 0, 2.5]} rotation={[0, Math.PI / 2, 0]}><WashingMachine /></mesh>
                    <mesh position={[1, 0, 5]}><Hamper /></mesh>
                    <mesh position={[15, 3, 1]} rotation={[0, -Math.PI / 2, 0]}><ToiletPaper /></mesh>
                    <mesh position={[18.5, 0, 2]}><Trashcan /></mesh>
                    <mesh position={[6, 5.5, 0.1]}><Mirror /></mesh>
                    <mesh position={[7, 12, 12]} rotation={[0, Math.PI / 2, 0]}><WindowFrame /></mesh>
                    <mesh position={[7, 11.5, 17.7]} rotation={[0, Math.PI / 2, 0]}><Blinds /></mesh>
                    <Draggable position={[13, 0, 10]} rotation={[0, Math.PI / 2, 0]} pointerPosition={pointerPosition} grab={grab} child={
                        <TowelBasket />
                    } />
                    {/* <Draggable position={[1, -0.2, 12]} rotation={[0, Math.PI / 2, 0]} pointerPosition={pointerPosition} grab={grab} child={
                                <Cabinet1 />
                            } /> */}
                    <MovingBox
                        positionB={boxPos} positionD={objectsPos} scale={[2, 2, 2]}
                        map={useLoader(TextureLoader, '/texture/box.png')}
                        dummyTexture={useLoader(TextureLoader, '/texture/newspaper.jpeg')} />
                    {Objects(objects).map(({ key, position, rotation, scale, child }) => <Draggable key={key} position={position} rotation={rotation} scale={scale} pointerPosition={pointerPosition} grab={grab} child={child} />)}
                    {/* </Select> */}
                    {/* </Selection> */}
                    <Effect />
                </group>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* <pointLight position={[30, 30, 30]} /> */}
                {/* <OrbitControls /> */}
            </Canvas>
        </Box >
    )
}

export default Test