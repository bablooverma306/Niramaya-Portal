import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getLoginUserDetails } from '../../../redux/actions/authActions'; // ✅ FIX
import { useTranslation } from 'react-i18next'

const NavMenu = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.auth);

  // ✅ FIXED USER LOAD
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appData"));
    if (data?.user?._id) {
      dispatch(getLoginUserDetails(data.user._id));
    }
  }, [dispatch]);

  const handleClick = () => {
    navigate("/Docter");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">{t("home")}</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/Gallary">{t("gallery")}</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/Contact">{t("contact")}</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/Docter">{t("doctor")}</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/About">{t("about")}</NavLink>
            </li>

          </ul>

          <button className="btn btn-outline-success" onClick={handleClick}>
            {t("bookAppointment")}
          </button>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/user/profile">
                  {t("myAccount")}
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  {t("login")}
                </NavLink>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default NavMenu;
