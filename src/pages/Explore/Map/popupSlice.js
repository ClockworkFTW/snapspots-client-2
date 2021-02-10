import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: null,
  reducers: {
    setPopup: (state, action) => action.payload.spot,
  },
});

export const { setPopup } = popupSlice.actions;

export default popupSlice.reducer;
