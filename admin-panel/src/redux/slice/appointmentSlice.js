import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  getAppointmentDetails,
  updateAppointmentStatus,
  cancelAppointment,
} from "../actions/appointmentAction";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
    appointment: null,
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })

      .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.appointment = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          (a) => a._id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index].status = action.payload.status;
        }
      })

      // CANCEL
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          (a) => a._id === action.payload
        );
        if (index !== -1) {
          state.appointments[index].status = "cancel";
        }
      });
  },
});

export default appointmentSlice.reducer;