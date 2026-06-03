import React from 'react'
import "./ContactMassage.css"
import LocationMap from "./LocationMap"
import MassageForm from './MassageForm'
import { useTranslation } from 'react-i18next'   // ✅ ADD

const ContactMassage = () => {

  const { t } = useTranslation()   // ✅ ADD

  return (
    <>
      {/* PAGE TITLE (optional but good for i18n) */}
      <h3 className="text-center mt-4">
        {t("contactUs")}
      </h3>

      <p className="text-center text-muted">
        {t("contactSubtitle")}
      </p>

      <div className="row massage-container">

        {/* MAP */}
        <div className="col-md-4">
          <LocationMap />
        </div>

        {/* FORM */}
        <div className="col-md-6">
          <MassageForm />
        </div>

      </div>
    </>
  )
}

export default ContactMassage