import { useEffect, useState } from "react";
import "../css/projects.scss";
import { useLanguage } from "../context/LanguageContext";
import {
  Card,
  Modal,
  Carousel,
  Button,
  ConfigProvider,
  Spin,
  Row,
  Col,
} from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";
import { useTheme } from "../context/ThemeContext";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  technologies?: string[];
  category?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (language: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects?language=${language}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Projects response:", data); // Debug log
      if (data.success) {
        setProjects(data.data || []);
      } else {
        setError(data.message || "Failed to fetch projects");
        console.error("Failed to fetch projects:", data.message);
      }
    } catch (error) {
      setError("Error connecting to server");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentLanguage);
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

  if (loading) {
    return (
      <div
        className={`project-main-${theme}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`project-main-${theme}`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: "1rem",
        }}
      >
        <p>{error}</p>
        <Button onClick={() => fetchProjects(currentLanguage)}>Retry</Button>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div
        className={`project-main-${theme}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: theme === "dark" ? "#141414" : "#ffffff",
          colorTextBase: theme === "dark" ? "#f5f5f5" : "#000000",
          colorBorder: theme === "dark" ? "#303030" : "#d9d9d9",
        },
      }}
    >
      <div className={`project-main-${theme}`}>
        <Row gutter={[16, 16]} style={{ margin: 0, width: "100%" }}>
          {projects.map((project) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={project.id}>
              <Card
                hoverable
                cover={
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      alt={project.title}
                      src={project.images[0]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                }
                actions={[
                  <Button
                    type="link"
                    icon={<ExpandAltOutlined />}
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>,
                ]}
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "0 auto",
                }}
              >
                <Card.Meta
                  title={project.title}
                  description={project.description.substring(0, 100) + "..."}
                />
              </Card>
            </Col>
          ))}
        </Row>

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
          width="95%"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "10px",
          }}
        >
          <div style={{ width: "100%", margin: "0 auto" }}>
            <Carousel {...carouselSettings}>
              {selectedProject?.images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${selectedProject.title} - ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
            <p style={{ marginTop: "20px" }}>{selectedProject?.description}</p>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
