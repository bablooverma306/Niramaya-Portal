import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAppointments,
  cancelStatus,
  deleteUserAppointment,
} from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";   // ✅ ADD

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();   // ✅ ADD

  const { appointments = [], loading, error } = useSelector(
    (state) => state.auth
  );

  const authData = JSON.parse(localStorage.getItem("appData"));
  const userId = authData?.user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserAppointments(userId));
    }
  }, [dispatch, userId]);

  const handleCancel = (id) => {
    dispatch(cancelStatus(id))
      .unwrap()
      .then(() => {
        toast.success(t("appointmentCancelled"));   // ✅ FIX
        dispatch(getUserAppointments(userId));
      })
      .catch((err) => {
        toast.error(err?.message || t("cancelFailed"));
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteUserAppointment(id))
      .unwrap()
      .then(() => {
        toast.success(t("appointmentDeleted"));
        dispatch(getUserAppointments(userId));
      })
      .catch((err) => {
        toast.error(err?.message || t("deleteFailed"));
      });
  };

  return (
    <>
      <h1 className="text-center mb-4">{t("myAppointments")}</h1>

      {loading && <p>{t("loading")}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>{t("sno")}</th>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
            <th>{t("amount")}</th>
            <th>{t("status")}</th>
            <th>{t("action")}</th>
            <th>{t("details")}</th>
          </tr>
        </thead>

        <tbody>
          {appointments?.length > 0 ? (
            appointments.map((a, i) => (
              <tr key={a._id}>
                <td>{i + 1}</td>
                <td>{a.slotDate}</td>
                <td>{a.slotTime}</td>
                <td>{a.amount}</td>

                {/* ✅ STATUS TRANSLATE */}
                <td>{t(a.status)}</td>

                {/* ACTION */}
                <td>
                  <div className="d-flex gap-2">
                    {a?.status === "pending" ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(a?._id)}
                      >
                        {t("cancel")}
                      </button>
                    ) : null}

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(a?._id)}
                    >
                      {t("delete")}
                    </button>
                  </div>
                </td>

                {/* DETAILS */}
                <td>
                  <Link to={`/user/appointment/${a._id}`}>
                    {t("details")}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">{t("noAppointments")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default MyAppointments;
