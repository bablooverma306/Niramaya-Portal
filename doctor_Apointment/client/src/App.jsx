import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./Component/Layout/Navbar/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallary from "./pages/Gallary/Gallary.jsx";

import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login.jsx";

import AllDoctor from "./pages/Doctor/AllDoctor.jsx";
import Appointment from "./pages/Doctor/Appointment.jsx";

import UserProfile from "./pages/users/userProfile.jsx";
import MyAppointment from "./pages/users/MyAppointment.jsx";
import AppointmentDetails from "./pages/users/AppointmentDetails.jsx";
import ResetPassword from "./pages/users/ResetPassword.jsx";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginUserDetails } from "./redux/actions/authActions.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("appData");

    if (localData) {
      const appData = JSON.parse(localData);
      const id = appData?.user?._id;

      if (id) {
        dispatch(getLoginUserDetails(id));
      }
    }
  }, [dispatch]);

  return (
    <>
      {/* ✅ Toast UI */}
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallary" element={<Gallary />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/Docter" element={<AllDoctor />} />
        <Route path="/Doctors/:id" element={<Appointment />} />

        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/appointment" element={<MyAppointment />} />
        <Route path="/user/appointment/:id" element={<AppointmentDetails />} />

        {/* ✅ Reset Password */}
        <Route
          path="/user/reset-password/:id"
          element={<ResetPassword />}
        />
      </Routes>
    </>
  );
}

export default App;
