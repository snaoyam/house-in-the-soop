/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: whyniero (https://sketchfab.com/whyniero)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/plant-1bb0cf7261174670ad1134093875e1d1
title: Plant
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function IndoorPlant2(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/plant/scene.gltf')
    return (
        <group scale={[4, 4, 4]} ref={group} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plant_Flower_pot__0.geometry}
                            material={materials.Flower_pot}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plant_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plant_Land_0.geometry}
                            material={materials.Land}
                        />
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/plant/scene.gltf')