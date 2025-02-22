import { useState } from "react";
import "../css/blog.scss";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";

import { CalendarOutlined, TagOutlined } from "@ant-design/icons";
import { Typography, Tag, Modal, ConfigProvider, theme } from "antd";

import {
  IMetaTagsLanguageSupport,
  metaTags,
  IBlogPost,
} from "../data/blogData";
import { useQuery } from "@tanstack/react-query";
import LoadingSpin from "./miniComponents/LoadingSpin";
import ErrorComponent from "./miniComponents/ErrorComponent";

const { darkAlgorithm, defaultAlgorithm } = theme;
const { Title, Paragraph, Text } = Typography;

export default function Blog() {
  const { theme: currentTheme } = useTheme();
  const { currentLanguage } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<IBlogPost | null>(null);

  const metaTagsText =
    metaTags[currentLanguage as keyof IMetaTagsLanguageSupport];

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useQuery<IBlogPost[]>({
    queryKey: ["blogs", currentLanguage],
    queryFn: () => fetchBlogs(currentLanguage),
  });

  const fetchBlogs = async (language: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/blogs?language=${language}`
    );
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      console.error("Failed to fetch blogs:", data.message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const themeConfig = {
    algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: "#5e17eb",
      borderRadius: 8,
      colorBgContainer: currentTheme === "dark" ? "#1f1f1f" : "#ffffff",
      colorText:
        currentTheme === "dark" ? "rgba(255, 255, 255, 0.85)" : "#000000",
      colorBgElevated: currentTheme === "dark" ? "#1f1f1f" : "#ffffff",
      colorBorder: currentTheme === "dark" ? "#303030" : "#d9d9d9",
    },
  };

  if (isLoading) {
    return <LoadingSpin mainContainerName="" />;
  }

  if (error) {
    return (
      <ErrorComponent
        errorMessage={error.message}
        onRetry={() => fetchBlogs(currentLanguage)}
      />
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <SEO
        title={metaTagsText.title}
        description={metaTagsText.description}
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={metaTagsText.keywords}
      />
      <h2 className="visually-hidden">blog</h2>
      <div className={`blog-container-${currentTheme}`}>
        <div className="blog-header">
          <Title level={1}>
            {currentLanguage === "tr"
              ? "Blog - Yakında Yayında"
              : currentLanguage === "en"
              ? "Blog - Coming Soon"
              : "Blog - Bald verfügbar"}
          </Title>
        </div>

        <div className="blog-grid">
          {blogPosts?.map((post) => (
            <article
              key={post._id}
              className="blog-card"
              onClick={() => setSelectedPost(post)}
            >
              <div className="blog-card-image">
                <img
                  alt={post.title[currentLanguage as keyof typeof post.title]}
                  src={post.image}
                  loading="lazy"
                />
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <CalendarOutlined />
                  <Text>{formatDate(post.date)}</Text>
                </div>
                <Title level={3}>
                  {post.title[currentLanguage as keyof typeof post.title]}
                </Title>
                <Paragraph>
                  {post.summary[currentLanguage as keyof typeof post.summary]}
                </Paragraph>
                <div className="blog-card-tags">
                  <TagOutlined />
                  {post.keywords.slice(0, 3).map((keyword, index) => (
                    <Tag key={index}>{keyword}</Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Modal
          open={!!selectedPost}
          onCancel={() => setSelectedPost(null)}
          footer={null}
          centered
          width={1000}
          className={`blog-modal blog-modal-${currentTheme}`}
          destroyOnClose
          maskClosable
        >
          {selectedPost && (
            <div className="blog-post">
              <div className="blog-post-image">
                <img
                  src={selectedPost.image}
                  alt={
                    selectedPost.title[
                      currentLanguage as keyof typeof selectedPost.title
                    ]
                  }
                />
              </div>
              <div className="blog-post-content">
                <div className="blog-post-meta">
                  <CalendarOutlined />
                  <Text>{formatDate(selectedPost.date)}</Text>
                </div>
                <Title level={1}>
                  {
                    selectedPost.title[
                      currentLanguage as keyof typeof selectedPost.title
                    ]
                  }
                </Title>
                <div className="blog-post-tags">
                  {selectedPost.keywords.map((keyword, index) => (
                    <Tag key={index}>{keyword}</Tag>
                  ))}
                </div>
                <Paragraph>
                  {
                    selectedPost.content[
                      currentLanguage as keyof typeof selectedPost.content
                    ]
                  }
                </Paragraph>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
}
