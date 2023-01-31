import { GroupProps } from "@react-three/fiber";
import { Suspense } from "react";
import { RobotMesh } from "./RobotMesh";

export function RobotModel(props: GroupProps) {
    return <Suspense fallback={<RobotFallback {...props} />}>
        <RobotMesh {...props} />
    </Suspense>
}

function RobotFallback(props: GroupProps) {
    return <group {...props}>
        <mesh position={[0,0,0.6]}>
            <boxBufferGeometry args={[0.6, 0.6, 1.2]} />
            <meshStandardMaterial color={"orange"} />
        </mesh>
  </group>
}