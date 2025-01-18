import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // 🌐 Proje verilerini backend’den çek
  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="project-main">
      <h1>{texts.heading}</h1>
      {projects.map((project) => (
        <div className="project-card" key={project.id}>
          <div className="project-slider">
            {project.images.map((image, index) => (
              <img key={index} src={image} alt={project.title} />
            ))}
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
