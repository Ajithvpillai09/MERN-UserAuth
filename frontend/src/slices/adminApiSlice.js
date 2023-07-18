import {adminApi } from './apiSlice';
const ADMIN_URL = '/api/admin';

export const adminApiSlice =adminApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    create:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/users`,
        method:'POST',
        body:data,
      })
    })
  }),
});


export const { useLoginMutation ,useCreateMutation} = adminApiSlice;