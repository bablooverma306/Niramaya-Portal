import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// get all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (thunkAPI) => {
    try {
      const res = await API.get('/user/get-all');
      return res.data;

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Login error';

      return thunkAPI.rejectWithValue(message); // ✅ FIX
    }
  }
);

// get user details
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/user/get-user/${id}`);

      const userData = res.data.user;

      // 🔥 image अलग करो
      const { Image, ...restUser } = userData;

      return {
        user: restUser,
        image: Image,
        appointments: res.data.appointments
      };

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "user details error";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//// get all stats

export const getStats = createAsyncThunk(
  "user/getStats",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/user/get-stats");
      return res.data;

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "get-Status error";

      return thunkAPI.rejectWithValue(message);
    }
  }
);