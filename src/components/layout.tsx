import React, { useEffect, useState } from "react";
import "../css/layout.scss";
import { useTheme } from "../context/ThemeContext";

// Props tipini tanımlıyoruz
interface LayoutProps {
  children: React.ReactNode;
}

// Layout component ismini büyük harfle başlatıyoruz (React convention)
// ve children prop'unu alıyoruz
export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [layoutClass, setLayoutClass] = useState("layout-main light");

  useEffect(() => {
    // Tema değiştiğinde layout class'ını güncelle
    setLayoutClass(`layout-main ${theme}`);
  }, [theme]);

  return <div className={layoutClass}>{children}</div>;
}
