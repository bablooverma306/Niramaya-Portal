import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";
import { getAllUsers, getStats, getUserDetails } from "../actions/userAction";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    users: null,
    user: null,
    image: null,        // ✅ ADD
    error: null,
    appointments: null,
    stats: null,
  },

  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔐 LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👥 GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👤 GET USER DETAILS
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.image = action.payload.image;  // ✅ FIX
        state.appointments = action.payload.appointments;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      
  // 👥 GET ALL stats
      .addCase(getStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stats = action.payload.stats;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


 


export default userSlice.reducer;
export const { reset } = userSlice.actions;