import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";
import { reset } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import API from "../../Api/Api.jsx";

const SLOT_ALREADY_BOOKED = "This slot is already booked";

const isRazorpayAuthIssue = (error) => {
  const message = error?.response?.data?.message || error?.message || "";
  return /razorpay|authentication failed|credentials are missing|not configured/i.test(
    message
  );
};

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Appointment = () => {
  const { id } = useParams();
  const [docinfo, setDocinfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [processingPayment, setProcessingPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor } = useSelector((state) => state.doctor);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (doctor) {
      setDocinfo(doctor);
    }
  }, [doctor]);

  const extractDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const extractTime = (timeObj) => {
    let hours = timeObj.getHours();
    const minutes = timeObj.getMinutes();
    const second = timeObj.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(second).padStart(2, "0")} ${ampm}`;
  };

  const getBookingErrorMessage = (error) => {
    const message = error?.response?.data?.message || error?.message || "";

    if (message === SLOT_ALREADY_BOOKED) {
      return t("slotAlreadyBooked");
    }

    return message || t("bookingFailed");
  };

  const bookWithoutPayment = async () => {
    const bookingData = {
      userId: user._id,
      doctorId: id,
      slotDate: extractDate(selectedDate),
      slotTime: extractTime(selectedDate),
      amount: docinfo.fees,
    };

    const { data } = await API.post("/appointment/create", bookingData);

    if (!data?.success) {
      throw new Error(data?.message || "Unable to book appointment");
    }

    toast.success("Appointment booked successfully");
    dispatch(reset());
    setProcessingPayment(false);
    navigate("/user/appointment");
  };

  const handleBooking = async () => {
    if (!user?._id) {
      toast.error("Please login first");
      return;
    }

    if (!docinfo?.fees) {
      toast.error("Doctor fee is missing");
      return;
    }

    setProcessingPayment(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        await bookWithoutPayment();
        return;
      }

      const bookingData = {
        userId: user._id,
        doctorId: id,
        slotDate: extractDate(selectedDate),
        slotTime: extractTime(selectedDate),
        amount: docinfo.fees,
      };

      const [{ data: paymentConfig }, { data: orderResponse }] = await Promise.all([
        API.get("/appointment/payment-config"),
        API.post("/appointment/create-order", bookingData),
      ]);

      const options = {
        key: paymentConfig.keyId,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: "Doctor Appointment",
        description: `Appointment with Dr. ${docinfo?.name || ""}`,
        order_id: orderResponse.order.id,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        notes: {
          doctorId: id,
          appointmentId: orderResponse.appointmentId,
          slotDate: bookingData.slotDate,
          slotTime: bookingData.slotTime,
        },
        theme: {
          color: "#0d6efd",
        },
        handler: async (response) => {
          try {
            await API.post("/appointment/verify-payment", {
              appointmentId: orderResponse.appointmentId,
              ...response,
            });

            toast.success(t("bookingSuccess"));
            dispatch(reset());
            navigate("/user/appointment");
          } catch (error) {
            toast.error(getBookingErrorMessage(error));
          } finally {
            setProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessingPayment(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", async (response) => {
        const message =
          response?.error?.description || response?.error?.reason || t("bookingFailed");
        toast.error(message);
        setProcessingPayment(false);
      });
      paymentObject.open();
    } catch (error) {
      if (isRazorpayAuthIssue(error)) {
        try {
          await bookWithoutPayment();
          return;
        } catch (fallbackError) {
          toast.error(getBookingErrorMessage(fallbackError));
        }
      }

      toast.error(getBookingErrorMessage(error));
      dispatch(reset());
      setProcessingPayment(false);
    }
  };

  return (
    <div className="container docinfo-container py-5">
      <div className="row bg-white shadow-lg rounded-3 p-4">
        <div className="col-md-3 d-flex flex-column align-items-center mt-3 border-end">
          <img
            src={`data:image/jpeg;base64,${docinfo?.Image}`}
            alt="doctor"
            height={200}
            width={250}
            className="rounded-3 shadow-sm object-cover"
          />

          <h4 className="mt-3 fw-bold text-dark">{docinfo?.name}</h4>

          <h5
            className={`mt-2 px-3 py-1 rounded-pill text-white ${
              docinfo?.available ? "bg-success" : "bg-danger"
            }`}
          >
            {docinfo?.available ? t("available") : t("notAvailable")}
          </h5>
        </div>

        <div className="col-md-9 d-flex flex-column align-items-center mt-3">
          <div className="w-100 px-3">
            <h5 className="text-muted">
              <span className="fw-semibold text-dark">{t("about")}:</span>{" "}
              {docinfo?.about}
            </h5>

            <h4 className="mt-2">
              {t("specialist")}:{" "}
              <span className="text-primary fw-semibold">{docinfo?.speciality}</span>
            </h4>

            <h4>
              {t("experience")}:{" "}
              <span className="text-dark fw-semibold">
                {docinfo?.experince} {t("years")}
              </span>
            </h4>

            <h4>
              {t("consultationFees")}:{" "}
              <span className="text-success fw-bold">Rs. {docinfo?.fees}</span>
            </h4>

            <div className="mt-4 p-3 border rounded-3 bg-light shadow-sm">
              <h6 className="fw-semibold text-dark mb-2">{t("selectDateTime")}</h6>

              <DatePicker
                className="form-control shadow-sm"
                minDate={new Date()}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                dateFormat="d-MMM-yyyy h:mm aa"
                timeCaption={t("time")}
                minTime={setHours(setMinutes(new Date(), 0), 0)}
                maxTime={setHours(setMinutes(new Date(), 59), 23)}
              />

              <p className="mt-2 text-muted">
                {t("booking")}:
                <span className="fw-semibold text-dark">
                  {" "}
                  {selectedDate ? selectedDate.toLocaleString() : t("selectDate")}
                </span>
              </p>
            </div>

            <button
              className="btn btn-primary w-50 mt-3 shadow-sm"
              disabled={!docinfo?.available || processingPayment}
              onClick={handleBooking}
            >
              {processingPayment
                ? "Processing..."
                : docinfo?.available
                  ? "Pay & Book Appointment"
                  : t("doctorNotAvailable")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
