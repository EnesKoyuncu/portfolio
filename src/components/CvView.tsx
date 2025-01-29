import "../css/cvview.scss";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

interface CvTexts {
  title: string;
  content: string;
}

export default function CvView() {
  const [cvData, setCvData] = useState<CvTexts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const fetchCvTexts = async () => {
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
  };

  useEffect(() => {
    fetchCvTexts();
  }, [currentLanguage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cvData) {
    return <div>Veri bulunamadı</div>;
  }

  return (
    <div className={`cv-container-${theme}`}>
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
    </div>
  );
}
