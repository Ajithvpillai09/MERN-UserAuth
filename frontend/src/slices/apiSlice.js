import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User',],
  endpoints: (builder) => ({}),
});

export const adminApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes:['Admin'],
  endpoints:(builder)=>({}),
})