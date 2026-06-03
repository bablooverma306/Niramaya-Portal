import React, { useEffect, useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next"; // ✅ ADD

const Login = () => {

  const { t } = useTranslation(); // ✅ ADD

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error(t("loginError"));
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("loginSuccess"));
      navigate("/Docter");
      setEmail("");
      setPassword("");
      dispatch(reset());
    }

    if (error) {
      toast.error(error || t("loginFailed"));
      dispatch(reset());
    }
  }, [dispatch, error, success, navigate, t]);

  return (
    <div className="form-container">

      {/* TITLE */}
      <h1>{t("login")}</h1>

      {/* SUBTITLE */}
      <p>{t("loginSubtitle")}</p>

      <form onSubmit={handleSubmit}>

        {/* EMAIL */}
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder={t("enterEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder={t("enterPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!email || !password}
        >
          {t("loginBtn")}
        </button>

      </form>

      {/* REGISTER LINK */}
      <p>
        {t("notUser")} <NavLink to="/register">{t("register")}</NavLink>
      </p>

    </div>
  );
};

export default Login;
