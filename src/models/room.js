import TWall from './wall'

const TRoom = ({position}) => {
  const wallThickness = 0.5
  const dimension = {a: 10, b: 12, h: 10} //a: left, b: right, h: height
  const wallColor = {top: "#947b73", bottom: "#735c55"}
  return (
    <group position={position} >
      <TWall position={[-(wallThickness/2), dimension.h/2 - wallThickness/2, dimension.b/2]} rotation={[0, 0, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.b]} color={wallColor.top}/>
      <TWall position={[dimension.a/2 - wallThickness/2, dimension.h/2 - wallThickness/2, -wallThickness/2]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, dimension.h + wallThickness, dimension.a + wallThickness]} color={wallColor.top}/>
      <TWall position={[dimension.a/2, -wallThickness/2, dimension.b/2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, dimension.b, dimension.a]} color={wallColor.bottom}/>
    </group>
  )
}

export default TRoom