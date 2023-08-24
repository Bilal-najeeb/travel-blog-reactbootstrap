import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        blog: blogReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})



export default store;