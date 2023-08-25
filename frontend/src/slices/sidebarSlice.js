import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: '',

};

const sidebarSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggle: (state, action) => {
      // Use a switch statement to handle different action types
  
          state.isActive = action.payload;

    },
    decrement: (state) => {
      // Use if-else statements to handle different cases
      if (state.count > 0) {
        state.count -= 1;
      }
    },
  },
});

export const { toggle, decrement } = sidebarSlice.actions;

export default sidebarSlice.reducer;
