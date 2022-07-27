import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'

export default function Couch({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/stylised_double_couch/scene.gltf')
  return (
    <group ref={group} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[29.94, 55.88, -135.47]}
            rotation={[-Math.PI / 2, 0, -0.87]}
            scale={[45.16, 59.21, 45.16]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Basic_Pillow009_Pillow_Shader_0.geometry}
              material={nodes.Basic_Pillow009_Pillow_Shader_0.material}
            />
          </group>
          <group
            position={[-13.12, 3.94, -139.94]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[100, 100, 100]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Double_Couch_Couch_Shader_0.geometry}
              material={materials.Couch_Shader}
            />
          </group>
          <group
            position={[-56.97, 55.52, -136.93]}
            rotation={[-Math.PI / 2, 0, 0.43]}
            scale={[45.16, 59.21, 45.16]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Pillow_Pillow_Shader_0.geometry}
              material={nodes.Pillow_Pillow_Shader_0.material}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/stylised_double_couch/scene.gltf")
