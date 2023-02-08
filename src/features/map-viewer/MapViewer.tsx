import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Euler } from "three";
import { useGetDynamicEntitiesQuery, useGetStaticEntitiesQuery } from "../../app/api";
import { DynamicEntity } from "../dynamic-entity/DynamicEntity";
import { WarehouseMesh } from "../map-models/WarehouseMesh";
import { StaticEntity } from "../static-entity/StaticEntity";
import { Spinner } from "react-bootstrap";
import { MapModel } from "../map-models/MapModel";
import { RobotMesh } from "../map-models/RobotMesh";
import { ShelfMesh } from "../map-models/ShelfMesh";
import { PackageMesh } from "../map-models/PackageMesh";

export function MapViewer() {
    const getDynamicEntitiesResponse = useGetDynamicEntitiesQuery(undefined, {
        pollingInterval: 1000,
    });
    const getStaticEntitiesResponse = useGetStaticEntitiesQuery();

    if (getDynamicEntitiesResponse.error || getStaticEntitiesResponse.error) {
        return <p>Error while getting entities</p>;
    }
    if (getDynamicEntitiesResponse.isLoading || getStaticEntitiesResponse.isLoading) {
        return <Spinner />;
    }

    const dynamicEntities: JSX.Element[] | undefined = getDynamicEntitiesResponse.data?.map(mapDynamicEntityToMesh);
    const staticEntities: JSX.Element[] | undefined = getStaticEntitiesResponse.data?.map(mapStaticEntityToMesh);

    return (
        <div className=" w-100 h-100">
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

const mapDynamicEntityToMesh = (dynamicEntity: DynamicEntity): JSX.Element => {


    switch (dynamicEntity.type) {
        case 'robot':
            return <MapModel
                key={dynamicEntity.id}
                position={dynamicEntity.position}
                rotation={dynamicEntity.rotation}>
                <RobotMesh />
            </MapModel>;
        default:
            const msg = `No mesh for dynamic entity type: ${dynamicEntity.type}`;
            console.warn(msg);
            return <div>msg</div>;
    }
};

const mapStaticEntityToMesh = (staticEntity: StaticEntity): JSX.Element => {

    switch (staticEntity.type) {
        case 'shelf':
            return <MapModel
                key={staticEntity.id}
                position={staticEntity.position}
                rotation={staticEntity.rotation}>
                <ShelfMesh position={[-0.5, 0, 0]} />
                <ShelfMesh position={[0.5, 0, 0]} />
            </MapModel>;
        case 'box':
            return <MapModel
            key={staticEntity.id}
            position={staticEntity.position}
            rotation={staticEntity.rotation}>
            <PackageMesh />
        </MapModel>;
        default:
            const msg = `No mesh for static entity type: ${staticEntity.type}`;
            console.warn(msg);
            return <div>msg</div>;
    }
};
