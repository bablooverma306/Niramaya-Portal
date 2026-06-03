import React from 'react'
import { useTranslation } from 'react-i18next'

const Topbar = () => {

  const { t, i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  return (
    <div className="topbr-container">

      <h6>
        <i className="fa-solid fa-phone-volume"></i>
        {t("emergency")} : 12341
      </h6>

      <h6>
        <i className="fa-solid fa-clock"></i>
        {t("time")} : 10:00 AM - 10:00 PM
      </h6>

      <h6>
        <i className="fa-solid fa-envelope"></i>
        {t("email")} : teckinfo@gmail.com
      </h6>

      <h6>
        <i className="fa-solid fa-language"></i>
        {t("language")} :
        <select 
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </h6>

    </div>
  )
}

export default Topbar