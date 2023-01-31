import { GroupProps } from "@react-three/fiber";
import { useRef } from "react";
import { BoxMesh } from "./BoxMesh";
import { ShelfMesh } from "./ShelfMesh";

export function LoadedShelfMesh(props: GroupProps) {
    const mesh = useRef(null);

    return (
        <group {...props} ref={mesh} >
            <ShelfMesh />
            <BoxMesh position={[-0.01,0,0.053]} />
            <BoxMesh position={[0,0.41,0.053]} rotation={[0, 0, Math.PI / 64]} />
            <BoxMesh position={[-0.007,-0.36,0.053]} rotation={[0, 0, -Math.PI / 32]} />

            <BoxMesh position={[0.005,-0.36,0.4]} rotation={[0, 0, Math.PI / 128]} />

            <BoxMesh position={[-0.01,-0.1,0.8]} rotation={[0, 0, Math.PI / 64]} />
            <BoxMesh position={[-0.01,0.35,0.8]} rotation={[0, 0, -Math.PI / 32]} />

            <BoxMesh position={[-0.01,0.006,1.22]} rotation={[0, 0, -Math.PI / 128]} />
        </group>
    )
}