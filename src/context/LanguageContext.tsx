import React, { createContext, useContext, useState, useEffect } from "react";

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setCurrentLanguage: () => {},
});

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

export const useLanguage = () => useContext(LanguageContext);
