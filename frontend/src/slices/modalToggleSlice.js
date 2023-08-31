import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
};


const modalToggleSlice = createSlice({
    name: 'modaltoggle',
    initialState,
    reducers: {
        setToggle: (state) => {
            state.isVisible = !state.isVisible;
            
        }
    }
})

export const {setToggle} = modalToggleSlice.actions;

export default modalToggleSlice .reducer;