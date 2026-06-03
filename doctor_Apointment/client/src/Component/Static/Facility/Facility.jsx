import React from 'react'
import "./Facility.css"
import FacilityData from "./FacilityData.json"
import { useTranslation } from 'react-i18next'   // ✅ ADD

const Facility = () => {

  const { t } = useTranslation()   // ✅ ADD

  return (
    <>
      {/* TITLE */}
      <h3 className="facility-title">
        {t("medicalFacilities")}
      </h3>

      <div className="facility-container">

        {FacilityData.map((item, index) => (
          <div className="facility-card" key={index}>

            <div className="icon-box">
              <i className={item.icon}></i>
            </div>

            <h5 className="card-title">
              {t(item.titleKey)}
            </h5>

          </div>
        ))}

      </div>
    </>
  )
}

export default Facility