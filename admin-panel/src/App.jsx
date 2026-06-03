import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import { Toaster } from "react-hot-toast";
import Alluser from "./pages/user/Alluser";
import AllDoctors from "./pages/doctors/AllDoctors";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import Home from "./pages/Home";
import AllAppointment from "./pages/appointments/AllAppointment";
import UserDetails from "./pages/user/UserDetails";
import AddDoctor from "./pages/doctors/AddDoctor";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-users" element={<Alluser />} />
        <Route path="/get-user/:id" element={<UserDetails />} />

        {/* ✅ FIXED ROUTE */}
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/doctor-details/:id" element={<DoctorDetails />} />

        <Route path="/all-appointment" element={<AllAppointment />} />
        <Route
          path="/appointment-details/:id"
          element={<AppointmentDetails />}
        />

        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </>
  );
}

export default App;