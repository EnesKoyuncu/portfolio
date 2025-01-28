import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Typography, Tag, Modal, ConfigProvider, theme } from "antd";
import { CalendarOutlined, TagOutlined } from "@ant-design/icons";
import "../css/blog.scss";
import { useTheme } from "../context/ThemeContext";

const { Title, Paragraph, Text } = Typography;
const { darkAlgorithm, defaultAlgorithm } = theme;

interface BlogPost {
  _id: string;
  title: { en: string; tr: string; de: string };
  date: string;
  summary: { en: string; tr: string; de: string };
  keywords: string[];
  image: string;
  content: { en: string; tr: string; de: string };
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { currentLanguage } = useLanguage();
  const { theme: currentTheme } = useTheme();

  const fetchBlogs = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs?language=${language}`
      );
      const data = await response.json();
      if (data.success) {
        setBlogPosts(data.data);
      } else {
        console.error("Veri bulunamadı:", data.message);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentLanguage);
  }, [currentLanguage]);

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

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={`blog-container-${currentTheme}`}>
        <div className="blog-header">
          <Title level={1}>Blog - Work In Progress</Title>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
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
