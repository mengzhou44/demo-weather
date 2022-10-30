import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   linksExpanded: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: 
   {
    expand: (state) => {
      state.linksExpanded = true
    },
    collapse: (state) => {
        state.linksExpanded = false
    },
  },
});


export const { expand, collapse} =
  headerSlice.actions;

export default headerSlice.reducer;