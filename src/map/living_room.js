import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Box } from '@mui/material'
import * as THREE from 'three'
import Room from '../models/room'
import TWallBack from '../models/wall_back'
import React, { useRef, useState, Suspense } from "react"
import TBox from '../models/box'
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from "@react-three/drei"
//import { useGesture } from "@use-gesture/react"
//import { Physics, useBox } from '@react-three/cannon'
//import { useDrag } from "@use-gesture/react"
import Item from '../utils/item'
import { nanoid } from 'nanoid'
import { MovingBox, Objects } from '../models/movingBox'
import { TextureLoader } from 'three'
import PostFX from '../utils/PostFX'
import Couch from '../models/couch'
import Couch2 from '../models/couch2'
import Artframe from '../models/artframe'
import SofaChair from '../models/sofa_chair'
import Carpet from '../models/carpet'
import LedTV from '../models/ledtv'
import TVTable from '../models/tvtable'
import Plant from '../models/plant'
import Lamp from '../models/lamp'
import Background from '../models/background'
import FoyerTable from '../models/foyerTable'
import Rug2 from '../models/rug2'
import Photoframe2 from '../models/photoframe2'
import CoffeeTable from '../models/coffeetable'
import Bookshelf from '../models/bookshelf'

function Effect() {
  const { gl, scene, camera, size } = useThree()
  const renderer = new PostFX(gl)
  return useFrame((state) => {
    renderer.render(scene, camera)
  }, 1)
}

const boxPos = [10, 1, 6]
const objectsPos = [10, 1.7, 6]

const objects = [
  { key: 0, position: objectsPos, child: <Artframe /> },
  { key: 1, position: objectsPos, child: <LedTV /> },
  { key: 2, position: objectsPos, child: <Plant /> },
  { key: 3, position: objectsPos, child: <Rug2 /> },
  { key: 4, position: objectsPos, rotation: [0, Math.PI / 2, 0], child: <Photoframe2 /> },
  { key: 5, position: objectsPos, child: <CoffeeTable /> },
];
const wallThickness = 0.5
const dimension = { a: 50, b: 50, h: 50 } //a: left, b: right, h: height

const LivingRoom = () => {
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
        orthographic camera={{ zoom: 40, position: cameraPosition }}
      >
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
          <Background color="#027333"
          // map={useLoader(TextureLoader, '/texture/background1.jpg')}
          />
          <TWallBack position={[-(wallThickness / 2), dimension.h / 2 - wallThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} />
          <TWallBack position={[dimension.a / 2 - wallThickness / 2, dimension.h / 2 - wallThickness / 2, -wallThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} />
          <TWallBack position={[dimension.a / 2, -wallThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} />
          <Room objectList={objectList} pointerPosition={pointerPosition} grab={grab}
            position={[0, 0, 0]} dimension={{ a: 12, b: 15, h: 10 }} wallThickness={0.2} wallpaperThickness={0.7}
            bottomWPTexture={useLoader(TextureLoader, '/texture/floor2.webp')}
            sideWPTextureL={useLoader(TextureLoader, '/texture/whiteBrick.jpg')}
            sideWPTextureR={useLoader(TextureLoader, '/texture/wlp2.jpg')}
            wallColor={{ top: "#947b73", bottom: "#cbab7c", swR: "#FFFFFF" }} />
          <Item draggable={false} position={[1, 0, 12.5]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
            <Bookshelf />
          </Item>
          <Item draggable={false} position={[1, 0, 6]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
            <TVTable scale={[0.1, 0.1, 0.1]} />
          </Item>
          <Item draggable={false} position={[6, 1, 2]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
            <SofaChair scale={[0.1, 0.1, 0.1]} />
          </Item>
          <Item draggable={false} position={[1, 2, 1]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
            <Lamp />
          </Item>
          <Item draggable={false} position={[8, 0, 12]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
            <FoyerTable />
          </Item>
          <MovingBox
            positionB={boxPos} positionD={objectsPos} scale={[2, 2, 2]}
            map={useLoader(TextureLoader, '/texture/box.png')}
            dummyTexture={useLoader(TextureLoader, '/texture/newspaper.jpeg')} />
          {Objects(objects).map(({ key, position, rotation, scale, child }) => <Item draggable={true} key={key} position={position} rotation={rotation} scale={scale} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={key}>{child}</Item>)}
        </group>
        <directionalLight
          position={[1, 0, 0]}
          intensity={1.3}
        />
        <directionalLight
          position={[0, 1, 0]}
          intensity={2}
        />
        <directionalLight
          position={[0, 0, 1]}
          intensity={1.5}
        />
        {/* <OrthographicCamera makeDefault zoom={40} position={[30, 20, 30]} rotation={[-0.5880026035475675, 0.693980594900994, 0.40305707446611316]} /> */}
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
            window.location.href = `/${4}`
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
            window.location.href = `/${1}`
          }}
          src="/arrow.png"
        />
      </Box>
    </Box>
  )
}

export default LivingRoom