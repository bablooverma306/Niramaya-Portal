import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// GET ALL
export const getAllDoctors = createAsyncThunk(
  "doctor/getAll",
  async () => {
    const res = await API.get("/doctor/get-all");
    return res.data.doctor;
  }
);

// GET DETAILS
export const getDoctorDetails = createAsyncThunk(
  "doctor/getDetails",
  async (id) => {
    const res = await API.get(`/doctor/get-details/${id}`);
    return res.data.doctor;
  }
);

// ADD
export const addDoctor = createAsyncThunk(
  "doctor/add",
  async (formData) => {
    const res = await API.post("/doctor/add", formData);
    return res.data.doctor;
  }
);

// UPDATE
export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async ({ id, formData }) => {
    const res = await API.patch(`/doctor/update/${id}`, formData);
    return res.data.doctor;
  }
);

// DELETE
export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async (id) => {
    await API.delete(`/doctor/delete/${id}`);
    return id;
  }
);

// UPDATE STATUS
export const updateDoctorStatus = createAsyncThunk(
  "doctor/updateStatus",
  async ({ id, available }) => {
    const res = await API.patch(`/doctor/update-status/${id}`, {
      available,
    });
    return res.data.doctor;
  }
);
