import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api.jsx";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/login", { email, password });
      localStorage.setItem("appData", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkApi) => {
 
    try {
      const res = await API.post("/user/register", { name, email, password });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// GET USER APPOINTMENTS ✅ (THIS NAME MUST MATCH SLICE)
export const getUserAppointments = createAsyncThunk(
  "user/getUserAppointments",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/appointment/get-user-appointment/${id}`);

      console.log("🔥 API RESPONSE:", res.data);

      // ✅ IMPORTANT FIX
      return {
        appointments: res.data.appointments,
      };

    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// CANCEL APPOINTMENT
export const cancelStatus = createAsyncThunk(
  "user/cancelStatus",
  async (id, thunkApi) => {
    try {
      const res = await API.post(`/appointment/cancel/${id}`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteUserAppointment = createAsyncThunk(
  "user/deleteUserAppointment",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/appointment/delete/${id}`);
      return { ...res.data, id };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// USER DATA
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkAPI) => {
    try {
      const localData = localStorage.getItem("appData");

      if (!localData) return null;

      const appData = JSON.parse(localData);

      return appData?.user;

    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load user");
    }
  }
);

// TOKEN
export const loadToken = createAsyncThunk(
  "auth/loadToken",
  () => {
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    return appData?.token;
  }
);

// LOGIN USER DETAILS
export const getLoginUserDetails = createAsyncThunk(
  "user/getLoginUserDetails",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/user/get-login-user/${id}`);

      return {
        user: res.data.user   // 🔥 FULL USER WITH IMAGE
      };

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE USER
export const updateUserData = createAsyncThunk(
  "auth/updateUser",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.patch(`/user/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // 🔥 LOCALSTORAGE UPDATE (MOST IMPORTANT)
      const localData = JSON.parse(localStorage.getItem("appData"));

      if (localData) {
        localStorage.setItem(
          "appData",
          JSON.stringify({
            ...localData,
            user: res.data.user   // 🔥 UPDATED USER SAVE
          })
        );
      }

      return res.data;

    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//// reset password

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ id, oldPassword, newPassword }, thunkAPI) => {
    try {
      const data = JSON.parse(localStorage.getItem("appData"));

      const res = await API.patch(
        `/user/update-password/${id}`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
    
      return res.data; // ✅ MUST

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "update-password error"
      );
    }
  }
);

/// appoiintment booking
export const bookAppointment = createAsyncThunk(
  "user/bookAppointment",
  async (bookingData, thunkApi) => {
    try {
      const res = await API.post("/appointment/create", bookingData);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "bookAppointment error";
      return thunkApi.rejectWithValue(message);
    }
  }
);


///  send message from contact form

export const sendWebMessage = createAsyncThunk(
  "user/sendWebMessage",
  async ( msgData, thunkAPI) => {
    try {
     

      const res = await API.post(
        `/webmessage/create`,msgData
       
      )
    
      return res.data; // ✅ MUST

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "sendWebMessage error"
      );
    }
  }
);
