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
    getUser:builder.mutation({
      query:()=>({
        url:`${ADMIN_URL}/users`,
        method:'GET'
      })
    }),
    create:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/users`,
        method:'POST',
        body:data,
      })
    }),
    deleteUser:builder.mutation({
      query:(id)=>({
        url:`${ADMIN_URL}/users`,
        method:'DELETE',
        params:{id:id}
      })
    }),
    editUser:builder.mutation({
      query:(id)=>({
        url:`${ADMIN_URL}/edit`,
        method:'GET',
        params:{id:id}
      })
    }),
    updateUser:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/edit`,
        method:"PUT",
        body:data
      })
    })
  }),
});

export const { useLoginMutation,useGetUserMutation,useCreateMutation,useDeleteUserMutation,useEditUserMutation,useUpdateUserMutation} = adminApiSlice;