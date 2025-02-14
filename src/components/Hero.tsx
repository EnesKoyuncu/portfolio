import "../css/hero.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

import MyProfilePhoto from "../assets/img/pp2kARE.webp";
import SEO from "./SEO";

import { faFile } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage"; // Dil context'i
import { useTheme } from "../hooks/useTheme";
import { Spin } from "antd";

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
  const [loading, setLoading] = useState(false);

  const { currentLanguage } = useLanguage(); // Şu anki dil değerini al

  interface IHeroAriaLabels {
    linkedin: string;
    github: string;
    medium: string;
    cv: string;
    projects: string;
  }

  interface IHeroAriaLabelsLanguageSupport {
    tr: IHeroAriaLabels;
    en: IHeroAriaLabels;
    de: IHeroAriaLabels;
  }

  const heroAriaLabels: IHeroAriaLabelsLanguageSupport = {
    tr: {
      linkedin: "Linkedin Sayfası",
      github: "Github Sayfası",
      medium: "Medium Sayfası",
      cv: "CV Sayfası",
      projects: "Projeler Sayfası",
    },
    en: {
      linkedin: "Linkedin Page",
      github: "Github Page",
      medium: "Medium Page",
      cv: "CV Page",
      projects: "Projects Page",
    },
    de: {
      linkedin: "Linkedin Seite",
      github: "Github Seite",
      medium: "Medium Seite",
      cv: "CV Seite",
      projects: "Projekte Seite",
    },
  };

  interface IMetaTags {
    title: string;
    description: string;
    keywords?: string[];
  }

  interface IMetaTagsLanguageSupport {
    tr: IMetaTags;
    en: IMetaTags;
    de: IMetaTags;
  }

  const metaTags: IMetaTagsLanguageSupport = {
    tr: {
      title: "Enes Ertuğrul Koyuncu Kişisel Web Sitesi",
      description:
        "Enes Ertuğrul Koyuncu'nun kişisel web sitesi. Yazılım Mühendisi, Full Stack Developer ve Blogger. Projelerimi, blog yazılarımı inceleyin ve benimle iletişime geçin.",
      keywords: [
        "Enes Ertuğrul Koyuncu",
        "Yazılım Mühendisi",
        "Geliştirici",
        "Portfolyo",
        "Blog",
        "Full Stack Developer",
        "Portföy",
        "Developer",
        "Mühendis",
        "React",
        "Ön uç geliştirici",
        "Arka uç geliştirici",
      ],
    },
    en: {
      title: "Enes Ertuğrul Koyuncu Portfolio Website",
      description:
        "Enes Ertuğrul Koyuncu's personal website. Software Engineer, Full Stack Developer, and Blogger. Check out my projects, blog posts, and contact me.",
      keywords: [
        "Enes Ertuğrul Koyuncu",
        "Software Engineer",
        "Developer",
        "Portfolio",
        "Blog",
        "Full Stack Developer",
        "Portfolio",
        "Developer",
        "Engineer",
        "React",
        "Frontend Developer",
        "Backend Developer",
      ],
    },
    de: {
      title: "Enes Ertugrul Koyuncu Portfolio-Website",
      description:
        "Enes Ertugrul Koyuncu's persönliche Website. Software-Ingenieur, Full-Stack-Entwickler und Blogger. Überprüfen Sie meine Projekte, Blog-Beiträge und kontaktieren Sie mich.",
      keywords: [
        "Enes Ertuğrul Koyuncu",
        "Software-Ingenieur",
        "Entwickler",
        "Portfolio",
        "Blog",
        "Full-Stack-Entwickler",
        "Portfolio",
        "Entwickler",
        "Ingenieur",
        "React",
        "Frontend-Entwickler",
        "Backend-Entwickler",
      ],
    },
  };

  const fetchTexts = async (language: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/texts/hero/${language}`
      );
      const data = await response.json();
      if (data.success) {
        setTexts(data.translations);
      } else {
        console.error("Failed to fetch texts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts(currentLanguage); // Dil değişimini dinle ve metinleri güncelle
  }, [currentLanguage]);

  const { theme } = useTheme();

  if (loading) {
    return (
      <div
        className={`hero-main-${theme}`}
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
    <div className={`hero-main-${theme}`}>
      <SEO
        title={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].title
        }
        description={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport]
            .description
        }
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].keywords
        }
      />

      <h2 className="visually-hidden"> Deneme 123</h2>
      <div className="hero-left">
        <div className="hero-left-card">
          <div className="hero-left-card-top">
            <img src={MyProfilePhoto} alt="my-image" title="My Profile Photo" />
          </div>
          <div className="hero-left-card-bottom">
            <div className="hero-left-card-bottom-name">
              <span>Enes Ertuğrul Koyuncu</span>
              <span>Software Engineer</span>
            </div>
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
              aria-label={
                heroAriaLabels[
                  currentLanguage as keyof IHeroAriaLabelsLanguageSupport
                ].linkedin
              }
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="5x"
                className="linkedin-logo"
                aria-label="Linkedin"
              />
              Linkedin
            </a>
          </div>
          <div className="iconTab">
            <a
              href="https://github.com/EnesKoyuncu"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={
                heroAriaLabels[
                  currentLanguage as keyof IHeroAriaLabelsLanguageSupport
                ].github
              }
            >
              <FontAwesomeIcon
                icon={faGithub}
                size="5x"
                className="github-logo"
                aria-label="Github"
              />
              Github
            </a>
          </div>
          <div className="iconTab">
            <a
              href="https://medium.com/@enes.koyuncu5507"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={
                heroAriaLabels[
                  currentLanguage as keyof IHeroAriaLabelsLanguageSupport
                ].medium
              }
            >
              <FontAwesomeIcon
                icon={faMedium}
                size="5x"
                className="medium-logo"
                aria-label="Medium"
              />
              Medium
            </a>
          </div>
          <div className="iconTab">
            <a
              href={`/${currentLanguage}/cv`}
              target="_self"
              rel="noreferrer noopener"
              aria-label={
                heroAriaLabels[
                  currentLanguage as keyof IHeroAriaLabelsLanguageSupport
                ].cv
              }
            >
              <FontAwesomeIcon
                icon={faFile}
                size="5x"
                className="file-logo"
                aria-label="CV"
              />
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
              <a
                href="/projects"
                aria-label={
                  heroAriaLabels[
                    currentLanguage as keyof IHeroAriaLabelsLanguageSupport
                  ].projects
                }
              >
                {texts.projectsButton || "Projects"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
