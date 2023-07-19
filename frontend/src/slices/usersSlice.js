import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name:'user',
    initialState:{
        user:[]
    },
    reducers:{
        getUsers:(state,action)=>{
            state.user = action.payload
        },
        createUser:(state,action)=>{
            state.user.push(action.payload)
        },
        removeUser:(state,action)=>{
            const indexToRemove = state.user.findIndex((item) => item._id === action.payload.id);
            if (indexToRemove !== -1) {
                state.user.splice(indexToRemove, 1);
            }
        }
    }
})

export const {getUsers ,createUser ,removeUser} = usersSlice.actions

export default usersSlice.reducer;

