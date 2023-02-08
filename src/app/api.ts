import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DynamicEntity } from '../features/dynamic-entity/DynamicEntity';
import { Position3D } from '../features/map-models/Map';
import { StaticEntity } from '../features/static-entity/StaticEntity';
import { Task } from '../features/tasks/Task';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://warehouse-demo.wcarty.dev/api' }),
    endpoints: builder => ({
        getDynamicEntities: builder.query<DynamicEntity[], void>({
            query: () => '/dynamic-entities',
        }),
        getStaticEntities: builder.query<StaticEntity[], void>({
            query: () => '/static-entities',
        }),
        createTask: builder.mutation<Task, Task>({
            query: (task) => ({
                url: '/create-task',
                method: 'POST',
                body: task,
            })
        }),
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks',
            transformResponse: toTaskArray
        })
    }),
});

interface RawTypeResult {
    assignedRobotId: string,
    creationDate: number,
    id: string,
    name: string,
    payloadDestination: Position3D,
    payloadId: string,
}

function toTaskArray(rawResult: RawTypeResult[]) {
    return rawResult.map(toTask);
}

function toTask(rawResult: RawTypeResult): Task {
    return {
        id: rawResult.id,
        name: rawResult.name,
        payloadId: rawResult.payloadId,
        payloadDestination: rawResult.payloadDestination,
        assignedRobotId: rawResult.assignedRobotId,
        creationDate: rawResult.creationDate,
    }
}

export const { useGetDynamicEntitiesQuery, useGetStaticEntitiesQuery, useCreateTaskMutation, useGetTasksQuery } = apiSlice
