import { useState } from "react";

import "../css/projects.scss";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import SEO from "./SEO";

import { Card, Modal, Carousel, Button, ConfigProvider, Row, Col } from "antd";

import { ExpandAltOutlined } from "@ant-design/icons";
import {
  IMetaTagsLanguageSupport,
  IAriaLabelsLanguageSupport,
  ariaLabels,
  metaTags,
} from "../data/projectsData";
import ErrorComponent from "./miniComponents/ErrorComponent";
import LoadingSpin from "./miniComponents/LoadingSpin";

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
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();
  // const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // projectsData.ts dosyasındaki metinleri alıyoruz, dili belirtiyoruz ki her kullanımda as keyof yüzünden kod uzamasın.
  const ariaLabelsText =
    ariaLabels[currentLanguage as keyof IAriaLabelsLanguageSupport];
  const metaTagsText =
    metaTags[currentLanguage as keyof IMetaTagsLanguageSupport];

  const fetchProjects = async (language: string): Promise<Project[]> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects?language=${language}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      return data.data || [];
    } else {
      throw new Error(data.message || "Failed to fetch projects");
    }
  };

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: ["projects", currentLanguage],
    queryFn: () => fetchProjects(currentLanguage),
  });

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

  // fetch edilen verilerin yüklenmesini beklerken gösterilcek ekrann
  if (isLoading) {
    return <LoadingSpin mainContainerName="project-main" />;
  }

  // hata gelmesi durumunda error comp çağırıyoruz
  if (error) {
    return (
      <ErrorComponent
        errorMessage={error.message}
        onRetry={() => fetchProjects(currentLanguage)}
      />
    );
  }

  //  TODO: Burayı ErrorComp ile yapabilirim bi bakcam buraya
  // eğer projeler boş dönerse hata ekranı veriyoruz.
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
        <p> {ariaLabelsText.noProjectsFound} </p>
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
          title={metaTagsText.title}
          description={metaTagsText.description}
          image="/img/file.webp"
          author="Enes Ertuğrul Koyuncu"
          publisher="Enes Ertuğrul Koyuncu"
          keywords={metaTagsText.keywords}
        />

        <h1 className="visually-hidden"> {ariaLabelsText.h1VisuallyHidden} </h1>
        <h2 className="visually-hidden"> {ariaLabelsText.h2VisuallyHidden} </h2>
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
                      title={ariaLabelsText.imageTitle}
                    />
                  </div>
                }
                actions={[
                  <Button
                    type="link"
                    icon={<ExpandAltOutlined />}
                    onClick={() => setSelectedProject(project)}
                    aria-label={ariaLabelsText.expandButton}
                  >
                    {ariaLabelsText.expandButton}
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
              aria-label={ariaLabelsText.viewProject}
            >
              {ariaLabelsText.viewProject}
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
                      title={ariaLabelsText.imageTitle}
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
