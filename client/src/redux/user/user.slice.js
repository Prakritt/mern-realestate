import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart: (state)=>{
            state.loading = true
            // console.log("loading",state.loading)
        },
        signInSuccess : (state,action)=>{
            console.log(action)
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
            // console.log("loading",state.loading)
        },
        signInFailure : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
            // console.log("loading",state.loading)
        }
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;