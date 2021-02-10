import { createSlice } from "@reduxjs/toolkit";

export const viewportSlice = createSlice({
  name: "viewport",
  initialState: null,
  reducers: {
    updateViewport: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { updateViewport } = viewportSlice.actions;

export default viewportSlice.reducer;
