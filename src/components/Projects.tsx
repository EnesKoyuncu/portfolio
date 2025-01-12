import { useState, useEffect } from "react";
import "../css/projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([]);

  useEffect(() => {
    fetch("/json/projects.json")
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjects(data);
        setCurrentImageIndex(new Array(data.length).fill(0));
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const nextImage = (projectIndex: number) => {
    setCurrentImageIndex((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === projectIndex
          ? (index + 1) % projects[projectIndex].images.length
          : index
      )
    );
  };

  const prevImage = (projectIndex: number) => {
    setCurrentImageIndex((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === projectIndex
          ? (index - 1 + projects[projectIndex].images.length) %
            projects[projectIndex].images.length
          : index
      )
    );
  };

  return (
    <div className="project-main">
      <h1>Projelerim</h1>
      {projects.map((project, projectIndex) => (
        <div className="project-card" key={project.id}>
          <div className="project-slider">
            <div
              className="slider-images"
              style={{
                transform: `translateX(-${
                  currentImageIndex[projectIndex] * 100
                }%)`,
              }}
            >
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Project ${project.title}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ))}
            </div>
            <button
              className="slider-btn left"
              onClick={() => prevImage(projectIndex)}
            >
              &#8249;
            </button>
            <button
              className="slider-btn right"
              onClick={() => nextImage(projectIndex)}
            >
              &#8250;
            </button>
          </div>
          <div className="project-info">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
