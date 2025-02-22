import "../css/cvview.scss";
import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";

import { IMetaTagsLanguageSupport, metaTags } from "../data/cvViewData";
import { useQuery } from "@tanstack/react-query";
import LoadingSpin from "./miniComponents/LoadingSpin";
import ErrorComponent from "./miniComponents/ErrorComponent";

interface CvTexts {
  title: string;
  content: string;
}

const fetchCvTexts = async (currentLanguage: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/texts/cv/${currentLanguage}`
  );
  const data = await response.json();

  if (data.success) {
    return data.translations;
  } else {
    throw new Error(data.message || "Failed to fetch texts");
  }
};

// TODO : aria-label'lar için direkt dinamik data ayarlancak cvViewData.ts dosyasında

export default function CvView() {
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // const [cvData, setCvData] = useState<CvTexts | null>(null);

  // const [loading, setLoading] = useState<boolean>(true);

  const metaTagsText =
    metaTags[currentLanguage as keyof IMetaTagsLanguageSupport];

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

  const {
    data: cvData,
    isLoading,
    error,
  } = useQuery<CvTexts>({
    queryKey: ["cvTexts", currentLanguage],
    queryFn: () => fetchCvTexts(currentLanguage),
  });

  // todo düzenlencek
  if (isLoading) {
    return <LoadingSpin mainContainerName="cv-container" />;
  }

  if (error) {
    <ErrorComponent
      errorMessage={error.message}
      onRetry={() => window.location.reload()}
    />;
  }
  if (!cvData) {
    return <div>Veri bulunamadı</div>;
  }

  return (
    <div className={`cv-container-${theme}`}>
      <SEO
        title={metaTagsText.title}
        description={metaTagsText.description}
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={metaTagsText.keywords}
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
            {/* Burada mongodb'den gelen datayı || ayracı sayesinde paragraflara ayırıyoruz. */}
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
