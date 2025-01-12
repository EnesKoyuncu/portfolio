import "../css/header.css";
import nskLogo from "../img/file.jpeg";

export default function Header() {
  return (
    <div className="header-main">
      <div className="header-left">
        <div className="header-left-top">
          <div className="header-left-top-left">
            <a href="#">Anasayfa</a>
          </div>
          <div className="header-left-top-mid"></div>
          <div className="header-left-top-right">
            <a href="#">Projeler</a>
          </div>
        </div>
        <div className="header-left-bottom">
          <div className="header-left-bottom-left"></div>
          <div className="header-left-bottom-mid">
            <a href="#">CV</a>
          </div>
          <div className="header-left-bottom-right"></div>
        </div>
      </div>
      <div className="header-mid">
        <img src={nskLogo} alt="nsk logo" />
      </div>

      <div className="header-right">
        <div className="header-right-top">
          <div className="header-right-top-left"></div>
          <div className="header-right-top-mid">
            <a href="#">Blog</a>
          </div>
          <div className="header-right-top-right"></div>
        </div>
        <div className="header-right-bottom">
          <div className="header-right-bottom-left">
            <a href="#">Hakkımda</a>
          </div>
          <div className="header-right-bottom-mid"></div>
          <div className="header-right-bottom-right">
            <a href="#">İletişim</a>
          </div>
        </div>
      </div>
    </div>
  );
}
