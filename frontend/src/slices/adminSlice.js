import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        users:[]
    },
    reducers:{
        adminLogin:(state,action)=>{
            state.users.push(action.payload.users)
        },
        createUser:(state,action)=>{
            state.users.push(action.payload.users)
        }
    }
})

export const {adminLogin , createUser} = adminSlice.actions;

export default adminSlice.reducer;