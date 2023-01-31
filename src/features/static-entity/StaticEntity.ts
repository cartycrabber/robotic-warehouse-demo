export interface Position3D {
    X: number,
    Y: number,
    Z: number,
}

export interface Rotation3D {
    xRotation: number,
    yRotation: number,
    zRotation: number,
}

export interface StaticEntity {
    id: string,
    type: string,
    name: string,
    position: Position3D,
    rotation: Rotation3D,
}
