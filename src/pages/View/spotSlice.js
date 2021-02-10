import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as spotAPI from "services/spots";
import * as reviewAPI from "services/review";

export const getSpot = createAsyncThunk(
  "spot/getSpot",
  async ({ id, history }) => {
    try {
      const data = await spotAPI.getSpot(id);
      if (history) history.push(`/spot/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createSpot = createAsyncThunk(
  "spot/createSpot",
  async ({ spot, history }) => {
    try {
      const data = await spotAPI.createSpot(spot);
      if (history) history.push(`/spot/${data.id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSpot = createAsyncThunk(
  "spot/updateSpot",
  async ({ spot, history }) => {
    try {
      const data = await spotAPI.updateSpot(spot);
      if (history) history.push(`/spot/${data.id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSpot = createAsyncThunk(
  "spot/deleteSpot",
  async ({ id, history }) => {
    try {
      await spotAPI.deleteSpot(id);
      if (history) history.push(`/`);
      return null;
    } catch (error) {
      throw error;
    }
  }
);

export const createReview = createAsyncThunk(
  "spot/createReview",
  async (review) => {
    try {
      const data = await reviewAPI.createReview(review);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const spotSlice = createSlice({
  name: "spot",
  initialState: { data: null, status: null },
  reducers: {},
  extraReducers: {
    [getSpot.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSpot.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getSpot.rejected]: (state, action) => {
      state.status = "failed";
    },
    [createSpot.pending]: (state, action) => {
      state.status = "loading";
    },
    [createSpot.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [createSpot.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateSpot.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateSpot.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [updateSpot.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteSpot.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteSpot.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [deleteSpot.rejected]: (state, action) => {
      state.status = "failed";
    },
    [createReview.pending]: (state, action) => {
      state.status = "loading";
    },
    [createReview.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [createReview.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default spotSlice.reducer;
