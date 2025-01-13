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
              Mezun - Celal Bayar Üniversitesi - Yazılım Mühendisliği
            </p>
            <p data-icon="💻">Fullstack Developer</p>
            <p data-icon="🎯">
              Güncel olarak NextJS - NodeJS ve MongoDB ile ilgileniyorum.
            </p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <section className="hero-right-section">
          <div className="iconTab">
            <a
              href="https://www.linkedin.com/in/eneskoyuncu5/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="5x"
                className="linkedin-logo"
              />
              Linkedin
            </a>
          </div>
          <div className="iconTab">
            <a
              href="https://github.com/EnesKoyuncu"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faGithub}
                size="5x"
                className="github-logo"
              />
              Github
            </a>
          </div>
          <div className="iconTab">
            <a
              href="https://medium.com/@enes.koyuncu5507"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faMedium}
                size="5x"
                className="medium-logo"
              />
              Medium
            </a>
          </div>
          <div className="iconTab">
            <a href="/cv" target="_self" rel="noreferrer noopener">
              <FontAwesomeIcon icon={faFile} size="5x" className="file-logo" />
              CV
            </a>
          </div>
        </section>

        <div className="hero-right-section-about">
          <div className="about-tab1">
            <h1>Merhaba!</h1>
          </div>
          <div className="about-tab2">
            <div className="speech">
              Ben <strong>Enes Ertuğrul Koyuncu</strong>. Yazılım Mühendisiyim.
              Web sektörü başta olmak üzere birçok sektörde kendi çapımda
              projeler geliştirmeye çalışıyorum. Web projeleriyle beraber python
              ile makine öğrenmesi, doğal dil işleme ve veri analizi gibi
              alanlarda da çalışmalarım var. Kendimi sürekli geliştirmeye ve
              yeni şeyler öğrenmeye çalışıyorum. Yaptığım projelerle ilgili daha
              detaylı bilgi alabilmek için aşağıdaki projeler butonu ile
              yaptığım çalışmalara göz atabilirsin.
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
