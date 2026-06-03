import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDoctors,
  getDoctorDetails,
  deleteDoctor,
  updateDoctorStatus,
  updateDoctor,
} from "../actions/doctorActions";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    doctor: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })

      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.doctor = action.payload;
      })

      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(
          (doc) => doc._id !== action.payload
        );
      })

      .addCase(updateDoctorStatus.fulfilled, (state, action) => {
        const index = state.doctors.findIndex(
          (doc) => doc._id === action.payload._id
        );
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })

      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.doctor = action.payload;
      });
  },
});

export default doctorSlice.reducer;