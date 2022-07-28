import TWall from './wall'
import { Edges } from '@react-three/drei'
import Item from '../utils/item'
import { nanoid } from 'nanoid'
import { useRef } from 'react'

const TRoom = ({ position, objectList, pointerPosition, grab }) => {
  const wallThickness = 0.5
  const dimension = {a: 10, b: 12, h: 10} //a: left, b: right, h: height
  const wallColor = {top: "#947b73", bottom: "#735c55"}
  return (
    <group position={position} >
      <Item draggable={false} tag={"wall"} whitelist={{ left: ['drawing'], right: ['drawing'], top: ['drawing'] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
        <TWall position={[-(wallThickness / 2), dimension.h / 2 - wallThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} color={wallColor.top} />
      </Item>
      <Item draggable={false} tag={"wall"} whitelist={{ left: ['drawing'], right: ['drawing'], top: ['drawing'] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
        <TWall position={[dimension.a / 2 - wallThickness / 2, dimension.h / 2 - wallThickness / 2, -wallThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} color={wallColor.top} />
      </Item>
      <Item draggable={false} tag={"wall"} whitelist={{ left: ['drawing'], right: ['drawing'], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={objectList} pointerPosition={pointerPosition} grab={grab} nanoid={useRef(nanoid()).current}>
        <TWall position={[dimension.a / 2, -wallThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} color={wallColor.bottom} />
      </Item>
      <Edges />
    </group>
  )
}

export default TRoom