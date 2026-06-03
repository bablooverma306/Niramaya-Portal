import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// GET ALL
export const getAllAppointments = createAsyncThunk(
  "appointment/getAll",
  async () => {
    const res = await API.get("/appointment/get-all");
    return res.data.appointments;
  }
);

// GET DETAILS
export const getAppointmentDetails = createAsyncThunk(
  "appointment/getDetails",
  async (id) => {
    const res = await API.get(`/appointment/get-details/${id}`);
    return res.data.appointmentDetails;
  }
);

// UPDATE STATUS
export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateStatus",
  async ({ id, status }) => {
   await API.patch(`/appointment/update-status/${id}`, {
  appointmentStatus: status,
});
    return { id, status };
  }
);

// CANCEL
export const cancelAppointment = createAsyncThunk(
  "appointment/cancel",
  async (id) => {
   await API.post(`/appointment/cancel/${id}`);
    return id;
  }
);