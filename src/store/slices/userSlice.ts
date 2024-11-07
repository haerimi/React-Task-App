import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    id: ''
}

const userSlicce = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
        removeUser: (state) => {
            state.email = '';
            state.id = '';
        }
    }
})

export const { setUser, removeUser } = userSlicce.actions;
export const userReducer = userSlicce.reducer;