import "../css/cvview.scss";
import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";
import { Spin } from "antd";

interface CvTexts {
  title: string;
  content: string;
}

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
    title: "CV - Enes Ertugrul Koyuncu'nun  CV Sayfası",
    description:
      "Enes Ertuğrul Koyuncu'nun CV sayfası. CV'imi inceleyebilir ve ayrıntılar hakkında benimle iletişime geçebilirsiniz. CV'm hakkında geri bildirimlerinizi bekliyorum.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "CV",
      "Portfolyo",
      "Tecrübelerim",
    ],
  },
  en: {
    title: "CV - Enes Ertugrul Koyuncu's CV Page",
    description:
      "Enes Ertuğrul Koyuncu's CV page. You can review my CV and contact me for more details. I am waiting for your feedback about my CV. For more information, you can contact me.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Portfolio",
      "CV",
      "Experiences",
    ],
  },
  de: {
    title: "CV - Enes Ertugrul Koyuncu's CV Seite",
    description:
      "Enes Ertuğrul Koyuncu's Lebenslauf Seite. Sie können meinen Lebenslauf einsehen und mich für weitere Details kontaktieren",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software-Ingenieur",
      "Entwickler",
      "Portfolio",
      "CV",
      "Erfahrungen",
    ],
  },
};

export default function CvView() {
  const [cvData, setCvData] = useState<CvTexts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const fetchCvTexts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/texts/cv/${currentLanguage}`
      );
      const data = await response.json();

      if (data.success) {
        setCvData(data.translations);
      } else {
        console.error("CV verisi bulunamadı:", data.message);
        setCvData(null);
      }
    } catch (error) {
      console.error("CV verisi alınırken hata oluştu:", error);
      setCvData(null);
    } finally {
      setLoading(false);
    }
  }, [currentLanguage]); // callback yapısıyla cache'e kaydettirdik.

  useEffect(() => {
    fetchCvTexts();
  }, [fetchCvTexts]);

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

  if (!cvData) {
    return <div>Veri bulunamadı</div>;
  }

  return (
    <div className={`cv-container-${theme}`}>
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
      <h1 className="visually-hidden">CV</h1>
      {isMobile ? (
        <div className="cv-mobile">
          <a
            href="/pdf/EnesErtugrulKoyuncu-CV-ENG-V3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-preview"
            aria-label="CV"
          >
            {currentLanguage === "tr"
              ? "CV'yi görüntülemek için tıklayınız"
              : currentLanguage === "de"
              ? "Klicken Sie hier, um den Lebenslauf anzuzeigen"
              : "Click here to view CV"}
          </a>
          <div className="cv-notes">
            <h2>{cvData.title}</h2>
            {cvData.content.split("||").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="cv-pdf">
            <iframe
              src="/pdf/EnesErtugrulKoyuncu-CV-ENG-V3.pdf"
              width="100%"
              height="100%"
              title="CV"
            />
          </div>
          <div className="cv-notes">
            <h2>{cvData.title}</h2>
            {cvData.content.split("||").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
