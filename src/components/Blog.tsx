import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Modal,
  Divider,
  ConfigProvider,
  theme,
} from "antd";
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
      colorTextSecondary:
        currentTheme === "dark"
          ? "rgba(255, 255, 255, 0.45)"
          : "rgba(0, 0, 0, 0.45)",
      colorBgLayout: currentTheme === "dark" ? "#141414" : "#f0f2f5",
      colorBgMask:
        currentTheme === "dark" ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.45)",
      colorTextDescription:
        currentTheme === "dark"
          ? "rgba(255, 255, 255, 0.45)"
          : "rgba(0, 0, 0, 0.45)",
      colorTextHeading:
        currentTheme === "dark" ? "rgba(255, 255, 255, 0.85)" : "#000000",
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={`blog-container-${currentTheme}`}>
        <Title level={1} className="blog-title">
          Blog - Work In Progress
        </Title>
        <Row gutter={[24, 24]} className="blog-grid">
          {blogPosts.map((post) => (
            <Col xs={24} sm={12} lg={8} key={post._id}>
              <Card
                hoverable
                cover={
                  <div className="blog-card-image">
                    <img
                      alt={
                        post.title[currentLanguage as keyof typeof post.title]
                      }
                      src={post.image}
                    />
                  </div>
                }
                className="blog-card"
                onClick={() => setSelectedPost(post)}
              >
                <div className="blog-card-meta">
                  <Text type="secondary">
                    <CalendarOutlined /> {formatDate(post.date)}
                  </Text>
                </div>
                <Title level={3} className="blog-card-title">
                  {post.title[currentLanguage as keyof typeof post.title]}
                </Title>
                <Paragraph className="blog-card-summary" ellipsis={{ rows: 3 }}>
                  {post.summary[currentLanguage as keyof typeof post.summary]}
                </Paragraph>
                <div className="blog-card-tags">
                  <TagOutlined />
                  {post.keywords.slice(0, 3).map((keyword, index) => (
                    <Tag key={index} color="purple">
                      {keyword}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title={
            selectedPost?.title[
              currentLanguage as keyof typeof selectedPost.title
            ]
          }
          open={!!selectedPost}
          onCancel={() => setSelectedPost(null)}
          footer={null}
          width={800}
          style={{ top: 20 }}
        >
          {selectedPost && (
            <div className="blog-post-detail">
              <img
                src={selectedPost.image}
                alt={
                  selectedPost.title[
                    currentLanguage as keyof typeof selectedPost.title
                  ]
                }
                className="blog-post-image"
              />
              <Title level={2}>
                {
                  selectedPost.title[
                    currentLanguage as keyof typeof selectedPost.title
                  ]
                }
              </Title>
              <div className="blog-post-meta">
                <Text type="secondary">
                  <CalendarOutlined /> {formatDate(selectedPost.date)}
                </Text>
                <div className="blog-post-tags">
                  {selectedPost.keywords.map((keyword, index) => (
                    <Tag key={index} color="purple">
                      {keyword}
                    </Tag>
                  ))}
                </div>
              </div>
              <Divider />
              <Paragraph className="blog-post-content">
                {
                  selectedPost.content[
                    currentLanguage as keyof typeof selectedPost.content
                  ]
                }
              </Paragraph>
            </div>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
}
