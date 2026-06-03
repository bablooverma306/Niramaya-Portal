import React, { useEffect, useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next"; // ✅ ADD

const Register = () => {

  const { t } = useTranslation(); // ✅ ADD

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!name || !email || !password) {
      toast.error(t("fillAllFields"));
      return;
    }

    try {
      const resultAction = await dispatch(
        register({ name, email, password })
      );

      if (register.fulfilled.match(resultAction)) {
        toast.success(t("registerSuccess"));
        navigate("/login");
        dispatch(reset());
      }

      if (register.rejected.match(resultAction)) {
        toast.error(resultAction.payload || t("registerFailed"));
      }

    } catch (error) {
      toast.error(t("somethingWrong"));
    }
  };

  useEffect(() => {
    if (success === true) {
      toast.success(t("registerSuccess"));

      setTimeout(() => {
        navigate("/login");
        dispatch(reset());
      }, 1000);
    }

    if (error) {
      toast.error(error || t("registerFailed"));
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate, t]);

  return (
    <div className="form-container">

      {/* TITLE */}
      <h1>{t("createAccount")}</h1>

      {/* NAME */}
      <input
        placeholder={t("enterName")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* EMAIL */}
      <input
        placeholder={t("enterEmail")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder={t("enterPassword")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* BUTTON */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? t("registering") : t("register")}
      </button>

      <NavLink to="/login">
        {t("login")}
      </NavLink>

    </div>
  );
};

export default Register;