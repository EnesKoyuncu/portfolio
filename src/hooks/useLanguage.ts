import { useLocation, useNavigate } from "react-router-dom";

const supportedLanguages = ["tr", "en", "de"]; // Desteklenen diller

export const useLanguage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL'den dili al
  const currentLanguage =
    supportedLanguages.find((lang) =>
      location.pathname.startsWith(`/${lang}`)
    ) || "en"; // Geçerli bir dil yoksa "en" kullan

  const setCurrentLanguage = (newLang: string) => {
    if (supportedLanguages.includes(newLang)) {
      const newPath = location.pathname.replace(
        `/${currentLanguage}`,
        `/${newLang}`
      );
      navigate(newPath, { replace: true });
    }
  };

  return { currentLanguage, setCurrentLanguage };
};
