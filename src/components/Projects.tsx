import { useEffect, useState } from "react";

import "../css/projects.scss";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";

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

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  technologies?: string[];
  category?: string;
}

interface IAriaLabels {
  imageTitle: string;
  expandButton: string;
  viewProject: string;
  noProjectsFound: string; // aria-label değil ekstra interface ve yapı kurmak istemedim, ilerde değişebilir.
  h1VisuallyHidden: string;
  h2VisuallyHidden: string;
}

interface IAriaLabelsLanguageSupport {
  tr: IAriaLabels;
  en: IAriaLabels;
  de: IAriaLabels;
}

const ariaLabels: IAriaLabelsLanguageSupport = {
  tr: {
    imageTitle: "Proje Resmi",
    expandButton: "Detayları Gör",
    viewProject: "Projeyi Görüntüle",
    noProjectsFound: "Proje bulunamadı",
    h1VisuallyHidden: "Merhaba",
    h2VisuallyHidden: "Projeler sayfama hoş geldiniz!",
  },
  en: {
    imageTitle: "Project Image",
    expandButton: "View Details",
    viewProject: "View Project",
    noProjectsFound: "No projects found",
    h1VisuallyHidden: "Hello",
    h2VisuallyHidden: "Welcome to my projects page!",
  },
  de: {
    imageTitle: "Projekt Bild",
    expandButton: "Details anzeigen",
    viewProject: "Projekt anzeigen",
    noProjectsFound: "Keine Projekte gefunden",
    h1VisuallyHidden: "Hallo",
    h2VisuallyHidden: "Willkommen auf meiner Projekte-Seite!",
  },
};

interface IMetaTags {
  title: string;
  description: string;
  keywords?: string[];
}

interface IMetaTagsLanguageSupport {
  tr: IMetaTags;
  en: IMetaTags;
  de: IMetaTags;
}

const metaTags: IMetaTagsLanguageSupport = {
  tr: {
    title: "Projeler - Enes Ertuğrul Koyuncu",
    description:
      "Enes Ertuğrul Koyuncu'nun çalıştığı projeler. Proje detaylarının yer aldığı sayfa. Projelerimi inceleyebilir ve benimle iletişime geçebilirsiniz.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Portföy",
      "Mühendis",
      "React",
      "NextJS",
      "Ön uç geliştirici",
      "Arka uç geliştirici",
      "Projeler",
      "Web Projeleri",
    ],
  },
  en: {
    title: "Projects - Enes Ertuğrul Koyuncu",
    description:
      "Projects Enes Ertuğrul Koyuncu has worked on. The page with project details. You can review my projects and contact me and also you can share your feedbacks.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Full Stack Developer",
      "Web Developer",
      "Engineer",
      "React",
      "NextJS",
      "Projects",
      "Web Projects",
      "Frontend Developer",
      "Backend Developer",
    ],
  },
  de: {
    title: "Projekte - Enes Ertuğrul Koyuncu",
    description:
      "Projekte, an denen Enes Ertuğrul Koyuncu gearbeitet hat. Die Seite mit den Projektdetails. Sie können meine Projekte überprüfen und mich kontaktieren.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software-Ingenieur",
      "Entwickler",
      "Full-Stack-Entwickler",
      "Ingenieur",
      "React",
      "NextJS",
      "Frontend-Entwickler",
      "Backend-Entwickler",
      "Geschäftsbereich",
    ],
  },
};

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
        <p>
          {" "}
          {
            ariaLabels[currentLanguage as keyof IAriaLabelsLanguageSupport]
              .noProjectsFound
          }{" "}
        </p>
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
        <SEO
          title={
            metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].title
          }
          description={
            metaTags[currentLanguage as keyof IMetaTagsLanguageSupport]
              .description
          }
          image="/img/file.webp"
          author="Enes Ertuğrul Koyuncu"
          publisher="Enes Ertuğrul Koyuncu"
          keywords={
            metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].keywords
          }
        />

        <h1 className="visually-hidden">
          {" "}
          {
            ariaLabels[currentLanguage as keyof IAriaLabelsLanguageSupport]
              .h1VisuallyHidden
          }{" "}
        </h1>
        <h2 className="visually-hidden">
          {" "}
          {
            ariaLabels[currentLanguage as keyof IAriaLabelsLanguageSupport]
              .h2VisuallyHidden
          }{" "}
        </h2>
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
                      title={
                        ariaLabels[
                          currentLanguage as keyof IAriaLabelsLanguageSupport
                        ].imageTitle
                      }
                    />
                  </div>
                }
                actions={[
                  <Button
                    type="link"
                    icon={<ExpandAltOutlined />}
                    onClick={() => setSelectedProject(project)}
                    aria-label={
                      ariaLabels[
                        currentLanguage as keyof IAriaLabelsLanguageSupport
                      ].expandButton
                    }
                  >
                    {
                      ariaLabels[
                        currentLanguage as keyof IAriaLabelsLanguageSupport
                      ].expandButton
                    }
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
              aria-label={
                ariaLabels[currentLanguage as keyof IAriaLabelsLanguageSupport]
                  .viewProject
              }
            >
              {
                ariaLabels[currentLanguage as keyof IAriaLabelsLanguageSupport]
                  .viewProject
              }
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
                      title={
                        ariaLabels[
                          currentLanguage as keyof IAriaLabelsLanguageSupport
                        ].imageTitle
                      }
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
