import axios from "axios"

export const baseURL = "https://taskfourapi.herokuapp.com/api/"

export const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(async req => {
    const token = localStorage.getItem('token')
    if (token) req.headers.Authorization = "Bearer_" + token
    return req
})

export const fetchUser = async () => {
    return await instance.get('user')
}

export const userRegister = async (data) => {
    return await instance.post('register', data)
}

export const userLogin = async (data) => {
    return await instance.post('login', data)
}

export const fetchUsers = async (params) => {
    return await instance.get('users', { params })
}

export const fetchLockUsers = async (userIDs) => {
    return await instance.put('users/lock', { userIDs })
}

export const fetchUnlockUsers = async (userIDs) => {
    return await instance.put('users/unlock', { userIDs })
}

export const destroyUsers = async (userIDs) => {
    return await instance.post('users/destroy', { userIDs })
}