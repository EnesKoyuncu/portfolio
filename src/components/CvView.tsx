import "../css/cvview.scss";
import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

interface CvTexts {
  title: string;
  content: string;
}

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
    return <div>Loading...</div>;
  }

  if (!cvData) {
    return <div>Veri bulunamadı</div>;
  }

  return (
    <div className={`cv-container-${theme}`}>
      {isMobile ? (
        <div className="cv-mobile">
          <a
            href="/pdf/EnesErtugrulKoyuncu-CV-ENG-V3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-preview"
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
