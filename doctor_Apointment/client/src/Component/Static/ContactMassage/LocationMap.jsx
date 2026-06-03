import React from 'react'
import { useTranslation } from 'react-i18next'   // ✅ ADD

const LocationMap = () => {

  const { t } = useTranslation()   // ✅ ADD

  return (
    <>
      <div className="lacotionmap">

        {/* SECTION TITLE (optional but good UX) */}
        <h5 className="mb-2 text-center">
          {t("ourLocation")}
        </h5>

        <iframe
          title={t("hospitalLocation")}   // ✅ ACCESSIBILITY
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14714.844827378496!2d86.14464829999999!3d22.77609635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1771483942628!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>
    </>
  )
}

export default LocationMap