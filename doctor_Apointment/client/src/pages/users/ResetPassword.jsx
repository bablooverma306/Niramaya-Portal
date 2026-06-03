import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/actions/authActions";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next"; // ✅ ADD

const ResetPassword = () => {

  const { t } = useTranslation(); // ✅ ADD

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const handleResetPassword = async () => {

    if (!oldPassword || !newPassword) {
      return toast.error(t("passwordError"));
    }

    try {
      const res = await dispatch(
        resetPassword({ id, oldPassword, newPassword })
      );

      if (res.payload?.success) {
        toast.success(t("passwordSuccess"));

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {
        toast.error(res.payload || t("somethingWrong"));
      }

    } catch (err) {
      toast.error(t("somethingWrong"));
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >

      {/* TITLE */}
      <h2 className="mb-4">
        {t("resetPassword")}
      </h2>

      <div className="d-flex flex-column gap-3" style={{ width: "300px" }}>

        {/* OLD PASSWORD */}
        <input
          type="password"
          placeholder={t("enterOldPassword")}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="form-control"
        />

        {/* NEW PASSWORD */}
        <input
          type="password"
          placeholder={t("enterNewPassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control"
        />

        {/* BUTTON */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? t("updating") : t("resetBtn")}
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;