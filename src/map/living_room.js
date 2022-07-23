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
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Canvas style={{ height: "100vh", width: "100vw" }} camera={{ position: [30, 30, 30], fov: 25, near: 1, far: 100 }}>
        <Physics gravity={[0, -10, 0]} iterations={15}>
          <Cursor />
          <Room position={[-1, -1, -1]}/>
          <TBox position={[0, 8, 0]} color="blue"/>
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