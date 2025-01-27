import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../css/header.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  const [texts, setTexts] = useState<Texts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const fetchTexts = async (language: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/texts/header/${language}`
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header-main">
      <motion.div
        className="header-links header-left"
        variants={leftButtonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Link to="/">{texts?.home || "Home"}</Link>
        <Link to="/cv">{texts?.cv || "CV"}</Link>
        <Link to="/projects">{texts?.projects || "Projects"}</Link>
      </motion.div>

      <motion.div
        className="header-logo"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/img/file.jpeg" alt="nsk logo" />
      </motion.div>

      <motion.div
        className="header-links header-right"
        variants={rightButtonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Link to="/about">{texts?.about || "About"}</Link>
        <Link to="/blog">{texts?.blog || "Blog"}</Link>
        <Link to="/contact">{texts?.contact || "Contact"}</Link>
      </motion.div>

      <div className="language-switcher">
        <button
          onClick={() => setCurrentLanguage("en")}
          className={currentLanguage === "en" ? "active" : ""}
        >
          EN
        </button>
        <button
          onClick={() => setCurrentLanguage("tr")}
          className={currentLanguage === "tr" ? "active" : ""}
        >
          TR
        </button>
        <button
          onClick={() => setCurrentLanguage("de")}
          className={currentLanguage === "de" ? "active" : ""}
        >
          DE
        </button>
      </div>
    </div>
  );
}
