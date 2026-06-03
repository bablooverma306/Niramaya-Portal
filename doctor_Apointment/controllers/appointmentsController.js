import crypto from "crypto";
import appointmentModel from "../models/appointmentsModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

const sanitizeEnv = (value = "") =>
  String(value)
    .replace(/;/g, "")
    .replace(/^['"`<\s]+|['"`>\s]+$/g, "")
    .trim();
const SLOT_ALREADY_BOOKED = "This slot is already booked";

const findSlotConflict = ({ doctorId, slotDate, slotTime }) =>
  appointmentModel.findOne({
    doctorId,
    slotDate,
    slotTime,
    status: { $ne: "cancel" },
  });

const getRazorpayCredentials = () => {
  const keyId = sanitizeEnv(
    process.env.RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_ID ||
      process.env.RAZORPAY_id ||
      process.env.RAZORPAY_PUBLIC_KEY_ID ||
      ""
  );
  const keySecret = sanitizeEnv(
    process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_SECRET ||
      process.env.RAZORPAY_KEY ||
      process.env.RAZORPAY_SECRET_KEY ||
      ""
  );

  return { keyId, keySecret };
};

const createRazorpayOrder = async ({ amount, receipt }) => {
  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are missing");
  }

  const authToken = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authToken}`,
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
      payment_capture: 1,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.description || "Unable to create Razorpay order");
  }

  return data;
};

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, slotDate, slotTime, amount } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(400).send({
        success: false,
        message: "Doctor not found",
      });
    }

    const existingAppointment = await findSlotConflict({
      doctorId,
      slotDate,
      slotTime,
    });

    if (existingAppointment) {
      return res.status(400).send({
        success: false,
        message: SLOT_ALREADY_BOOKED,
      });
    }

    const appointment = new appointmentModel({
      userId: req.user.id,
      doctorId,
      slotDate,
      slotTime,
      amount,
    });

    await appointment.save();

    return res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in booking appointment",
      error,
    });
  }
};

export const getPaymentConfig = async (req, res) => {
  try {
    const { keyId } = getRazorpayCredentials();

    if (!keyId) {
      return res.status(500).send({
        success: false,
        message: "Razorpay key is not configured",
      });
    }

    return res.status(200).send({
      success: true,
      keyId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching payment config",
    });
  }
};

export const createAppointmentOrder = async (req, res) => {
  let appointment;

  try {
    const { doctorId, slotDate, slotTime, amount } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(400).send({
        success: false,
        message: "Doctor not found",
      });
    }

    const existingAppointment = await findSlotConflict({
      doctorId,
      slotDate,
      slotTime,
    });

    if (existingAppointment) {
      return res.status(400).send({
        success: false,
        message: SLOT_ALREADY_BOOKED,
      });
    }

    const parsedAmount = Number(amount);
    if (!parsedAmount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).send({
        success: false,
        message: "Invalid appointment amount",
      });
    }

    appointment = await appointmentModel.create({
      userId: req.user.id,
      doctorId,
      slotDate,
      slotTime,
      amount: String(parsedAmount),
      payment: false,
    });

    const order = await createRazorpayOrder({
      amount: parsedAmount * 100,
      receipt: `appt_${appointment._id.toString()}`,
    });

    appointment.razorpayOrderId = order.id;
    await appointment.save();

    return res.status(201).send({
      success: true,
      message: "Appointment order created successfully",
      appointmentId: appointment._id,
      order,
    });
  } catch (error) {
    if (appointment?._id && !appointment.razorpayOrderId) {
      await appointmentModel.findByIdAndDelete(appointment._id);
    }
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message || "Error in creating appointment order",
    });
  }
};

export const verifyAppointmentPayment = async (req, res) => {
  try {
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const { keySecret } = getRazorpayCredentials();
    if (!keySecret) {
      return res.status(500).send({
        success: false,
        message: "Razorpay secret is not configured",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    if (
      appointment.razorpayOrderId &&
      appointment.razorpayOrderId !== razorpay_order_id
    ) {
      return res.status(400).send({
        success: false,
        message: "Order id does not match this appointment",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).send({
        success: false,
        message: "Payment verification failed",
      });
    }

    appointment.payment = true;
    appointment.status = "completed";
    appointment.razorpayOrderId = razorpay_order_id;
    appointment.razorpayPaymentId = razorpay_payment_id;
    appointment.razorpaySignature = razorpay_signature;
    await appointment.save();

    return res.status(200).send({
      success: true,
      message: "Payment verified successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message || "Error in verifying payment",
    });
  }
};

export const getAllppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("userId", "name email")
      .populate("doctorId", "_id name email phone");

    return res.status(200).send({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all appointments",
      error,
    });
  }
};

export const getAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentModel
      .findById(id)
      .populate("userId", "_id name email phone")
      .populate("doctorId", "_id name email phone Image");

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).send({
      success: true,
      appointmentDetails: appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateAppointmentSattus = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentStatus } = req.body;

    await appointmentModel.findByIdAndUpdate(id, {
      status: appointmentStatus,
    });

    return res.status(200).send({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error updating status",
      error,
    });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await appointmentModel.find({ userId: id });
    const data = await userModel.populate(appointments, {
      path: "doctorId",
      select: "_id name email phone",
    });

    return res.status(200).send({
      success: true,
      appointments: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getUserAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentModel
      .findById(id)
      .populate("userId", "name email phone Image")
      .populate("doctorId", "name email phone Image");

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).send({
      success: true,
      appointmentDetails: appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get user appointment details",
      error,
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    await appointmentModel.findByIdAndUpdate(id, {
      status: "cancel",
    });

    return res.status(200).send({
      success: true,
      message: "Appointment cancelled",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in cancel appointment",
      error,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "You can delete only your own appointment",
      });
    }

    await appointmentModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting appointment",
      error,
    });
  }
};
