import React from 'react'
import "./WhyChose.css"
import whyIcon1 from "../../../assets/images/hospital/pessonalize.jpg";
import whyIcon2 from "../../../assets/images/hospital/trust.jpg";
import whyIcon3 from "../../../assets/images/hospital/relaible.jpg";
import whyIcon4 from "../../../assets/images/hospital/empower.jpg";
import whyIcon5 from "../../../assets/images/hospital/hospital1.jpg";

import { useTranslation } from 'react-i18next'   // ✅ ADD

const WhyChose = () => {

  const { t } = useTranslation()   // ✅ ADD

  return (
    <>
      <h1 className="why-choose-us">
        {t("whyChooseUs")}
      </h1>

      <div className="row Why-container">

        {/* CARD 1 */}
        <div className="col-md-2 cl">
          <img src={whyIcon1} alt="icon" className="why-icon1"/>
          <h2>{t("expertDoctors")}</h2>
          <p>{t("expertDoctorsDesc")}</p>
        </div>

        {/* CARD 2 */}
        <div className="col-md-2 cl2">
          <img src={whyIcon2} alt="icon" className="why-icon2"/>
          <h2>{t("personalizedCare")}</h2>
          <p>{t("personalizedCareDesc")}</p>
        </div>

        {/* CARD 3 */}
        <div className="col-md-2 cl">
          <img src={whyIcon3} alt="icon" className="why-icon3"/>
          <h2>{t("patientSatisfaction")}</h2>
          <p>{t("patientSatisfactionDesc")}</p>
        </div>

        {/* CARD 4 */}
        <div className="col-md-2 cl">
          <img src={whyIcon4} alt="icon" className="why-icon4"/>
          <h2>{t("allServices")}</h2>
          <p>{t("allServicesDesc")}</p>
        </div>

        {/* CARD 5 */}
        <div className="col-md-2 cl">
          <img src={whyIcon5} alt="icon" className="why-icon5"/>
          <h2>{t("safeEnvironment")}</h2>
          <p>{t("safeEnvironmentDesc")}</p>
        </div>

      </div>
    </>
  )
}

export default WhyChose