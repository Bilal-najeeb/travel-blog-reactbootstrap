import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    isCatVisible: false,
};


const modalToggleSlice = createSlice({
    name: 'modaltoggle',
    initialState,
    reducers: {
        setToggle: (state) => {
            state.isVisible = !state.isVisible;
            
        },
        setCatToggle: (state) => {
            state.isCatVisible = !state.isCatVisible;
            
        }
    }
})

export const {setToggle, setCatToggle} = modalToggleSlice.actions;

export default modalToggleSlice .reducer;