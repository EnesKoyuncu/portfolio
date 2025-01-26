import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../css/header.css";

interface Texts {
  home: string;
  cv: string;
  projects: string;
  about: string;
  blog: string;
  contact: string;
}

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
      <div className="header-links header-left">
        <a href="/">{texts?.home || "Home"}</a>
        <a href="/cv">{texts?.cv || "CV"}</a>
        <a href="/projects">{texts?.projects || "Projects"}</a>
      </div>

      <div className="header-logo">
        <img src="/img/file.jpeg" alt="nsk logo" />
      </div>

      <div className="header-links header-right">
        <a href="/about">{texts?.about || "About"}</a>
        <a href="/blog">{texts?.blog || "Blog"}</a>
        <a href="/contact">{texts?.contact || "Contact"}</a>
      </div>

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
