import { LanguageContext } from "./LanguageContext";
import { useState, useEffect } from "react";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setLanguage] = useState<string>(
    localStorage.getItem("currentLanguage") || "en"
  );

  const setCurrentLanguage = (language: string) => {
    setLanguage(language);
    localStorage.setItem("currentLanguage", language); // LocalStorage güncelleniyor
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("currentLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
