import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import "../css/header.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import NSKLogo from "../assets/img/file.webp";
import { useTheme } from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
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

interface ILinkNames {
  home: string;
  cv: string;
  projects: string;
  about: string;
  blog: string;
  contact: string;
}

interface ILinksTitleForLanguageChange {
  tr: ILinkNames;
  en: ILinkNames;
  de: ILinkNames;
}

const LinksTitleForLanguageChange: ILinksTitleForLanguageChange = {
  tr: {
    home: "Anasayfa Sayfam",
    cv: "CV Sayfam",
    projects: "Projeler Sayfam",
    about: "Hakkımda Sayfam",
    blog: "Blog Sayfam",
    contact: "İletişim Sayfam",
  },
  en: {
    home: "Home Page",
    cv: "CV Page",
    projects: "Projects Page",
    about: "About Page",
    blog: "Blog Page",
    contact: "Contact Page",
  },
  de: {
    home: "Startseite Seite",
    cv: "Lebenslauf Seite",
    projects: "Projekte Seite",
    about: "Über mich Seite",
    blog: "Blog Seite",
    contact: "Kontakt Seite",
  },
};

export default function Header() {
  const [texts, setTexts] = useState<Texts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchTexts = async (language: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/texts/header/${language}`
      );
      const data = await response.json();
      if (data.success) {
        setTexts(data.translations);
      } else {
        console.error("Veri bulunamadı:", data.message);
        setTexts(null);
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
      setTexts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts(currentLanguage);
  }, [currentLanguage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
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
        <Link
          to="/"
          title={
            LinksTitleForLanguageChange[
              currentLanguage as keyof ILinksTitleForLanguageChange
            ].home
          }
        >
          {texts?.home || "Home"}
        </Link>
        <Link
          to="/cv"
          title={
            LinksTitleForLanguageChange[
              currentLanguage as keyof ILinksTitleForLanguageChange
            ].cv
          }
        >
          {texts?.cv || "CV"}
        </Link>
        <Link
          to="/projects"
          title={
            LinksTitleForLanguageChange[
              currentLanguage as keyof ILinksTitleForLanguageChange
            ].projects
          }
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
        <Link
          to="/about"
          title={
            LinksTitleForLanguageChange[
              currentLanguage as keyof ILinksTitleForLanguageChange
            ].about
          }
        >
          {texts?.about || "About"}
        </Link>
        <Link
          to="/blog"
          title={
            LinksTitleForLanguageChange[
              currentLanguage as keyof ILinksTitleForLanguageChange
            ].blog
          }
        >
          {texts?.blog || "Blog"}
        </Link>
        <Link
          to="/contact"
          title={
            LinksTitleForLanguageChange[
              currentLanguage as keyof ILinksTitleForLanguageChange
            ].contact
          }
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
        <Link to="/" onClick={toggleMenu}>
          {texts?.home || "Home"}
        </Link>
        <Link to="/cv" onClick={toggleMenu}>
          {texts?.cv || "CV"}
        </Link>
        <Link to="/projects" onClick={toggleMenu}>
          {texts?.projects || "Projects"}
        </Link>
        <Link to="/about" onClick={toggleMenu}>
          {texts?.about || "About"}
        </Link>
        <Link to="/blog" onClick={toggleMenu}>
          {texts?.blog || "Blog"}
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          {texts?.contact || "Contact"}
        </Link>
        <div className="mobile-menu-bottom">
          <div className="mobile-theme-toggle">
            <button
              className="theme-toggle"
              onClick={(e) => {
                toggleTheme(e);
                toggleMenu();
              }}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
          <div className="mobile-language-switcher">
            <button
              onClick={() => {
                setCurrentLanguage("en");
                toggleMenu();
              }}
              className={currentLanguage === "en" ? "active" : ""}
              aria-label="Click to switch to English language."
            >
              EN
            </button>
            <button
              onClick={() => {
                setCurrentLanguage("tr");
                toggleMenu();
              }}
              className={currentLanguage === "tr" ? "active" : ""}
              aria-label="Türkçe diline geçmek için tıklayın."
            >
              TR
            </button>
            <button
              onClick={() => {
                setCurrentLanguage("de");
                toggleMenu();
              }}
              className={currentLanguage === "de" ? "active" : ""}
              aria-label="Klicken Sie hier, um zur deutschen Sprache zu wechseln."
            >
              DE
            </button>
          </div>
        </div>
      </div>

      <div className="language-switcher">
        <button
          onClick={() => setCurrentLanguage("en")}
          className={currentLanguage === "en" ? "active" : ""}
          aria-label="Click to switch to English language."
        >
          EN
        </button>
        <button
          onClick={() => setCurrentLanguage("tr")}
          className={currentLanguage === "tr" ? "active" : ""}
          aria-label="Türkçe diline geçmek için tıklayın."
        >
          TR
        </button>
        <button
          onClick={() => setCurrentLanguage("de")}
          className={currentLanguage === "de" ? "active" : ""}
          aria-label="Klicken Sie hier, um zur deutschen Sprache zu wechseln."
        >
          DE
        </button>
      </div>
    </div>
  );
}
