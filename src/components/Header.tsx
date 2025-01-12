import "../css/header.css";
import nskLogo from "../img/file.jpeg";

export default function Header() {
  return (
    <div className="header-main">
      <div className="header-links header-left">
        <a href="/">Anasayfa</a>
        <a href="/cv">CV</a>
        <a href="/projects">Projeler</a>
      </div>

      <div className="header-logo">
        <img src={nskLogo} alt="nsk logo" />
      </div>

      <div className="header-links header-right">
        <a href="/about">Hakkımda</a>
        <a href="/blog">Blog</a>
        <a href="/contact">İletişim</a>
      </div>
    </div>
  );
}
