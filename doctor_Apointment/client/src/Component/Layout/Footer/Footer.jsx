import React from "react";
import { useTranslation } from "react-i18next";   // ✅ ADD

const Footer = () => {

  const { t } = useTranslation();   // ✅ ADD

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">

        <div className="row text-center text-md-start">

          {/* ABOUT */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3 border-start border-info ps-2">
              {t("aboutUs")}
            </h5>
            <p>
              {t("footerAboutText")}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3 border-start border-info ps-2">
              {t("quickLinks")}
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">{t("home")}</li>
              <li className="mb-2">{t("aboutUs")}</li>
              <li className="mb-2">{t("services")}</li>
              <li className="mb-2">{t("doctor")}</li>
              <li className="mb-2">{t("appointment")}</li>
              <li className="mb-2">{t("contact")}</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3 border-start border-info ps-2">
              {t("ourServices")}
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">{t("emergencyCare")}</li>
              <li className="mb-2">{t("checkup")}</li>
              <li className="mb-2">{t("diagnostics")}</li>
              <li className="mb-2">{t("icuCare")}</li>
              <li className="mb-2">{t("radiology")}</li>
              <li className="mb-2">{t("pharmacy")}</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3 border-start border-info ps-2">
              {t("contactInfo")}
            </h5>
            <p>{t("addressFooter")}</p>
            <p>{t("phoneFooter")}</p>
            <p>{t("emailFooter")}</p>
            <p>{t("open247")}</p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="text-center pt-3 border-top border-secondary">
          <p className="mb-0">
            {t("copyright")}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;