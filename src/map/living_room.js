import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box } from '@mui/material'
import { useGesture } from "@use-gesture/react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from 'three'
import Room from '../models/room'
import { Physics, useBox } from '@react-three/cannon'
import React, { useRef, useState } from "react"
import { useDrag } from "@use-gesture/react"
import TBox from '../models/box'
import {Cursor} from '../utils/drag'

const LivingRoom = () => {
  const cameraPosition = [30, 30, 30]
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Canvas style={{ height: "100vh", width: "100vw" }} camera={{ position: cameraPosition, fov: 25, near: 1, far: 100 }}>
        <Physics gravity={[0, -20, 0]} iterations={15}>
          <Cursor cameraPosition={cameraPosition}/>
          <Room position={[0, 0, 0]}/>
          <TBox position={[8, 8, 8]} color="blue"/>
        </Physics>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <PerspectiveCamera position={[20, 20, 20]} makeDefault />
        <OrbitControls /> */}
      </Canvas>
    </Box>
  )
}

export default LivingRoom