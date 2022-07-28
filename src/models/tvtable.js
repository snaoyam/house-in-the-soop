/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: MADE.COM (https://sketchfab.com/made-it)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/3d-models/esme-coffee-table-with-2-drawers-white-and-ash-66943d6d54064452b5ecb9151dcc181c
title: Esme Coffee Table With 2 Drawers, White And Ash
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Edges } from '@react-three/drei'

export default function TVTable(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/tvtable/scene.gltf')
    return (
        <group scale={[0.06, 0.04, 0.02]} rotation={[0, Math.PI / 2, 0]} ref={group} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane001_FLOOR_0.geometry}
                            material={materials.FLOOR}>
                            {/* <Edges
                                color='rgb(200, 200, 200)'
                                threshold={25} /> */}
                        </mesh>
                    </group>
                    <group position={[0, 22.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <group position={[-74.28, 10, 70.22]}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Esme_Coffee_Table_with_2_Drawers_Ash_WHITE_0.geometry}
                                material={materials.WHITE}>
                                <Edges
                                    color='rgb(200, 200, 200)'
                                    threshold={25} />
                            </mesh>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Esme_Coffee_Table_with_2_Drawers_Ash_ASH_0.geometry}
                                material={materials.material}>
                                <Edges
                                    color='rgb(200, 200, 200)'
                                    threshold={25} />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/tvtable/scene.gltf')