import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        admin:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null,
       
    },
    reducers:{
        adminLogin:(state,action)=>{
            state.admin=action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
    }
})

export const {adminLogin} = adminSlice.actions;

export default adminSlice.reducer;