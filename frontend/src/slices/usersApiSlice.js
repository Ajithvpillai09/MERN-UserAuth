import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/logout`,
        method:'POST'
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      })
    }),
    updateUserProfilePic:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/image`,
        method:'PUT',
        body:data,
        formData: true
      })
    })
  }),
  
});


export const { useLoginMutation ,useLogoutMutation ,useRegisterMutation ,useUpdateUserMutation,useUpdateUserProfilePicMutation} = userApiSlice;