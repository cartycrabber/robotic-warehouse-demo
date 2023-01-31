import { GroupProps } from "@react-three/fiber";
import { Suspense } from "react";
import { ShelfMesh } from "./ShelfMesh";

export function ShelfModel(props: GroupProps) {
    return (
        <group {...props}>
            <group position={[-0.5, 0, 0]}>
                <Suspense fallback={<ShelfFallback />}><ShelfMesh /></Suspense>
            </group>
            <group position={[0.5, 0, 0]}>
                <Suspense fallback={<ShelfFallback />}><ShelfMesh /></Suspense>
            </group>
        </group>
    );
}

function ShelfFallback() {
    return <group>
        <mesh position={[0,0,0.6]}>
            <boxBufferGeometry args={[0.5, 1.6, 1.2]} />
            <meshStandardMaterial color={"blue"} />
        </mesh>
    </group>
}