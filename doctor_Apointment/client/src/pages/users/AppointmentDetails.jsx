import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../Api/Api.jsx";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";   // ✅ ADD

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();  // ✅ ADD

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await API.get(
          `/appointment/get-user-appointment-details/${id}`
        );

        setData(res.data.appointmentDetails);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/appointment/delete/${id}`);
      toast.success(t("appointmentDeleted"));
      navigate("/user/appointment");
    } catch (error) {
      toast.error(error?.response?.data?.message || t("deleteFailed"));
    }
  };

  if (loading)
    return <h5 className="text-center mt-5">{t("loading")}</h5>;

  if (!data)
    return (
      <h5 className="text-center mt-5 text-danger">
        {t("noAppointment")}
      </h5>
    );

  return (
    <div className="container py-5">

      <div className="card shadow-lg border-0 rounded-4 p-4">

        <h3 className="text-center text-primary mb-4">
          {t("appointmentDetails")}
        </h3>

        <div className="row">

          {/* DOCTOR */}
          <div className="col-md-6 border-end">
            <h5 className="text-success mb-3">{t("doctorInfo")}</h5>

            <img
              src={
                data.doctorId?.Image
                  ? `data:image/jpeg;base64,${data.doctorId.Image}`
                  : "https://via.placeholder.com/120"
              }
              alt="doctor"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            <p><b>{t("name")}:</b> {data.doctorId?.name}</p>
            <p><b>{t("email")}:</b> {data.doctorId?.email}</p>
            <p><b>{t("phone")}:</b> {data.doctorId?.phone}</p>
            <p><b>ID:</b> {data.doctorId?._id}</p>
          </div>

          {/* PATIENT */}
          <div className="col-md-6">
            <h5 className="text-primary mb-3">{t("patientInfo")}</h5>

            <img
              src={
                data.userId?.Image
                  ? `data:image/jpeg;base64,${data.userId.Image}`
                  : "https://via.placeholder.com/120"
              }
              alt="user"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            <p><b>{t("name")}:</b> {data.userId?.name}</p>
            <p><b>{t("email")}:</b> {data.userId?.email}</p>
            <p><b>{t("phone")}:</b> {data.userId?.phone}</p>
            <p>
              <b>{t("userId")}:</b>{" "}
              {typeof data.userId === "object"
                ? data.userId._id
                : data.userId}
            </p>
          </div>

        </div>

        <hr className="my-4" />

        {/* BOOKING INFO */}
        <div className="row text-center">

          <div className="col-md-4">
            <h6>{t("date")}</h6>
            <h5>{data.slotDate}</h5>
          </div>

          <div className="col-md-4">
            <h6>{t("time")}</h6>
            <h5>{data.slotTime}</h5>
          </div>

          <div className="col-md-4">
            <h6>{t("amount")}</h6>
            <h5 className="text-success">₹{data.amount}</h5>
          </div>

        </div>

        {/* STATUS */}
        <div className="text-center mt-4">
          <span
            className={`px-4 py-2 rounded-pill text-white ${
              data.status === "pending"
                ? "bg-warning"
                : data.status === "cancel"
                ? "bg-danger"
                : "bg-success"
            }`}
          >
            {t(data.status)}   {/* ✅ dynamic translate */}
          </span>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
