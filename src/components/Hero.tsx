import myImage from "../img/pp2kARE.jpg";
import "../css/hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

import { faFile } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext"; // Dil context'i

interface Texts {
  cardLocation: string;
  cardGraduate: string;
  cardJob: string;
  cardFocus: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  projectsButton: string;
}

export default function Hero() {
  const [texts, setTexts] = useState<Texts>({
    cardLocation: "",
    cardGraduate: "",
    cardJob: "",
    cardFocus: "",
    welcomeTitle: "",
    welcomeSubtitle: "",
    projectsButton: "",
  });

  const { currentLanguage } = useLanguage(); // Şu anki dil değerini al

  const fetchTexts = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/texts/hero/${language}`
      );
      const data = await response.json();
      if (data.success) {
        setTexts(data.translations); // Gelen verileri state'e ata
      } else {
        console.error("Veri bulunamadı:", data.message);
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  useEffect(() => {
    fetchTexts(currentLanguage); // Dil değişimini dinle ve metinleri güncelle
  }, [currentLanguage]);

  return (
    <div className="hero-main">
      <div className="hero-left">
        <div className="hero-left-card">
          <div className="hero-left-card-top">
            <img src={myImage} alt="my-image" />
          </div>
          <div className="hero-left-card-bottom">
            <h2>Enes Ertuğrul Koyuncu</h2>
            <h3>Software Engineer</h3>
            <p data-icon="📍">{texts.cardLocation || "Location"}</p>
            <p data-icon="🎓">{texts.cardGraduate || "Graduate Info"}</p>
            <p data-icon="💻">{texts.cardJob || "Job Title"}</p>
            <p data-icon="🎯">{texts.cardFocus || "Focus Area"}</p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <section className="hero-right-section">
          <div className="iconTab">
            <a
              href="https://www.linkedin.com/in/eneskoyuncu5/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="5x"
                className="linkedin-logo"
              />
              Linkedin
            </a>
          </div>
          <div className="iconTab">
            <a
              href="https://github.com/EnesKoyuncu"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faGithub}
                size="5x"
                className="github-logo"
              />
              Github
            </a>
          </div>
          <div className="iconTab">
            <a
              href="https://medium.com/@enes.koyuncu5507"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faMedium}
                size="5x"
                className="medium-logo"
              />
              Medium
            </a>
          </div>
          <div className="iconTab">
            <a href="/cv" target="_self" rel="noreferrer noopener">
              <FontAwesomeIcon icon={faFile} size="5x" className="file-logo" />
              CV
            </a>
          </div>
        </section>

        <div className="hero-right-section-about">
          <div className="about-tab1">
            <h1>{texts.welcomeTitle || "Hello!"}</h1>
          </div>
          <div className="about-tab2">
            <div className="speech">
              {texts.welcomeSubtitle || "About Me Text"}
            </div>
            <div className="buttons-others">
              <a href="/projects">{texts.projectsButton || "Projects"}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
