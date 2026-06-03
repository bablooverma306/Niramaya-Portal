import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../Api/Api.jsx'

// login
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkApi) => {
        try {
            const res = await API.post('/user/login', { email, password })

            localStorage.setItem('appData', JSON.stringify(res.data))

            return res.data

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                'Login error'

            return thunkApi.rejectWithValue(message)
        }
    }
);

/// get user  data

export const getUserData = createAsyncThunk(
    'auth/getUserData', 
    ()=>{
        
         const localData = localStorage.getItem("appData")
            const appData = JSON.parse(localData)
            return appData?.user;
    }

) 


/// get token   data

export const loadToken = createAsyncThunk(
    'auth/loadToken', 
    ()=>{
        
         const localData = localStorage.getItem("appData")
            const appData = JSON.parse(localData)
            return appData?.token;
    }

) 


