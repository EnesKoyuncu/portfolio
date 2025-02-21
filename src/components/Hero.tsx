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
import { useLanguage } from "../hooks/useLanguage"; // Dil context'i
import { useTheme } from "../hooks/useTheme";
import LoadingSpin from "./miniComponents/LoadingSpin";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../components/miniComponents/ErrorComponent";

import {
  IHeroAriaLabelsLanguageSupport,
  IMetaTagsLanguageSupport,
  heroAriaLabels,
  metaTags,
} from "../data/heroData";

export default function Hero() {
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();

  // heroData.ts dosyasındaki metinleri alıyoruz, dili belirtiyoruz ki her kullanımda as keyof yüzünden kod uzamasın.
  const metaTagsText =
    metaTags[currentLanguage as keyof IMetaTagsLanguageSupport];
  const heroAriaLabelsText =
    heroAriaLabels[currentLanguage as keyof IHeroAriaLabelsLanguageSupport];

  const fetchTexts = async (language: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/texts/hero/${language}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch texts");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTexts", currentLanguage],
    queryFn: () => fetchTexts(currentLanguage),
  });

  // TODO : bu kısma bir  daha bakılacak.
  const texts = data?.translations || {
    cardLocation: "",
    cardGraduate: "",
    cardJob: "",
    cardFocus: "",
    welcomeTitle: "",
    welcomeSubtitle: "",
    projectsButton: "",
  };

  // fetch edilen verilerin yüklenmesini beklerken gösterilcek ekrann
  if (isLoading) {
    return <LoadingSpin />;
  }
  // hata alma durumu için sade bir error comp.
  if (error) {
    return (
      <ErrorComponent
        errorMessage={error.message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={`hero-main-${theme}`}>
      <SEO
        title={metaTagsText.title}
        description={metaTagsText.description}
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={metaTagsText.keywords}
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
              aria-label={heroAriaLabelsText.linkedin}
            >
              <FontAwesomeIcon
                icon={faLinkedin}
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
              aria-label={heroAriaLabelsText.github}
            >
              <FontAwesomeIcon
                icon={faGithub}
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
              aria-label={heroAriaLabelsText.medium}
            >
              <FontAwesomeIcon
                icon={faMedium}
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
              aria-label={heroAriaLabelsText.cv}
            >
              <FontAwesomeIcon
                icon={faFile}
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
                href={`/${currentLanguage}/projects`}
                aria-label={heroAriaLabelsText.projects}
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
