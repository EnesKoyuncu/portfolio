import React, { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  isTransitioning: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
