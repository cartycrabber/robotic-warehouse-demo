import { StaticEntity } from "../static-entity/StaticEntity";

export interface DynamicEntity extends StaticEntity{
    status: string,
    payloadId?: string,
}
