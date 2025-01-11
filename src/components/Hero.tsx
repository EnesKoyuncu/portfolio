import React from "react";
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
            <FontAwesomeIcon icon={faLinkedin} size="6x" name="Linkedin" />
            Linkedin
          </div>
          <div className="iconTab">
            <FontAwesomeIcon icon={faGithub} size="6x" />
            Github
          </div>
          <div className="iconTab">
            <FontAwesomeIcon icon={faMedium} size="6x" /> Medium
          </div>
          <div className="iconTab">
            <FontAwesomeIcon icon={faFile} size="6x" />
            CV
          </div>
        </section>
        <div className="hero-right-section-empty">şimdilik boş</div>
      </div>
    </div>
  );
}
