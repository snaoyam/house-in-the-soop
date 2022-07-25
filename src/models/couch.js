import React, { useEffect, useRef } from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import * as THREE from 'three'

export default function Couch({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/couch/couch.glb')
  const couchTexture = useTexture('/models/couch/Couch_Shader_baseColor.png')
  const pillowTexture = useTexture('/models/couch/Pillow_Shader_baseColor.png')
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[29.9369, 55.8794, -135.4727]}
        rotation={[-Math.PI / 2, 0, -0.8741]}
        scale={[45.1591, 59.2075, 45.1591]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0.geometry}
          material={nodes.mesh_0.material}
        >
          <meshBasicMaterial map={pillowTexture} map-flipY={true} />
        </mesh>
      </group>
      <group
        position={[-13.1177, 3.9385, -139.9417]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_1.geometry}
          material={nodes.mesh_1.material}
        >
          <meshBasicMaterial map={couchTexture} map-flipY={true} />
        </mesh>
      </group>
      <group
        position={[-56.9707, 55.5159, -136.935]}
        rotation={[-Math.PI / 2, 0, 0.4317]}
        scale={[45.1591, 59.2075, 45.1591]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_2.geometry}
          material={nodes.mesh_2.material}
        >
          <meshBasicMaterial map={pillowTexture} map-flipY={true} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload("/couch.glb")
