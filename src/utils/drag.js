import { createRef, useCallback, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePointToPointConstraint, useSphere } from '@react-three/cannon'

const cursor = createRef()

function useDragConstraint(child) {
  const [, , api] = usePointToPointConstraint(cursor, child, { pivotA: [0, 0, 0], pivotB: [0, 0, 0] })
  useEffect(() => void api.disable(), [])
  const onPointerUp = useCallback((e) => {
    document.body.style.cursor = 'grab'
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

function Cursor() {
  const [cursorRef, api] = useSphere(() => ({ collisionFilterMask: 0, type: 'Kinematic', mass: 0, args: [0.5] }), cursor)
  const scaleFactor = 0.5
  useFrame((state) => {
    console.log(state.mouse)
    const x = state.mouse.x * state.viewport.width * scaleFactor
    const y = state.mouse.y * state.viewport.height * scaleFactor
    api.position.set(x, y, 0)
  })
  return (
    <mesh ref={cursorRef}>
      <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry"/>
      <meshLambertMaterial color={'white'} attach="material" />
    </mesh>
  )
}

export { useDragConstraint, Cursor }
