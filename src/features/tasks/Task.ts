import { Position3D } from "../map-models/Map";

export interface Task {
    id?: string,
    name: string,
    payloadId: string,
    payloadDestination: Position3D,
    assignedRobotId?: string,
    creationDate?: number,
    path?: Position3D[],
}