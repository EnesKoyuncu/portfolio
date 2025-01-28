import { useEffect, useState } from "react";
import "../css/projects.scss";
import { useLanguage } from "../context/LanguageContext";
import { Card, Modal, Carousel, Button, ConfigProvider } from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";
import { useTheme } from "../context/ThemeContext";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects?language=${currentLanguage}`
      );
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentLanguage]);

  const carouselSettings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: theme === "dark" ? "#141414" : "#ffffff", // Karanlık ve açık mod arka planı
          colorTextBase: theme === "dark" ? "#f5f5f5" : "#000000", // Yazı rengi
          colorBorder: theme === "dark" ? "#303030" : "#d9d9d9", // Çerçeve rengi
        },
      }}
    >
      <div className={`project-main-${theme}`}>
        {projects.map((project) => (
          <Card
            key={project.id}
            hoverable
            cover={<img alt={project.title} src={project.images[0]} />}
            actions={[
              <Button
                type="link"
                icon={<ExpandAltOutlined />}
                onClick={() => setSelectedProject(project)}
              >
                View Details
              </Button>,
            ]}
          >
            <Card.Meta
              title={project.title}
              description={project.description.substring(0, 100) + "..."}
            />
          </Card>
        ))}

        <Modal
          title={selectedProject?.title}
          open={!!selectedProject}
          onCancel={() => setSelectedProject(null)}
          footer={[
            <Button
              key="link"
              type="primary"
              href={selectedProject?.link}
              target="_blank"
            >
              View Project
            </Button>,
          ]}
          width={1000}
        >
          <Carousel {...carouselSettings}>
            {selectedProject?.images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img
                  src={image}
                  alt={`${selectedProject.title} - ${index + 1}`}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
          <p style={{ marginTop: "20px" }}>{selectedProject?.description}</p>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
