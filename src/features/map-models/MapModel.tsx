import { GroupProps, useFrame } from "@react-three/fiber";
import { ReactNode, Suspense, useRef, useState } from "react";
import { Group } from "three";
import { isPositionEqual, position3dToVector3, rotation3dToEuler, vector3ToPosition3d } from "../Utils";
import { Position3D, Rotation3D } from "./Map";

export interface MapModelProps {
    position: Position3D,
    rotation: Rotation3D,
    fallback?: ReactNode,
    children: ReactNode,
}

export function MapModel(props: MapModelProps) {
    const ref = useRef<Group>(null!);
    const [firstRender, setFirstRender] = useState(true);

    useFrame(() => {
        if (ref.current) {
            const refPosition: Position3D = vector3ToPosition3d(ref.current.position);
            if (!isPositionEqual(refPosition, props.position)) {
                ref.current.position.lerp(
                    position3dToVector3(props.position),
                    0.002);
            }
            if (firstRender) {
                setFirstRender(false);
            }
        }
    });

    const groupProps: GroupProps = {
        ref,
        position: firstRender ? position3dToVector3(props.position) : undefined,
        rotation: rotation3dToEuler(props.rotation),
    };

    return <Suspense fallback={props.fallback}>
        <group {...groupProps}>
            {props.children}
        </group>
    </Suspense>
}
