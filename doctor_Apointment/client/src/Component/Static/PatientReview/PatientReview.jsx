import React from 'react'
import "./PatientReview.css"
import reviewData from "./PatientReview.json"
import { useTranslation } from 'react-i18next'   // ✅ ADD

const PatientReview = () => {

  const { t } = useTranslation()   // ✅ ADD

  return (
    <>
      <div className='patient-review'>

        <div className='heading_container' >

          {/* TITLE */}
          <h1>{t("patientTitle")}</h1>

          {/* SUBTITLE */}
          <p>{t("patientSubtitle")}</p>

          <div className="row why-container">

            {reviewData.map(d => (
              <div className="col-md-3 review-card" key={d.id}>

                <img src={d.pic} alt="user" />

                <p>
                  <strong>{d.name}</strong> <br/>
                  {t("address")}: {d.addres}
                </p>

                <div className="d-flex flex-row">

                  <h6 className="icon">

                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>

                  </h6>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </>
  )
}

export default PatientReview