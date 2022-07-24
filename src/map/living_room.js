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
import {Cursor} from '../utils/cursor'


const LivingRoom = () => {
  const cameraPosition = [30, 20, 30]
  const [pointerPosition, setPointerPosition] = React.useState()
  // const raycaster = new THREE.Raycaster()
  // const pointer = new THREE.Vector2()
  // const camera = new THREE.PerspectiveCamera( 0, 0, 0 )
  // camera.position.set( cameraPosition[0], cameraPosition[1], cameraPosition[2] )
  // camera.lookAt( 0, 0, 0 )
  // raycaster.setFromCamera( pointer, camera )

  // function onPointerMove( e ) {
  //   pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1
  //   pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1
  //   raycaster.setFromCamera( pointer, camera )
  //   const intersects = raycaster.intersectObject( )
  //   console.log(intersects)
  // }
  const helper = useRef();
  
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Canvas style={{ height: "100vh", width: "100vw" }} 
        camera={{ position: cameraPosition, fov: 25, near: 1, far: 100 }} 
        // onPointerMove={onPointerMove}
        >
        <Physics gravity={[0, -20, 0]} iterations={15}>
          <Cursor pointerPosition={pointerPosition}/>
          <group material="shader"
            onPointerMove={(e) => {
              e.stopPropagation()
              const intersection = e.intersections.at(0).point
              const normalMatrix = new THREE.Matrix3().getNormalMatrix( e.object.matrixWorld )
              const normalVector = e.intersections.at(0).face.normal.clone().applyMatrix3( normalMatrix ).normalize()
              const cursorPosition = intersection.clone().add(normalVector)
              setPointerPosition(cursorPosition)
            }}>
            <Room position={[0, 0, 0]} />
          </group>
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