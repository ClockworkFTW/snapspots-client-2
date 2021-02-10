import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

import * as authAPI from "services/auth";

const JWT_SECRET = "trinity";
const LOCAL_STORAGE_NAME = "snapspots-user-token";

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const token = await authAPI.signUp(credentials);
      const payload = jwt.verify(token, JWT_SECRET);
      localStorage.setItem(LOCAL_STORAGE_NAME, token);
      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const token = await authAPI.signIn(credentials);
      const payload = jwt.verify(token, JWT_SECRET);
      localStorage.setItem(LOCAL_STORAGE_NAME, token);
      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, status: null, error: null },
  reducers: {
    initUser: (state) => {
      const token = localStorage.getItem(LOCAL_STORAGE_NAME);
      if (!token) {
        state.data = null;
      } else {
        const payload = jwt.verify(token, JWT_SECRET);
        state.data = payload;
      }
    },
    signOut: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_NAME);
      state.data = null;
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.status = "loading";
    },
    [signUp.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.status = "success";
    },
    [signUp.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    [signIn.pending]: (state) => {
      state.status = "loading";
    },
    [signIn.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.status = "success";
    },
    [signIn.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const { initUser, signOut } = userSlice.actions;

export default userSlice.reducer;
