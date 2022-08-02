import {createAsyncThunk} from "@reduxjs/toolkit"
import {destroyUsers, fetchLockUsers, fetchUnlockUsers, fetchUser, fetchUsers, userLogin, userRegister} from "../api"
import {setSnackbar} from "./slices/snackbarSlice"

export const getUser = createAsyncThunk('user/get',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchUser();
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            return rejectWithValue(response.data.message)
        }
    }

)

export const register = createAsyncThunk('user/register',
    async ({ data, resetForm }, { dispatch, rejectWithValue }) => {
        try {
            const res = await userRegister(data)
            if (res.status === 201) {
                resetForm()
                dispatch(setSnackbar({ data: res.data.message, open: true, color: 'success' }))
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const login = createAsyncThunk('user/login',
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await userLogin(data)
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token)
                const user = await fetchUser()
                if (user.status === 200) {
                    dispatch(setSnackbar({ data: 'You are logged in!', open: true, color: 'success' }))
                    return { data: user.data, token: res.data.token }
                }
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const logout = createAsyncThunk('user/logout',
    async (_, { dispatch }) => {
        dispatch(setSnackbar({ data: 'You are logged out!', open: true, color: 'success' }))
        return null;
    }
)

export const getUsers = createAsyncThunk('users/get',
    async ({ params }, {dispatch, rejectWithValue}) => {
        try {
            const res = await fetchUsers(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const lockUsers = createAsyncThunk('users/lock',
    async ({ userIDs, setSelectionModel }, {dispatch, rejectWithValue, getState}) => {
        try {
            const res = await fetchLockUsers(userIDs)
            if (res.status === 200) {
                setSelectionModel([])
                dispatch(setSnackbar({ data: 'User(s) locked successfully!', open: true, color: 'success' }))
                const id = getState().user.data.id
                if (userIDs.includes(id)) {
                    dispatch(logout())
                }
                return userIDs
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const unLockUsers = createAsyncThunk('users/unlock',
    async ({ userIDs, setSelectionModel }, {dispatch, rejectWithValue}) => {
        try {
            const res = await fetchUnlockUsers(userIDs)
            if (res.status === 200) {
                setSelectionModel([])
                dispatch(setSnackbar({ data: 'User(s) unlocked successfully!', open: true, color: 'success' }))
                return userIDs
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteUsers = createAsyncThunk('users/delete',
    async ({ userIDs, setSelectionModel, params }, {dispatch, rejectWithValue, getState}) => {
        try {
            const res = await destroyUsers(userIDs)
            if (res.status === 200) {
                setSelectionModel([])
                dispatch(setSnackbar({ data: 'User(s) deleted successfully!', open: true, color: 'success' }))
                const id = getState().user.data.id
                if (userIDs.includes(id)) {
                    dispatch(logout())
                }
                dispatch(getUsers({params}))
                return null
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: 'error' }))
            return rejectWithValue(response.data.message)
        }
    }
)