import React from "react";
import "../css/layout.css";

// Props tipini tanımlıyoruz
interface LayoutProps {
  children: React.ReactNode;
}

// Layout component ismini büyük harfle başlatıyoruz (React convention)
// ve children prop'unu alıyoruz
export default function Layout({ children }: LayoutProps) {
  return <div className="layout-main">{children}</div>;
}
