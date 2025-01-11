import myImage from "../img/pp2kARE.jpg";
import "../css/hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

import { faFile } from "@fortawesome/free-regular-svg-icons";

export default function Hero() {
  return (
    <div className="hero-main">
      <div className="hero-left">
        <div className="hero-left-card">
          <div className="hero-left-card-top">
            <img src={myImage} alt="my-image" />
          </div>
          <div className="hero-left-card-bottom">
            <h2>Enes Ertuğrul Koyuncu</h2>
            <h3>Software Engineer</h3>
            <p data-icon="📍">İzmir, Türkiye</p>
            <p data-icon="🎓">
              Celal Bayar Üniversitesi - Yazılım Mühendisliği
            </p>
            <p data-icon="💻">Frontend & Backend Developer</p>
            <p data-icon="🎯">
              Global projelerde yer almak ve kendimi geliştirmek istiyorum.
            </p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <section className="hero-right-section">
          <div className="iconTab">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="5x"
              className="linkedin-logo"
            />
            Linkedin
          </div>
          <div className="iconTab">
            <FontAwesomeIcon
              icon={faGithub}
              size="5x"
              className="github-logo"
            />
            Github
          </div>
          <div className="iconTab">
            <FontAwesomeIcon
              icon={faMedium}
              size="5x"
              className="medium-logo"
            />{" "}
            Medium
          </div>
          <div className="iconTab">
            <FontAwesomeIcon icon={faFile} size="5x" className="file-logo" />
            CV
          </div>
        </section>
        {/* <div className="hero-right-section-about">
          <div className="about-tab1">
            <div>
              <h1>Merhaba!</h1>
            </div>
          </div>
          <div className="about-tab2">
            <div className="speech">
              Ben Enes Ertuğrul Koyuncu. Yazılım Mühendisiyim. Birçok sektörde
              kendi çapımda projeler geliştiriyorum. Web geliştirme, mobil
              uygulama geliştirme, yapay zeka ve veri bilimi alanlarında
              çalışmalarım var. Kendimi sürekli geliştirmeye ve yeni şeyler
              öğrenmeye açığım.
            </div>
            <div className="buttons-others"> Projelerim</div>
          </div>
        </div> */}
        <div className="hero-right-section-about">
          <div className="about-tab1">
            <h1>Merhaba!</h1>
          </div>
          <div className="about-tab2">
            <div className="speech">
              Ben <strong>Enes Ertuğrul Koyuncu</strong>. Yazılım Mühendisiyim.
              Birçok sektörde kendi çapımda projeler geliştiriyorum. Web
              geliştirme, mobil uygulama geliştirme, yapay zeka ve veri bilimi
              alanlarında çalışmalarım var. Kendimi sürekli geliştirmeye ve yeni
              şeyler öğrenmeye açığım.
            </div>
            <div className="buttons-others">
              <a href="#projects">Projelerim</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
