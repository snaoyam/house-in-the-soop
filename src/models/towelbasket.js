/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Veufx Studio (https://sketchfab.com/veufx)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/indian-towel-basket-7ec228e046b84b89bf1edd74598e55b8
title: Indian Towel Basket
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function TowelBasket(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/indian_towel_basket/scene.gltf')
    return (
        <group ref={group} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={[0.25, 0.25, 0.25]}>
                    <group position={[0, 2.31, 0]} scale={[10.53, 3.72, 7.91]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.pCube2_Texture_0.geometry}
                            material={materials.Texture}
                        />
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/indian_towel_basket/scene.gltf')
