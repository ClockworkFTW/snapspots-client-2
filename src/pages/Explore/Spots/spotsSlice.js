import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as spotsAPI from "services/spots";
import { EXPLORE } from "navigation/CONSTANTS";

export const getSpots = createAsyncThunk(
  "spots/getSpots",
  async ({ query, history }, { rejectWithValue }) => {
    try {
      const entities = await spotsAPI.getSpots(query);
      if (history) history.push(EXPLORE);
      return entities;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const spotsSlice = createSlice({
  name: "spots",
  initialState: { entities: [], status: null, error: null },
  reducers: {
    setPopup: (state, action) => {
      state.entities = state.entities.map((spot) =>
        spot.id === action.payload.id
          ? { ...spot, popup: true }
          : { ...spot, popup: false }
      );
    },
  },
  extraReducers: {
    [getSpots.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSpots.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.status = "success";
      state.error = null;
    },
    [getSpots.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setPopup } = spotsSlice.actions;

export default spotsSlice.reducer;
