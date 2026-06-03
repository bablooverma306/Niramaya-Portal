import express from "express";
import { userAuth, isAdmin } from "../middleware/authMiddleware.js";
import {
  bookAppointment,
  cancelAppointment,
  createAppointmentOrder,
  deleteAppointment,
  getAllppointments,
  getAppointmentDetails,
  getPaymentConfig,
  getUserAppointmentDetails,
  getUserAppointments,
  updateAppointmentSattus,
  verifyAppointmentPayment,
} from "../controllers/appointmentsController.js";

const router = express.Router();

router.post("/create", userAuth, bookAppointment);
router.get("/payment-config", userAuth, getPaymentConfig);
router.post("/create-order", userAuth, createAppointmentOrder);
router.post("/verify-payment", userAuth, verifyAppointmentPayment);

router.get("/get-all", userAuth, isAdmin, getAllppointments);
router.get("/get-details/:id", userAuth, isAdmin, getAppointmentDetails);
router.patch("/update-status/:id", userAuth, isAdmin, updateAppointmentSattus);

router.get("/get-user-appointment/:id", userAuth, getUserAppointments);
router.get("/get-user-appointment-details/:id", userAuth, getUserAppointmentDetails);

router.post("/cancel/:id", userAuth, cancelAppointment);
router.delete("/delete/:id", userAuth, deleteAppointment);

export default router;
