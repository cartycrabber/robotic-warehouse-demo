import { GroupProps } from "@react-three/fiber";
import { useRef } from "react";
import { BoxMesh } from "./BoxMesh";
import { RobotMesh } from "./RobotMesh";

export function LoadedRobotMesh(props: GroupProps) {
    const mesh = useRef(null);

    return (
        <group {...props} ref={mesh} >
            <RobotMesh />
            <BoxMesh position={[0,0.42,0.15]}/>
        </group>
    )
}