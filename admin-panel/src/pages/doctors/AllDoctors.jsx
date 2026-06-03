import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDoctors,
  deleteDoctor,
  updateDoctorStatus,
} from "../../redux/actions/doctorActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctors } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this doctor?")) {
      await dispatch(deleteDoctor(id));
      toast.success("Doctor Deleted");
    }
  };

  const handleToggle = async (doc) => {
  try {
    const res = await dispatch(
      updateDoctorStatus({
        id: doc._id,
        available: !doc.available,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Status Updated ✅");

      // 🔥 refresh list
      dispatch(getAllDoctors());
    } else {
      toast.error("Failed to update ❌");
    }

  } catch (error) {
    console.log(error);
    toast.error("Error occurred ❌");
  }
};

  return (
    <Layout>
      <div className="d-flex justify-content-between mb-3">
        <h2>All Doctors</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-doctor")}
        >
          + Add Doctor
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Image</th>
            <th>Name</th>
            <th>Fees</th>
            <th>Speciality</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors?.map((doc, i) => (
            <tr key={doc._id}>
              <td>{i + 1}</td>

              {/* IMAGE (YOUR LOGIC) */}
              <td>
                {doc.Image ? (
                  <img
                    src={`data:image/jpeg;base64,${doc.Image}`}
                    width="50"
                  />
                ) : (
                  "No Image"
                )}
              </td>

              <td>{doc.name}</td>
              <td>₹{doc.fees}</td>
              <td>{doc.speciality}</td>

              <td style={{ color: doc.available ? "green" : "red" }}>
                {doc.available ? "Yes" : "No"}
              </td>

              <td className="d-flex gap-2">

                {/* VIEW */}
                <button
                  className="btn btn-info btn-sm"
                  onClick={() =>
                    navigate(`/doctor-details/${doc._id}`)
                  }
                >
                  View
                </button>

                {/* EDIT */}
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() =>
                    navigate(`/add-doctor?id=${doc._id}`)
                  }
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(doc._id)}
                >
                  Delete
                </button>

                {/* AVAILABLE */}
         <button
  className={`btn btn-sm ${
    doc.available ? "btn-danger" : "btn-success"
  }`}
  onClick={() => handleToggle(doc)}
>
  {doc.available ? "Disable" : "Enable"}
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AllDoctors;