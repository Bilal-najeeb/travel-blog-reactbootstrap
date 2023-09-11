import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    isCatVisible: false,
    isLocVisible: false,
    isSubLocVisible: false,
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
            
        },
        setLocToggle: (state) => {
            state.isLocVisible = !state.isLocVisible;
            
        },
        setSubLocToggle: (state) => {
            state.isSubLocVisible = !state.isSubLocVisible;
            
        }
    }
})

export const {setToggle, setCatToggle, setLocToggle, setSubLocToggle} = modalToggleSlice.actions;

export default modalToggleSlice .reducer;