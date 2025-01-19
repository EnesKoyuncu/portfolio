import { useEffect, useState } from "react";
import "../css/projects.css";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  _id: string; // Proje kimliği
  title: { [key: string]: string }; // Çok dilli başlık
  description: { [key: string]: string }; // Çok dilli açıklama
  images: string[]; // Proje görselleri
  link: string; // Proje bağlantısı
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { currentLanguage } = useLanguage(); // Şu anki dil değerini al

  const fetchProjects = async () => {
    console.log("Fetching projects...");
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects?language=${currentLanguage}`
      );
      console.log("Fetch response:", response);

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.success) {
        setProjects(data.data); // Gelen projeleri state'e aktar
        console.log("Projects fetched successfully:", data.data);
      } else {
        console.error("Failed to fetch projects:", data.message);
        setProjects([]); // Eğer hata varsa boş bir array ata
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]); // Eğer hata varsa boş bir array ata
    } finally {
      console.log("Finished fetching projects.");
    }
  };

  const handleProjectClick = (index: number) => {
    setSelectedProject(index === selectedProject ? null : index);
  };

  useEffect(() => {
    fetchProjects();
    console.log("Current language:", currentLanguage); // Şu anki dil değeri
  }, [currentLanguage]);

  return (
    <div className="project-main">
      {projects.map((project, index) => (
        <div
          key={project._id} // Backend'deki `_id` yerine kullan
          className={`project-card ${
            selectedProject === index
              ? "project-card--expanded"
              : "project-card--collapsed"
          }`}
          onClick={() => handleProjectClick(index)}
        >
          {/* Küçük kart görünümü */}
          {selectedProject !== index && (
            <div className="project-summary">
              <img
                src={project.images[0]}
                alt={project.title[currentLanguage]}
              />
              <h2>{project.title[currentLanguage]}</h2>
            </div>
          )}

          {/* Detaylı görünüm */}
          {selectedProject === index && (
            <div className="project-details">
              <div className="project-slider">
                <div className="slider-images">
                  {project.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={project.title[currentLanguage]}
                    />
                  ))}
                </div>
              </div>
              <div className="project-info">
                <h2>{project.title[currentLanguage]}</h2>
                <p>{project.description[currentLanguage]}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
