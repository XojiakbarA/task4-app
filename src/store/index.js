import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import snackbarReducer from "./slices/snackbarSlice";
import usersReducer from "./slices/usersSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        snackbar: snackbarReducer,
        users: usersReducer
    }
})