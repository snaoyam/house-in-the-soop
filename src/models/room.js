import TWall from './wall'

const TRoom = (props) => {
  const wallThickness = 0.5
  const wallLength = 10
  const wallColor = {top: "#947b73", bottom: "#735c55"}
  return (
    <group position={props.position}>
      <TWall position={[-(wallLength/2 + wallThickness/2), wallLength/2, 0]} rotation={[0, 0, 0]} scale={[wallThickness, wallLength + wallThickness, wallLength]} color={wallColor.top}/>
      <TWall position={[-wallThickness/2, wallLength/2, -(wallLength/2 + wallThickness/2)]} rotation={[0, Math.PI / 2, 0]} scale={[wallThickness, wallLength + wallThickness, wallLength + wallThickness]} color={wallColor.top}/>
      <TWall position={[0, 0, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[wallThickness, wallLength, wallLength]} color={wallColor.bottom}/>
    </group>
  )
}

export default TRoom