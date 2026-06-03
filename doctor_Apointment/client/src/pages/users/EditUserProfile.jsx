import React, { useEffect, useState } from 'react'
import './User.css'
import { useDispatch, useSelector } from "react-redux"
import { getLoginUserDetails, updateUserData } from '../../redux/actions/authActions'
import toast from 'react-hot-toast'
import { reset } from '../../redux/slice/authSlice'
import { useTranslation } from 'react-i18next'

const EditUserProfile = ({ isOpen, onclose }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [name, setName] = useState("")
  const [gender, setGender] = useState("male")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [image, setImage] = useState("")

  const { user, loading } = useSelector(state => state.auth)

  // ✅ load user data
  useEffect(() => {
    if (user) {
      setName(user?.name || "")
      setAddress(user?.address || "")
      setPhone(user?.phone || "")
      setGender(user?.gender || "male")
      setImage(user?.Image || "")
      setDob(user?.dob || "")
    }
  }, [user])

  // ✅ UPDATE FUNCTION
  const handleUpdate = async (id) => {

    if (!id) return toast.error("User ID missing")

    const formData = new FormData()

    if (name) formData.append("name", name)
    if (gender) formData.append("gender", gender)
    if (phone) formData.append("phone", phone)
    if (address) formData.append("address", address)
    if (dob) formData.append("dob", dob)

    if (image instanceof File) {
      formData.append("Image", image)
    }

    try {
      const res = await dispatch(updateUserData({ id, formData }))
formData.append("gender", gender)
      if (res?.payload?.success) {
        toast.success(t("profileUpdated"))

        // 🔥 refresh latest user from backend
        dispatch(getLoginUserDetails(id))

        dispatch(reset())
        onclose()
      } else {
        toast.error(res?.payload?.message || t("updateFailed"))
      }

    } catch (error) {
      toast.error(t("somethingWrong"))
    }
  }

  if (!isOpen) return null

  return (
    <div className="editModel modal d-block">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("editProfile")}</h5>
            <button className="btn-close" onClick={onclose} />
          </div>

          {/* BODY */}
          <div className="modal-body d-flex flex-column gap-3">

            {/* IMAGE */}
            <div className="text-center">
              <img
                src={
                  user?.Image
                    ? `data:image/jpeg;base64,${user.Image}`
                    : "https://via.placeholder.com/100"
                }
                height={100}
                width={120}
                alt="user"
                className="mb-2"
              />

              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* NAME */}
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name")}
            />

            {/* GENDER */}
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">{t("male")}</option>
              <option value="female">{t("female")}</option>
            </select>

            {/* ADDRESS */}
            <input
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("address")}
            />

            {/* DOB */}
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            {/* PHONE */}
            <input
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phone")}
            />

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onclose}>
              {t("close")}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(user?._id)}
              disabled={loading}
            >
              {loading ? t("saving") : t("saveChanges")}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditUserProfile