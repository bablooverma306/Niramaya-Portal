import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../../redux/actions/appointmentAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appointmentState = useSelector((state) => state.appointment);
  const appointments = appointmentState?.appointments || [];

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  const handleComplete = async (id) => {
    await dispatch(updateAppointmentStatus({ id, status: "completed" }));
    toast.success("Marked as completed");
  };

  const handleCancel = async (id) => {
    await dispatch(cancelAppointment(id));
    toast.success("Appointment Cancelled");
  };

  return (
    <Layout>
      <h2>All Appointments</h2>

      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments?.map((a) => (
            <tr key={a._id}>
         <td>{a.userId?._id || a.userId}</td>
<td>{a.doctorId?._id || a.doctorId}</td>
              <td>{a.slotDate}</td>
              <td>{a.slotTime}</td>

              <td>
                <span
                  style={{
                    color:
                      a.status === "completed"
                        ? "green"
                        : a.status === "cancel"
                        ? "red"
                        : "orange",
                  }}
                >
                  {a.status}
                </span>
              </td>

              <td className="d-flex gap-2">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() =>
                    navigate(`/appointment-details/${a._id}`)
                  }
                >
                  View
                </button>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleComplete(a._id)}
                >
                  Complete
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancel(a._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AllAppointment;