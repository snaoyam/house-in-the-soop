import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box } from '@mui/material'
import * as THREE from 'three'
import Room from '../models/room'
import React, { useRef, useState } from "react"
import TBox from '../models/box'
import {Cursor} from '../utils/cursor'
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from "@react-three/drei"
//import { useGesture } from "@use-gesture/react"
//import { Physics, useBox } from '@react-three/cannon'
//import { useDrag } from "@use-gesture/react"

const LivingRoom = () => {
  const cameraPosition = [30, 20, 30]
  const [pointerPosition, setPointerPosition] = useState({point: null, normal: null})
  const grabObject = useRef(null)
  
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Canvas style={{ height: "100vh", width: "100vw" }} 
        orthographic camera={{ zoom: 50, position: cameraPosition }} 
        >
        {/* <Physics gravity={[0, 0, 0]}> */}
          <Cursor pointerPosition={pointerPosition}/>
          <group material="shader"
            onPointerDown={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'grabbing'
              grabObject.current = e.intersections.at(0).object
            }}
            onPointerMove={(e) => {
              e.stopPropagation()
              const intersectObject = grabObject.current !== null ? e.intersections.filter((v) => (v.object.uuid !== grabObject.current.uuid)) : e.intersections
              console.log(intersectObject)
              if (intersectObject.length > 0) {
                const intersection = intersectObject.at(0).point
                const normalMatrix = new THREE.Matrix3().getNormalMatrix(e.object.matrixWorld)
                const normalVector = intersectObject.at(0).face.normal.clone().applyMatrix3(normalMatrix).normalize()
                // const cursorPosition = intersection.clone().add(normalVector)
                const newNormalVector = ((a, b, c) => (a && !c ? 0 : (b && !a ? 1 : 2)))(normalVector.x > normalVector.y, normalVector.y > normalVector.z, normalVector.z > normalVector.x)
                setPointerPosition({ point: intersection, normal: newNormalVector })
              }
            }}
            onPointerUp={(e) =>{
              e.stopPropagation()
              document.body.style.cursor = 'unset'
              grabObject.current = null
            }}
            >
            <Room position={[0, 0, 0]} />
            <TBox position={[1, 1, 8]} scale={[2, 2, 4]} pointerPosition={pointerPosition} color="brown" />
            <TBox position={[8, 0.5, 8]} scale={[0.5, 1, 0.3]} pointerPosition={pointerPosition} color="blue" />
          </group>
        {/* </Physics> */}
        <ambientLight /> 
        {/* directionalLight */}
        <pointLight position={[10, 10, 10]} />
        {/* <OrthographicCamera makeDefault zoom={40} position={[30, 20, 30]} rotation={[-0.5880026035475675, 0.693980594900994, 0.40305707446611316]} /> */}
        {/* <OrbitControls /> */}
      </Canvas>
    </Box>
  )
}

export default LivingRoom