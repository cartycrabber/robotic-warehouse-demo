import { OrbitControls } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { Euler } from "three";
import { useGetDynamicEntitiesQuery, useGetStaticEntitiesQuery } from "../../app/api";
import { DynamicEntity } from "../dynamic-entity/DynamicEntity";
import { WarehouseMesh } from "../map-models/WarehouseMesh";
import { Position3D, Rotation3D, StaticEntity } from "../static-entity/StaticEntity";
import { ShelfModel } from "../map-models/ShelfModel";
import { BoxModel } from "../map-models/BoxModel";
import { RobotModel } from "../map-models/RobotModel";

export function MapViewer() {
    const getDynamicEntitiesResponse = useGetDynamicEntitiesQuery();
    const getStaticEntitiesResponse = useGetStaticEntitiesQuery();

    console.log({
        getDynamicEntitiesResponse,
        getStaticEntitiesResponse,
    });

    if (getDynamicEntitiesResponse.error || getStaticEntitiesResponse.error) {
        return <p>Error while getting entities</p>;
    }
    if (getDynamicEntitiesResponse.isLoading || getStaticEntitiesResponse.isLoading) {
        return <p>Loading...</p>;
    }

    const dynamicEntities: JSX.Element[] | undefined = getDynamicEntitiesResponse.data?.map(mapDynamicEntityToMesh);
    const staticEntities: JSX.Element[] | undefined = getStaticEntitiesResponse.data?.map(mapStaticEntityToMesh);

    console.log({
        dynamicEntities,
        staticEntities,
    });

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Canvas linear flat>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <OrbitControls />
                <gridHelper args={[50, 50]} rotation={new Euler(Math.PI / 2, 0, 0)} />

                <WarehouseMesh />

                {dynamicEntities}
                {staticEntities}
            </Canvas>
        </div>
    )
}

const position3dToVector3d = (position: Position3D | undefined): Vector3 => position
    ? [position.X, position.Y, position.Z]
    : [0, 0, 0];

const rotation3dToEuler = (rotation: Rotation3D | undefined): Euler => rotation
    ? new Euler(
        degreesToRadians(rotation.xRotation),
        degreesToRadians(rotation.yRotation),
        degreesToRadians(rotation.zRotation))
    : new Euler(0, 0, 0);

const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

const mapDynamicEntityToMesh = (dynamicEntity: DynamicEntity): JSX.Element => {
    const position: Vector3 = position3dToVector3d(dynamicEntity.position);
    const rotation: Euler = rotation3dToEuler(dynamicEntity.rotation);


    switch (dynamicEntity.type) {
        case 'robot':
            return <RobotModel key={dynamicEntity.id} position={position} rotation={rotation} />;
        default:
            const msg = `No mesh for dynamic entity type: ${dynamicEntity.type}`;
            console.warn(msg);
            return <div>msg</div>;
    }
};

const mapStaticEntityToMesh = (staticEntity: StaticEntity): JSX.Element => {
    const position: Vector3 = position3dToVector3d(staticEntity.position);
    const rotation: Euler = rotation3dToEuler(staticEntity.rotation);

    switch (staticEntity.type) {
        case 'shelf':
            return <ShelfModel key={staticEntity.id} position={position} rotation={rotation} />
        case 'box':
            return <BoxModel key={staticEntity.id} position={position} rotation={rotation} />;
        default:
            const msg = `No mesh for static entity type: ${staticEntity.type}`;
            console.warn(msg);
            return <div>msg</div>;
    }
};
