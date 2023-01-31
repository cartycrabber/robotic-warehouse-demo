import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DynamicEntity } from '../features/dynamic-entity/DynamicEntity';
import { StaticEntity } from '../features/static-entity/StaticEntity';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swarm-navigation-demo-api.azure-api.net' }),
    endpoints: builder => ({
        getDynamicEntities: builder.query<DynamicEntity[], void>({
            query: () => '/dynamic-entities',
        }),
        getStaticEntities: builder.query<StaticEntity[], void>({
            query: () => '/static-entities',
        }),
    }),
});

export const { useGetDynamicEntitiesQuery, useGetStaticEntitiesQuery } = apiSlice
