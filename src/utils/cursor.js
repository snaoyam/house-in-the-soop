import { createRef, useCallback, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePointToPointConstraint, useSphere } from '@react-three/cannon'
import { CubeCamera, PerspectiveCamera } from "@react-three/drei"
import * as THREE from 'three'

const cursor = createRef()

function useDragConstraint(child) {
  const [, , api] = usePointToPointConstraint(cursor, child, { pivotA: [0, 0, 0], pivotB: [0, 0, 0] })
  console.log(child.current)
  useEffect(() => void api.disable(), [])
  
  const onPointerUp = useCallback((e) => {
    document.body.style.cursor = 'unset'
    e.target.releasePointerCapture(e.pointerId)
    api.disable()
  }, [])
  const onPointerDown = useCallback((e) => {
    document.body.style.cursor = 'grabbing'
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    api.enable()
  }, [])
  return { onPointerUp, onPointerDown }
}

function Cursor({pointerPosition}) {
  // const [cursorRef, api] = useSphere(() => ({ collisionFilterMask: 0, type: 'Kinematic', mass: 0, args: [0.5] }), cursor)
  // const scaleFactor = 0.44
  // if(pointerPosition) {
  //   api.position.set(pointerPosition.x, pointerPosition.y, pointerPosition.z)
  // }
  // useFrame((state) => {
  //   const x = state.mouse.x * state.viewport.width * scaleFactor
  //   const y = state.mouse.y * state.viewport.height * scaleFactor
  //   const a = 30 - x/Math.sqrt(2) - y/Math.sqrt(6)
  //   const b = 30 + x/Math.sqrt(2) - y/Math.sqrt(6)
  //   const c = 30 + 2*y/Math.sqrt(6)
  //   const min = Math.min(Math.abs(a),Math.abs(b),Math.abs(c)) - 1
  //\THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 10 );
  const Raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1, 0, 0), 0, 100)
  const ref = useRef()
  //   api.position.set(b-min, c-min, a-min)
  // })intersection.clone().add(normalVector)
  return (
    <group>
      {/* <PerspectiveCamera onUpdate={(e) => {console.log(e)}} position={pointerPosition.point ? pointerPosition.point.clone().add(pointerPosition.normal) : null}> */}
        <mesh /*ref={cursorRef}*/ position={pointerPosition.point ? pointerPosition.point.clone().add(pointerPosition.normal) : null}>
          <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
          <meshLambertMaterial color={'white'} attach="material" transparent={true} opacity={0.1} />
        </mesh>
      {/* </PerspectiveCamera> */}
    </group>
  )
}

export { useDragConstraint, Cursor }
