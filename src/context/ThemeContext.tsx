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
          <>
            <motion.div
              initial={{
                clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
                backgroundColor: theme === "light" ? "#1a1a1a" : "#ffffff",
              }}
              animate={{
                clipPath: `circle(2000px at ${clickPosition.x}px ${clickPosition.y}px)`,
                scale: [1, 1.05, 1],
              }}
              exit={{
                clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // Custom bezier curve for smooth elastic effect
                scale: {
                  duration: 0.5,
                  times: [0, 0.5, 1],
                },
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998,
              }}
            />
            <motion.div
              initial={{
                clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
                backgroundColor: theme === "light" ? "#1a1a1a" : "#ffffff",
                opacity: 0.3,
              }}
              animate={{
                clipPath: `circle(2200px at ${clickPosition.x}px ${clickPosition.y}px)`,
                opacity: 0,
              }}
              exit={{
                clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
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
            <motion.div
              initial={{
                scale: 0,
                x: clickPosition.x - 15,
                y: clickPosition.y - 15,
              }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{
                duration: 0.5,
                times: [0, 0.6, 1],
                ease: "easeOut",
              }}
              style={{
                position: "fixed",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
                zIndex: 10000,
              }}
            />
          </>
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
