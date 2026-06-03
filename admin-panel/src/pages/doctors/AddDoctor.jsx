import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { addDoctor, updateDoctor } from "../../redux/actions/doctorActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../Api/Api";
import toast from "react-hot-toast";

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const doctorId = params.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    experince: "",
    fees: "",
    address: "",
    degree: "",
    about: "",
    dob: "",
    gender: "",
  });

  const [image, setImage] = useState(null);

  // EDIT MODE
  useEffect(() => {
    if (doctorId) {
      API.get(`/doctor/get-details/${doctorId}`).then((res) => {
        setForm(res.data.doctor);
      });
    }
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("Image", image);
    }

    try {
      if (doctorId) {
        await dispatch(updateDoctor({ id: doctorId, formData }));
       //hello ji siko yaad rakho new addd kiya hai 
        toast.success("Doctor Updated");
      } else {
        await dispatch(addDoctor(formData));
        toast.success("Doctor Added");
      }

      navigate("/all-doctors");
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <Layout>
      <h2>{doctorId ? "Edit Doctor" : "Add Doctor"}</h2>

      <form onSubmit={handleSubmit}>

        <input placeholder="Name" className="form-control mb-2"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

        <input placeholder="Email" className="form-control mb-2"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input placeholder="Phone" className="form-control mb-2"
          value={form.phone}
          onChange={(e)=>setForm({...form,phone:e.target.value})}/>

        <input placeholder="Fees" className="form-control mb-2"
          value={form.fees}
          onChange={(e)=>setForm({...form,fees:e.target.value})}/>

        <input placeholder="Experience" className="form-control mb-2"
          value={form.experince}
          onChange={(e)=>setForm({...form,experince:e.target.value})}/>

        <input placeholder="Degree" className="form-control mb-2"
          value={form.degree}
          onChange={(e)=>setForm({...form,degree:e.target.value})}/>

        <input placeholder="Address" className="form-control mb-2"
          value={form.address}
          onChange={(e)=>setForm({...form,address:e.target.value})}/>

        <input type="date" className="form-control mb-2"
          value={form.dob}
          onChange={(e)=>setForm({...form,dob:e.target.value})}/>

        <select className="form-control mb-2"
          value={form.gender}
          onChange={(e)=>setForm({...form,gender:e.target.value})}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input placeholder="Speciality" className="form-control mb-2"
          value={form.speciality}
          onChange={(e)=>setForm({...form,speciality:e.target.value})}/>

        <textarea placeholder="About" className="form-control mb-2"
          value={form.about}
          onChange={(e)=>setForm({...form,about:e.target.value})}/>

        <input type="file" className="form-control mb-2"
          onChange={(e)=>setImage(e.target.files[0])}/>

        <button className="btn btn-success">
          {doctorId ? "Update" : "Add Doctor"}
        </button>

      </form>
    </Layout>
  );
};

export default AddDoctor;