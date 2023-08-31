import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice'
import sideBarSlice from './slices/sideBarSlice';
import modalToggleSlice from './slices/modalToggleSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        blog: blogReducer,
        sidebar: sideBarSlice,
        modalToggle: modalToggleSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})



export default store;