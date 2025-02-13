import { createContext } from "react";

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setCurrentLanguage: () => {},
});
