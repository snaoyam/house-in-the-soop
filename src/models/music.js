/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Antony Oms (https://sketchfab.com/AntonyOms)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/space-music-6f1f3ec1efd74ad2aaa98b7c9de729c9
title: Space Music!
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Music(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/space_music/scene.gltf')
    return (
        <group scale={[0.003, 0.003, 0.003]} ref={group} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group
                        position={[0.13, 34.91, 0.87]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube_main_0.geometry}
                            material={nodes.Cube_main_0.material}
                        />
                    </group>
                    <group
                        position={[2.39, 65.45, 68.27]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Circle_main_0.geometry}
                            material={nodes.Circle_main_0.material}
                        />
                    </group>
                    <group
                        position={[2.28, 91.54, 67.46]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Circle001_main_0.geometry}
                            material={nodes.Circle001_main_0.material}
                        />
                    </group>
                    <group
                        position={[-69.39, -16.64, -175.67]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane_main_0.geometry}
                            material={nodes.Plane_main_0.material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane_metal_0.geometry}
                            material={nodes.Plane_metal_0.material}
                        />
                    </group>
                    <group
                        position={[-173.54, 55.99, -144.78]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane001_main_0.geometry}
                            material={nodes.Plane001_main_0.material}
                        />
                    </group>
                    <group
                        position={[-195.62, 80.72, -1.36]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane003_main_0.geometry}
                            material={nodes.Plane003_main_0.material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane003_metal_0.geometry}
                            material={nodes.Plane003_metal_0.material}
                        />
                    </group>
                    <group
                        position={[124.72, 71.47, -141.55]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Circle004_main_0.geometry}
                            material={nodes.Circle004_main_0.material}
                        />
                    </group>
                    <group
                        position={[-257.97, 116.81, 57.55]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Circle013_main_0.geometry}
                            material={nodes.Circle013_main_0.material}
                        />
                    </group>
                    <group
                        position={[-67.07, 191.33, 433.39]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane002_main_0.geometry}
                            material={nodes.Plane002_main_0.material}
                        />
                    </group>
                    <group
                        position={[24.57, -0.69, 122.19]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane004_main_0.geometry}
                            material={nodes.Plane004_main_0.material}
                        />
                    </group>
                    <group
                        position={[257.69, 1.41, 301.81]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane005_main_0.geometry}
                            material={nodes.Plane005_main_0.material}
                        />
                    </group>
                    <group
                        position={[205.34, 3.67, -238.72]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Circle002_main_0.geometry}
                            material={nodes.Circle002_main_0.material}
                        />
                    </group>
                    <group
                        position={[310.17, 2.13, -92.68]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane006_main_0.geometry}
                            material={nodes.Plane006_main_0.material}
                        />
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/space_music/scene.gltf')