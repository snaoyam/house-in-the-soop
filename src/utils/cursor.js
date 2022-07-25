import { createRef, useCallback, useEffect, useRef } from 'react'
import { usePointToPointConstraint } from '@react-three/cannon'
import * as THREE from 'three'

function Cursor({pointerPosition}) {
  
  //\THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 10 );
  const Raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1, 0, 0), 0, 100)
  
  return (
    <group>
      {/* <PerspectiveCamera onUpdate={(e) => {console.log(e)}} position={pointerPosition.point ? pointerPosition.point.clone().add(pointerPosition.normal) : null}> */}
      <mesh position={pointerPosition.point ? pointerPosition.point.clone().add(new THREE.Vector3(pointerPosition.normal == 0 ? 1 : 0, pointerPosition.normal == 1 ? 1 : 0, pointerPosition.normal == 2 ? 1 : 0)) : null}>
          <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
          <meshLambertMaterial color={'white'} attach="material" transparent={true} opacity={0.5} />
        </mesh>
    </group>
  )
}

export { Cursor }
