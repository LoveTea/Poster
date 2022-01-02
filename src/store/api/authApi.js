import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (login, password) => ({
                url: 'login',
                method: 'POST',
                data: { login, password },
            }),
        }),
    }),
})

export const { useLoginMutation } = authApi
