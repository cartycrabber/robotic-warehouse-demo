import { Euler, Vector3 } from "three";
import { Position3D, Rotation3D } from "./map-models/Map";

export const position3dToVector3 = (position: Position3D): Vector3 =>
    new Vector3(position.X, position.Y, position.Z);

export const rotation3dToEuler = (rotation: Rotation3D): Euler =>
    new Euler(
        degreesToRadians(rotation.xRotation),
        degreesToRadians(rotation.yRotation),
        degreesToRadians(rotation.zRotation));

export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

export const vector3ToPosition3d = (vector: Vector3): Position3D => ({
    X: vector.x,
    Y: vector.y,
    Z: vector.z,
})

export const isPositionEqual = (position1: Position3D, position2: Position3D): boolean => 
    approxEqual(position1.X, position2.X) && approxEqual(position1.Y, position2.Y) && approxEqual(position1.Z, position2.Z);

const approxEqual = (num1: number, num2: number, epsilon: number = 0.001): boolean =>
    Math.abs(num1 - num2) < epsilon;

export const distanceBetween = (position1: Position3D, position2: Position3D): number => {
    return Math.sqrt((position1.X + position2.X) ** 2 + (position1.Y + position2.Y) ** 2 + (position1.Z + position2.Z) ** 2);
}

export const dateToString = (msSinceEpoch: number): string => new Date(msSinceEpoch).toLocaleString();

export const position3dToString = (pos: Position3D): string => `(${pos.X}, ${pos.Y}, ${pos.Z})`;
