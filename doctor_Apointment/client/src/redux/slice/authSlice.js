import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAppointments,
  getLoginUserDetails,
  getUserData,
  loadToken,
  login,
  register,
  updateUserData,
  cancelStatus,
  deleteUserAppointment,
  resetPassword,
  bookAppointment,
  sendWebMessage   // ✅ ADD THIS
} from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    updateSuccess: false,
    user: null,
    appointments: [],
    token: null,
    error: null,
    passwordUpdated: false,
  },

  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
      state.updateSuccess = false;
      state.passwordUpdated = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.appointments = [];
      localStorage.removeItem("appData");
    },

    // ✅ ADD THIS (IMPORTANT 🔥)
    clearMessageState: (state) => {
      state.success = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
     .addCase(login.pending, (state) => {
  state.loading = true;
})
.addCase(login.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;

  state.user = action.payload.user;
  state.token = action.payload.token;

  // ✅ localStorage bhi yahi handle karo
  localStorage.setItem("appData", JSON.stringify(action.payload));
})
.addCase(login.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // USER DATA
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // TOKEN
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })

      // LOGIN USER DETAILS
//       .addCase(login.fulfilled, (state, action) => {
//   state.loading = false;
//   state.success = true;

//   state.user = action.payload.user;
//   state.token = action.payload.token;

//   // 🔥 KEEP LOCALSTORAGE IN SYNC
//   localStorage.setItem("appData", JSON.stringify(action.payload));
// })

      // UPDATE USER
   .addCase(updateUserData.fulfilled, (state, action) => {
  state.loading = false;
  state.updateSuccess = true;

  if (action.payload?.user) {
    state.user = action.payload.user;   // ✅ SAFE UPDATE
  }
})

      // BOOK APPOINTMENT
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET APPOINTMENTS
      .addCase(getUserAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload?.appointments || [];
      })
      .addCase(getUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CANCEL
      .addCase(cancelStatus.fulfilled, (state) => {
        state.updateSuccess = true;
      })

      // DELETE APPOINTMENT
      .addCase(deleteUserAppointment.fulfilled, (state, action) => {
        state.updateSuccess = true;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload.id
        );
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordUpdated = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordUpdated = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.passwordUpdated = false;
      })

      // ✅ SEND WEB MESSAGE (CONTACT FORM)
      .addCase(sendWebMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendWebMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendWebMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
export const { reset, logout, clearMessageState } = authSlice.actions;
