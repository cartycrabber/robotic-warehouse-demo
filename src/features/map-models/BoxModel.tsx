import { GroupProps } from "@react-three/fiber";
import { Suspense } from "react";
import { BoxMesh } from "./BoxMesh";

export function BoxModel(props: GroupProps) {
    return <Suspense fallback={<BoxFallback {...props} />}>
        <BoxMesh {...props} />
    </Suspense>
}

function BoxFallback(props: GroupProps) {
    return <group {...props}>
        <mesh position={[0, 0, 0.15]}>
            <boxBufferGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color={"brown"} />
        </mesh>
    </group>
}