/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export function BoxMesh(props: GroupProps) {
  const { nodes, materials } = useGLTF("/box.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, 0]} scale={5.37}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.defaultMaterial004 as THREE.Mesh).geometry}
            material={materials.MAT_CardBoardBox}
            position={[-0.023, 0.04, 0.01]}
            scale={0.53}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/box.glb");