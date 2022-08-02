import {createSlice} from "@reduxjs/toolkit";
import {getUsers, lockUsers, unLockUsers, deleteUsers} from "../actionCreators";


const initialState = {
    data: { content: [] },
    loading: false,
    error: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [lockUsers.pending]: (state) => {
            state.loading = true
        },
        [lockUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.data.content = state.data.content.map(user => {
                if (action.payload.includes(user.id)) {
                    return { ...user, nonLocked: false }
                }
                return user
            })
            state.error = null
        },
        [lockUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [unLockUsers.pending]: (state) => {
            state.loading = true
        },
        [unLockUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.data.content = state.data.content.map(user => {
                if (action.payload.includes(user.id)) {
                    return { ...user, nonLocked: true }
                }
                return user
            })
            state.error = null
        },
        [unLockUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteUsers.pending]: (state) => {
            state.loading = true
        },
        [deleteUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.error = null
        },
        [deleteUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default usersSlice.reducer