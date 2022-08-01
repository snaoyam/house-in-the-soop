import TWall from './wall'
import Wallpaper from './wallpaper'
import Item from '../utils/item'
import { nanoid } from 'nanoid'
import { useRef } from 'react'


const TRoom = (props) => {
  const wallThickness = props.wallThickness
  const wallpaperThickness = props.wallpaperThickness
  const dimension = props.dimension //a: left, b: right, h: height
  const wallColor = props.wallColor
  return (
    <group position={props.position} >
      {/* left */}
      <Item draggable={false} tag={"wall"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={props.objectList} pointerPosition={props.pointerPosition} grab={props.grab} nanoid={useRef(nanoid()).current}>
        <TWall position={[-(wallThickness / 2) - wallpaperThickness, dimension.h / 2 - wallThickness / 2 - wallpaperThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness + wallpaperThickness, dimension.b]} color={wallColor.top} />
      </Item>
      <Item draggable={false} tag={"wallpaper"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={props.objectList} pointerPosition={props.pointerPosition} grab={props.grab} nanoid={useRef(nanoid()).current}>
        <Wallpaper position={[-(wallpaperThickness / 2), dimension.h / 2 - wallThickness / 2 - wallpaperThickness / 2, dimension.b / 2]} rotation={[0, 0, 0]} scale={[wallpaperThickness, dimension.h + wallThickness + wallpaperThickness, dimension.b]}
          map={props.sideWPTextureL} color={wallColor.swL} />
      </Item>
      {/* right */}
      <Item draggable={false} tag={"wall"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={props.objectList} pointerPosition={props.pointerPosition} grab={props.grab} nanoid={useRef(nanoid()).current}>
        <TWall position={[dimension.a / 2 - wallThickness / 2 - wallpaperThickness / 2, dimension.h / 2 - wallThickness / 2 - wallpaperThickness / 2, -wallThickness / 2 - wallpaperThickness]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness + wallpaperThickness, dimension.a + wallThickness + wallpaperThickness]} color={wallColor.top} />
      </Item>
      <Item draggable={false} tag={"wallpaper"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={props.objectList} pointerPosition={props.pointerPosition} grab={props.grab} nanoid={useRef(nanoid()).current}>
        <Wallpaper position={[dimension.a / 2 - wallThickness / 2 - wallpaperThickness / 2, dimension.h / 2 - wallThickness / 2 - wallpaperThickness / 2, -wallpaperThickness / 2]} rotation={[0, Math.PI / 2, 0]} scale={[wallpaperThickness, dimension.h + wallThickness + wallpaperThickness, dimension.a + wallThickness + wallpaperThickness]}
          map={props.sideWPTextureR} color={wallColor.swR} />
      </Item>
      {/* bottom */}
      <Item draggable={false} tag={"wall"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={props.objectList} pointerPosition={props.pointerPosition} grab={props.grab} nanoid={useRef(nanoid()).current}>
        <TWall position={[dimension.a / 2, -wallThickness / 2 - wallpaperThickness, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} color={wallColor.bottom} />
      </Item>
      <Item draggable={false} tag={"wallpaper"} whitelist={{ left: [], right: [], top: [] }} blacklist={{ left: [], right: [], top: [] }} objectList={props.objectList} pointerPosition={props.pointerPosition} grab={props.grab} nanoid={useRef(nanoid()).current}>
        <Wallpaper position={[dimension.a / 2, -wallpaperThickness / 2, dimension.b / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallpaperThickness, dimension.b, dimension.a]}
          map={props.bottomWPTexture} color={wallColor.bottom} />
      </Item>
    </group>
  )
}

export default TRoom