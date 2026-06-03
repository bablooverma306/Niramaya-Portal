import mongoose from "mongoose";

const appoinmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "doctor", // SAME
    },

    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    amount: { type: String, required: true },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancel"],
    },

    payment: { type: Boolean, default: false },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointment", appoinmentSchema);

export default appointmentModel;
