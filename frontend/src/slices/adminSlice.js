import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        users:[]
    },
    reducers:{
        adminLogin:(state,action)=>{
            state.users = action.payload.users
        }
    }
})

export const {adminLogin} = adminSlice.actions;

export default adminSlice.reducer;