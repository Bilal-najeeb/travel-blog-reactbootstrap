import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: '',

};

const sidebarSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggle: (state, action) => {
  
          state.isActive = action.payload;

    }
  },
});

export const { toggle, decrement } = sidebarSlice.actions;

export default sidebarSlice.reducer;
