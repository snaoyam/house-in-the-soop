import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Box } from '@mui/material'
import { useGesture } from "@use-gesture/react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from 'three'
import Room from '../models/room'
import { Physics, useBox } from '@react-three/cannon'
import React, { useRef, useState } from "react"
import { useDrag } from "@use-gesture/react"
import TBox from '../models/box'
import MovingBox from '../models/movingBox'
import Dummy from '../models/dummy'
import { TextureLoader } from 'three'
import { Cursor } from '../utils/drag'
import PostFX from '../utils/PostFX'

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
];

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

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Canvas style={{ height: "100vh", width: "100vw" }} camera={{ position: [30, 30, 30], fov: 25, near: 1, far: 100 }}>
        {/* <Effect /> */}
        <Physics gravity={[0, -10, 0]} iterations={15}>
          <Cursor />
          <Room position={[-1, -1, -1]} />
          <TBox position={[0, 8, 0]} color="blue" />
          <MovingBox
            onClick={(event) => { f() }}
            position={[0, 4, 0]} scale={[1, 2, 2]} map={useLoader(TextureLoader, 'box.png')} />
          <Dummy
            // onClick={(event) => { console.log('ffff') }}
            position={[0, 4.5, 0]} scale={[1, 2, 2]} color="red" />
          {/* <Objects /> */}
        </Physics>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </Box>
  )
}

export default LivingRoom