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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <section className="hero-right-section">
          <FontAwesomeIcon icon={faLinkedin} size="6x" />
          <FontAwesomeIcon icon={faGithub} size="6x" />
          <FontAwesomeIcon icon={faMedium} size="6x" />
          <FontAwesomeIcon icon={faFile} size="6x" />
        </section>
        <div className="hero-right-section-empty">şimdilik boş</div>
      </div>
    </div>
  );
}
