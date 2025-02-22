import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../css/header.scss";
import { motion } from "framer-motion";

import NSKLogo from "../assets/img/file.webp";
import { useTheme } from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import LoadingSpin from "./miniComponents/LoadingSpin";
import ErrorComponent from "./miniComponents/ErrorComponent";

interface Texts {
  home: string;
  cv: string;
  projects: string;
  about: string;
  blog: string;
  contact: string;
}

const leftButtonVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const rightButtonVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

export default function Header() {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchTexts = async (language: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/texts/header/${language}`
      );
      const data = await response.json();
      console.log("API Response: ", data);
      if (data.success) {
        return data.translations || {};
      } else {
        console.error("Veri bulunamadı:", data.message);
        return {};
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
      return {};
    }
  };

  const {
    data: texts,
    isLoading,
    error,
  } = useQuery<Texts>({
    queryKey: ["headerTexts", currentLanguage],
    queryFn: () => fetchTexts(currentLanguage),
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dil değiştirirken mevcut sayfa korunacak
  const changeLanguage = (newLang: string) => {
    if (currentLanguage === newLang) return; // Zaten aynı dildeyse yönlendirme yapma.

    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${currentLanguage}`, `/${newLang}`);
    navigate(newPath, { replace: true });
    setCurrentLanguage(newLang);
  };

  if (isLoading) {
    return <LoadingSpin mainContainerName="header-main" />;
  }

  if (error) {
    <ErrorComponent
      errorMessage={error.message}
      onRetry={() => window.location.reload()}
    />;
  }

  return (
    <div className={`header-main-${theme}`}>
      <motion.div
        className="header-links header-left"
        variants={leftButtonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Link to={`/${currentLanguage}/`} title={texts?.home || "Home"}>
          {texts?.home || "Home"}
        </Link>
        <Link to={`/${currentLanguage}/cv`} title={texts?.cv || "CV"}>
          {texts?.cv || "CV"}
        </Link>
        <Link
          to={`/${currentLanguage}/projects`}
          title={texts?.projects || "Projects"}
        >
          {texts?.projects || "Projects"}
        </Link>
      </motion.div>

      <motion.div
        className="header-logo"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={NSKLogo}
          alt="nsk logo"
          title="NSK Şirket Logosu - Enes Ertuğrul Koyuncu"
        />
      </motion.div>

      <motion.div
        className="header-links header-right"
        variants={rightButtonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Link to={`/${currentLanguage}/about`} title={texts?.about || "About"}>
          {texts?.about || "About"}
        </Link>
        <Link to={`/${currentLanguage}/blog`} title={texts?.blog || "Blog"}>
          {texts?.blog || "Blog"}
        </Link>
        <Link
          to={`/${currentLanguage}/contact`}
          title={texts?.contact || "Contact"}
        >
          {texts?.contact || "Contact"}
        </Link>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon
            icon={theme === "light" ? faMoon : faSun}
            style={theme === "dark" ? { color: "white" } : undefined}
          />
        </button>
      </motion.div>

      <button className="mobile-menu-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <Link to={`/${currentLanguage}/`} onClick={toggleMenu}>
          {texts?.home || "Home"}
        </Link>
        <Link to={`/${currentLanguage}/cv`} onClick={toggleMenu}>
          {texts?.cv || "CV"}
        </Link>
        <Link to={`/${currentLanguage}/projects`} onClick={toggleMenu}>
          {texts?.projects || "Projects"}
        </Link>
        <Link to={`/${currentLanguage}/about`} onClick={toggleMenu}>
          {texts?.about || "About"}
        </Link>
        <Link to={`/${currentLanguage}/blog`} onClick={toggleMenu}>
          {texts?.blog || "Blog"}
        </Link>
        <Link to={`/${currentLanguage}/contact`} onClick={toggleMenu}>
          {texts?.contact || "Contact"}
        </Link>

        <div className="mobile-menu-bottom">
          <div className="mobile-theme-toggle">
            <button
              className="theme-toggle"
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
          <div className="mobile-language-switcher">
            {["en", "tr", "de"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  toggleMenu();
                }}
                className={currentLanguage === lang ? "active" : ""}
                aria-label={`Switch to ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="language-switcher">
        {["en", "tr", "de"].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={currentLanguage === lang ? "active" : ""}
            aria-label={`Switch to ${lang.toUpperCase()}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
