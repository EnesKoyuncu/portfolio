import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // localStorage'dan tema tercihini al veya varsayılan olarak 'light' kullan
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "light";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  // Tema değiştiğinde localStorage'a kaydet ve CSS class'ını güncelle
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) {
      const { clientX, clientY } = e;
      setClickPosition({ x: clientX, y: clientY });
      setIsTransitioning(true);

      setTimeout(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 250);
    } else {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{
              clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
              backgroundColor: theme === "light" ? "#1a1a1a" : "#ffffff",
            }}
            animate={{
              clipPath: `circle(2000px at ${clickPosition.x}px ${clickPosition.y}px)`,
            }}
            exit={{
              clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
