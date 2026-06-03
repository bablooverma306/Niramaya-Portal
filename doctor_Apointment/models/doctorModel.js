import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    about: { type: String, required: [true, "about is required"] },
    degree: { type: String, required: [true, "degree is required"] },
    speciality: { type: String, required: [true, "speciality is required"] },
    experince: { type: Number, required: [true, "experience is required"] },
    fees: { type: String, required: [true, "fees is required"] },
    email: { type: String, required: [true, "email is required"], unique: true },
    Image: { type: String },
    phone: { type: String },
    address: { type: String },
    dob: { type: String },
    gender: { type: String },

    // available status
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctor", doctorSchema);

export default doctorModel;