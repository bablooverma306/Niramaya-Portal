import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import EditUserProfile from './EditUserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slice/authSlice'
import { getLoginUserDetails } from '../../redux/actions/authActions'
import { useTranslation } from 'react-i18next'

const UserProfile = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const { t, i18n } = useTranslation()

  // ✅ Load user
  useEffect(() => {
    const localData = localStorage.getItem("appData")

    if (localData) {
      const appData = JSON.parse(localData)
      const id = appData?.user?._id

      if (id) {
        dispatch(getLoginUserDetails(id))
      }
    }
  }, [dispatch])

  // ✅ Logout
  const handlelogout = () => {
    dispatch(logout())
    localStorage.removeItem("appData")
    toast.success(t("logoutSuccess"))
    navigate('/login')
  }

  // ✅ LANGUAGE SWITCH
  const changeLang = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("lang", lng)
  }

  return (
    <>
      {!user ? (
        <h3 className="text-center mt-5">{t("loading")}</h3>
      ) : (
        <>
          <div className="container mt-5">

            {/* 🔥 LANGUAGE SWITCH BUTTON */}
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => changeLang("en")}>
                EN
              </button>
              <button className="btn btn-sm btn-outline-success" onClick={() => changeLang("hi")}>
                हिंदी
              </button>
            </div>

            <div className="row">

              {/* TITLE */}
              <h4 className="text-center mb-4">
                {t("manageAccount")}
              </h4>

              {/* IMAGE */}
              <div className="col-md-3 text-center">
                <img 
                  src={
                    user?.Image 
                      ? `data:image/jpeg;base64,${user.Image}` 
                      : "/default-user.png"
                  }
                  alt="userpic" 
                  className="card p-2" 
                  width={250} 
                  height={400}
                />
              </div>

              {/* DETAILS */}
              <div className="col-md-8 mt-3">

                <div className="user-container mb-3">

                  <h6><b>{t("name")}:</b> {user?.name}</h6>
                  <h6><b>{t("dob")}:</b> {user?.dob || t("na")}</h6>
                <h6>
  <b>{t("gender")}:</b> {user?.gender ? t(user.gender) : "/NA"}
</h6>
                  <h6><b>{t("phone")}:</b> {user?.phone || t("na")}</h6>
                  <h6><b>{t("email")}:</b> {user?.email || t("na")}</h6>
                  <h6><b>{t("address")}:</b> {user?.address || t("na")}</h6>

                  <h5 className="mt-3">
                    <Link to={`/user/reset-password/${user?._id}`}>
                      {t("resetPassword")}
                    </Link>
                  </h5>

                </div>

                {/* BUTTONS */}
                <div className="button-container mt-4">

                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => navigate('/user/appointment')}
                  >
                    {t("appointment")}
                  </button>

                  <button
                    className="btn btn-warning ms-2"
                    onClick={() => setIsOpen(true)}
                  >
                    {t("editProfile")}
                  </button>

                  <button
                    className="btn btn-primary ms-2"
                    onClick={handlelogout}
                  >
                    {t("logout")}
                  </button>

                </div>

              </div>
            </div>
          </div>

          {/* EDIT MODAL */}
          {isOpen && (
            <EditUserProfile 
              isOpen={isOpen} 
              onclose={() => setIsOpen(false)} 
            />
          )}
        </>
      )}
    </>
  )
}

export default UserProfile