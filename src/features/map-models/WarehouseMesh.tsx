import { GroupProps } from "@react-three/fiber";


export function WarehouseMesh(props: GroupProps) {
    return (
        <group {...props}>
            <mesh position={[0,0,-0.001]}>
                <planeGeometry args={[50,50]} />
                <meshStandardMaterial color={"#ededed"} />
            </mesh>
        </group>
    )
}