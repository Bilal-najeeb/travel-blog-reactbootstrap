import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice'
import sideBarSlice from './slices/sideBarSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        blog: blogReducer,
        sidebar: sideBarSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})



export default store;