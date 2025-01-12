import React, { useState } from "react";
import "../css/projects.css";

import p1_1 from "../img/projects/project1/p1-1.jpg";
import p1_2 from "../img/projects/project1/p1-2.jpg";
import p1_3 from "../img/projects/project1/p1-3.jpg";
import p2_1 from "../img/projects/project2/p2-1.jpg";
import p2_2 from "../img/projects/project2/p2-2.jpg";
import p2_3 from "../img/projects/project2/p2-3.jpg";

const Projects = () => {
  // Proje 1 için slider durumu
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const project1Images = [p1_1, p1_2, p1_3];

  // Proje 2 için slider durumu
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const project2Images = [p2_1, p2_2, p2_3];

  // Slider kontrol fonksiyonları
  const nextSlide = (currentSlide, setCurrentSlide, images) => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = (currentSlide, setCurrentSlide, images) => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="project-main">
      <h1>Projelerim</h1>

      {/* İlk proje kartı */}
      <div className="project-card">
        <div className="project-slider">
          {project1Images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project Image ${index + 1}`}
              className={index === currentSlide1 ? "active" : ""}
            />
          ))}
          <button
            className="slider-btn left"
            onClick={() =>
              prevSlide(currentSlide1, setCurrentSlide1, project1Images)
            }
          >
            ‹
          </button>
          <button
            className="slider-btn right"
            onClick={() =>
              nextSlide(currentSlide1, setCurrentSlide1, project1Images)
            }
          >
            ›
          </button>
        </div>
        <div className="project-info">
          <h2>Web Project</h2>
          <p>
            This is a description of the project. You can explain what
            technologies were used, the purpose of the project, and any other
            details you'd like to include.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      </div>

      {/* İkinci proje kartı */}
      <div className="project-card">
        <div className="project-slider">
          {project2Images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project Image ${index + 1}`}
              className={index === currentSlide2 ? "active" : ""}
            />
          ))}
          <button
            className="slider-btn left"
            onClick={() =>
              prevSlide(currentSlide2, setCurrentSlide2, project2Images)
            }
          >
            ‹
          </button>
          <button
            className="slider-btn right"
            onClick={() =>
              nextSlide(currentSlide2, setCurrentSlide2, project2Images)
            }
          >
            ›
          </button>
        </div>
        <div className="project-info">
          <h2>Python Project</h2>
          <p>
            This is another project description. Highlight any unique features
            or challenges you faced while working on this project.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
