import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { sendWebMessage } from '../../../redux/actions/authActions.js'
import { clearMessageState } from '../../../redux/slice/authSlice.js'
import { useTranslation } from 'react-i18next'   // ✅ ADD

const MessageForm = () => {

  const { t } = useTranslation()   // ✅ ADD

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [contact, setContact] = useState("")

  const dispatch = useDispatch()
  const { success, error, loading } = useSelector(state => state.auth)

  useEffect(() => {
    if (success) {
      toast.success(t("messageSuccess"))
      setName("")
      setContact("")
      setMessage("")
      dispatch(clearMessageState())
    }

    if (error) {
      toast.error(error)
      dispatch(clearMessageState())
    }
  }, [success, error, dispatch, t])

  const handleMessage = () => {
    if (!name || !contact || !message) {
      return toast.error(t("messageError"))
    }

    const msgData = { name, contact, message }
    dispatch(sendWebMessage(msgData))
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">

              {/* TITLE */}
              <h3 className="text-center text-primary mb-2">
                {t("contactUs")}
              </h3>

              {/* SUBTITLE */}
              <p className="text-center text-muted mb-4">
                {t("contactSubtitle")}
              </p>

              {/* NAME */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("enterName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder={t("enterEmail")}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              {/* MESSAGE */}
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder={t("enterMessage")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {/* BUTTON */}
              <div className="d-grid">
                <button
                  className="btn btn-primary rounded-3"
                  onClick={handleMessage}
                  disabled={loading}
                >
                  {loading ? t("sending") : t("sendMessage")}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MessageForm