import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Box } from '@mui/material'
import * as THREE from 'three'
import Room from '../models/room'
import React, { useRef, useState, Suspense } from "react"
import TBox from '../models/box'
import TWallBack from '../models/wall_back'
import {Cursor} from '../utils/cursor'
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from "@react-three/drei"
//import { useGesture } from "@use-gesture/react"
//import { Physics, useBox } from '@react-three/cannon'
//import { useDrag } from "@use-gesture/react"
import Item from '../utils/item'
import { nanoid } from 'nanoid'
import MovingBox from '../models/movingBox'
import Dummy from '../models/dummy'
import { TextureLoader } from 'three'
import PostFX from '../utils/PostFX'
import Couch from '../models/couch'

function Effect() {
  const { gl, scene, camera, size } = useThree()
  const renderer = new PostFX(gl)
  return useFrame((state) => {
    renderer.render(scene, camera)
  }, 1)
}

var inBox = [1, 1, 1]; // 총 3개의 objects 가 있음. 0: 박스에 없음, 1: 박스에 있음
var index = 0;
var objects = [
  <TBox position={[0, 8, 0]} color="red" />,
  <TBox position={[0, 8, 0]} color="white" />,
  <TBox position={[0, 8, 0]} color="black" />
]

function f() {
  // console.log('asdf');
  switch (index) {
    case 0:
      console.log('index 0');
      console.log(index);
      inBox[index] = 0;
      index++;
      break;
    case 1:
      console.log('index 1');
      console.log(index);
      index++;
    case 2:
      console.log('index 2');
      console.log(index);
      break;
  }
}

// function Objects() {
//   useFrame(() => {
//     for (let i = 0; i < inBox.length; i++) {
//       if (inBox[index] == 0) {

//       }
//     }
//   })

//   return ()
// }

const LivingRoom = () => {
  const cameraPosition = [30, 20, 30]
  const [pointerPosition, setPointerPosition] = useState({point: null, normal: null})
  const [grab, setGrab] = useState({object: null, position: null})
  const objectList = useRef({})
  // console.log(objectList)

  // useFrame((state) => {
  //   // cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
  //   state.gl.setRenderTarget(target)
  //   state.gl.render(scene, cam.current)
  //   state.gl.setRenderTarget(null)
  // })

  // useFrame((state) => {
  //   if (inBox[index] == 0) {
  //     state.gl.setRenderTarget(objects[index])
  //   }
  // })
  const wallThickness = 0.5
  const dimension = { a: 50, b: 50, h: 50 } //a: left, b: right, h: height
  const wallColor = { top: "#947b73", bottom: "#735c55" }
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
              position: (e.intersections.filter((v) => (v.object.uuid !== e.intersections.at(0).object.uuid)).at(0) ?? {point: null}).point
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
          onPointerUp={(e) =>{
            e.stopPropagation()
            document.body.style.cursor = 'unset'
            setGrab({ object: null, position: null })
          }}
          >
          <TWallBack position={[-(wallThickness / 2), dimension.h / 2 - wallThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} color={wallColor.top} />
          <TWallBack position={[dimension.a / 2 - wallThickness / 2, dimension.h / 2 - wallThickness / 2, -wallThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} color={wallColor.top} />
          <TWallBack position={[dimension.a / 2, -wallThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} color={wallColor.bottom} />
          <Room position={[0, 0, 0]} objectList={objectList} pointerPosition={pointerPosition} grab={grab} />
          <Item draggable={true} position={[1, 1, 8]} scale={[2, 2, 4]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <TBox color="brown" />
          </Item>
          <Item draggable={true} position={[3.2, 1, 6]} scale={[2, 2, 4]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <TBox color="brown" />
          </Item>
          <Item draggable={true} position={[8, 0.5, 8]} scale={[0.5, 0.3, 0.3]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <TBox color="blue" />
          </Item>
          <Item draggable={true} position={[1, 1, 12]} scale={[0.5, 1, 0.3]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <TBox color="blue" />
          </Item>
          {/* <Item draggable={false} position={[10, 4, 6]} scale={[1, 2, 2]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <MovingBox
              onClick={(event) => { f() }}
              map={useLoader(TextureLoader, 'box.png')} />
          </Item>
          <Item draggable={false} position={[10, 4.5, 6]} scale={[1, 2, 2]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <Dummy
              // onClick={(event) => { console.log('ffff') }}
              color="red" />
          </Item> */}
          <Item draggable={true} position={[0, 0, 0]} scale={[0.03, 0.03, 0.03]} tag={"box"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current} >
            <Couch position={[100, 0, 200]} />
          </Item>
          
        
        
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
        {/* <ambientLight intensity={2}/> */}
        {/* <OrthographicCamera makeDefault zoom={40} position={[30, 20, 30]} rotation={[-0.5880026035475675, 0.693980594900994, 0.40305707446611316]} /> */}
        {/* <OrbitControls /> */}
      </Canvas>
    </Box>
  )
}

export default LivingRoom