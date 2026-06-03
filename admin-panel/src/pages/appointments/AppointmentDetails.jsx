import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentDetails } from "../../redux/actions/appointmentAction";
import { useParams } from "react-router-dom";

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const appointmentState = useSelector((state) => state.appointment);
  const appointment =
    appointmentState?.appointmentDetails || appointmentState?.appointment;

  console.log("Frontend Data:", appointment);

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  return (
  <Layout>
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">

        <div className="card border-0 shadow-lg rounded-4 p-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-primary mb-0">
              📋 Appointment Details
            </h3>

            <span
              className={`badge px-3 py-2 ${
                appointment?.status === "completed"
                  ? "bg-success"
                  : appointment?.status === "cancel"
                  ? "bg-danger"
                  : "bg-warning text-dark"
              }`}
            >
              {appointment?.status || "Pending"}
            </span>
          </div>

          <hr />

          {/* User + Doctor Row */}
          <div className="row">

            {/* User */}
            <div className="col-md-6 mb-4">
              <div className="p-3 rounded-4 bg-light h-100">
                <h5 className="fw-semibold text-secondary mb-3">
                  👤 User Info
                </h5>

                <p className="mb-1">
                  <strong>Name:</strong>{" "}
                  {appointment?.userId?.name || "N/A"}
                </p>

                <p className="mb-1">
                  <strong>Phone no:</strong>{" "}
                  {appointment?.userId?.phone || "N/A"}
                </p>

                <p className="mb-1">
                  <strong>Email:</strong>{" "}
                  {appointment?.userId?.email || "N/A"}
                </p>
              </div>
            </div>

            {/* Doctor */}
            <div className="col-md-6 mb-4">
              <div className="p-3 rounded-4 bg-light h-100">
                <h5 className="fw-semibold text-secondary mb-3">
                  🩺 Doctor Info
                </h5>

                <p className="mb-1">
                  <strong>Name:</strong>{" "}
                  {appointment?.doctorId?.name || "N/A"}
                </p>

                  <p className="mb-1">
                  <strong>Phone:</strong>{" "}
                  {appointment?.doctorId?.phone || "N/A"}
                </p>
              
                <p className="mb-1">
                  <strong>Email:</strong>{" "}
                  {appointment?.doctorId?.email || "N/A"}
                </p>

                
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="p-3 rounded-4 bg-light mb-4">
            <h5 className="fw-semibold text-secondary mb-3">
              📅 Booking Info
            </h5>

            <div className="d-flex justify-content-between flex-wrap">
              <p>
                <strong>Date:</strong>{" "}
                {appointment?.slotDate || "N/A"}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {appointment?.slotTime || "N/A"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <button
              className="btn btn-primary px-4 rounded-pill"
              onClick={() => window.history.back()}
            >
              ⬅ Back
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
</Layout>
  );
};

export default AppointmentDetails;