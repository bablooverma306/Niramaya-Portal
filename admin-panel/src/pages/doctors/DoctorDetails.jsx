import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mt-4">

        <h2>Doctor Details</h2>

        {doctor && (
          <div className="card p-4 shadow">

            {doctor?.Image && (
              <img
                src={`data:image/jpeg;base64,${doctor?.Image}`}
                width="150"
              />
            )}

            <h3>{doctor.name}</h3>
            <p>Email: {doctor.email}</p>
            <p>Phone: {doctor.phone}</p>
            <p>Speciality: {doctor.speciality}</p>
            <p>Fees: ₹{doctor.fees}</p>
            <p>Experience: {doctor.experince}</p>
            <p>Address: {doctor.address}</p>

          </div>
        )}

      </div>
    </Layout>
  );
};

export default DoctorDetails;