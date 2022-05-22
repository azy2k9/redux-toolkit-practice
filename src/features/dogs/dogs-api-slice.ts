import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Breed {
    id: string;
    name: string;
    image: {
        url: string;
    };
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1',
    }),
    endpoints: (builder) => {
        return {
            fetchBreeds: builder.query<Array<Breed>, number | void>({
                query(limit = 10) {
                    return `/breeds?limit=${limit}`;
                },
            }),
        };
    },
});

export const { useFetchBreedsQuery } = apiSlice;
