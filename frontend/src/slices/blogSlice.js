import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogData: [],
};


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogDataToSlice: (state, action) => {
            state.blogData = action.payload
        },
        removeBlogDataFromSlice: (state, action) => {

        },
    }
})

export const {setBlogDataToSlice} = blogSlice.actions;

export default blogSlice.reducer;