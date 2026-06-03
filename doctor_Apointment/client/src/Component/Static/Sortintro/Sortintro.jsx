import React from 'react'
import "./Sortintro.css"
import imghospital from "../../../assets/images/hospital/hospital.jpg"
import { useTranslation } from 'react-i18next'   // ✅ ADD

const Sortintro = () => {

  const { t } = useTranslation()   // ✅ ADD

  return (
    <div className="sortintro">
      <div className="row align-items-center">

        {/* IMAGE */}
        <div className="col-md-6 img-container">
          <img src={imghospital} alt="hospital" className="hospital-img" />
        </div>

        {/* INFO */}
        <div className="col-md-6 info-container">

          <h2 className="title">
            {t("hospitalName")}
          </h2>

          <br />

          <h5 className="subtitle">
            {t("hospitalTagline")}
          </h5>

          <p>
            {t("hospitalDesc1")}
          </p>

          <p>
            {t("hospitalDesc2")}
          </p>

        </div>

      </div>
    </div>
  )
}

export default Sortintro