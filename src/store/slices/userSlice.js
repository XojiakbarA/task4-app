import {createSlice} from "@reduxjs/toolkit";
import {getUser, login, logout} from "../actionCreators";


const initialState = {
    data: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getUser.pending]: (state) => {
            state.loading = true
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [login.pending]: (state) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload.data
            state.token = action.payload.token
            state.error = null
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [logout.fulfilled]: (state) => {
            localStorage.removeItem("token")
            state.data = null
            state.token = null
        }
    }
})

export default userSlice.reducer