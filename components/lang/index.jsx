/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Ar from "../../assets/images/ar.svg";
import En from "../../assets/images/en.svg";
import localStorageProvider from "../../utils/localStorageProvider";

function Language() {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState("en");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.querySelector("html").dir = i18n.dir();
    document.querySelector("html").lang = lng;
    document.querySelector("#bootstrap-ltr").disabled = lng === "ar";
    document.querySelector("#bootstrap-rtl").disabled = lng === "en";
    localStorageProvider.set("locale", lng);
    if (lng === "en") {
      setCurrentLang("en");
    }
    if (lng === "ar") {
      setCurrentLang("ar");
    }
  };
  /// change languages
  useEffect(() => {
    if (localStorage.getItem("locale") === "ar") {
      setCurrentLang("ar");
    }
    if (localStorage.getItem("locale") === "en") {
      setCurrentLang("en");
    } else {
      setCurrentLang("ar");
    }
  }, []);
  return (
    <div className="language px-lg-2">
      {currentLang === "en" ? (
        <p className="nav-link m-0 " onClick={() => changeLanguage("ar")}>
          <img src={Ar} className="lang" alt="image" />
        </p>
      ) : (
        <p className="nav-link m-0 " onClick={() => changeLanguage("en")}>
          <img src={En} className="lang" alt="image" />
        </p>
      )}
    </div>
  );
}

export default Language;
