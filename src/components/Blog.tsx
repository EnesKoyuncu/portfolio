import { useEffect, useState } from "react";

import "../css/blog.scss";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";

import { CalendarOutlined, TagOutlined } from "@ant-design/icons";
import { Typography, Tag, Modal, ConfigProvider, theme, Spin } from "antd";

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
    title: "Blog - Enes Ertuğrul Koyuncu'nun Blog Sayfası",
    description:
      "Enes Ertuğrul Koyuncu'nun blog sayfası. Blog yazılarımı inceleyebilir ve benimle iletişime geçebilirsiniz. Ayrıca geri bildirimlerinizi paylaşabilirsiniz. Daha fazla fikir ve öneri için iletişim sayfasından benim ile iletişime geçin.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Mühendis",
      "Blog",
      "Bilgilendirici Yazılar",
      "TypeScript Blog",
      "React Blog",
      "NextJS Blog",
      "CSS Blog",
      "NodeJS Blog",
      "Açık Kaynak Blog",
    ],
  },
  en: {
    title: "Blog - Enes Ertuğrul Koyuncu's Blog Page",
    description:
      "Enes Ertuğrul Koyuncu's blog page. You can review my blog posts and contact me. You can also share your feedback. For more ideas and suggestions, contact me via the contact page.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Engineer",
      "Developer",
      "Blog",
      "Bilgilendirici Yazılar",
      "TypeScript Blog",
      "React Blog",
      "NextJS Blog",
      "CSS Blog",
      "NodeJS Blog",
      "Açık Kaynak Blog",
    ],
  },
  de: {
    title: "Blog - Enes Ertuğrul Koyuncu's Blog Seite",
    description:
      "Enes Ertuğrul Koyuncu's Blog Seite. Sie können meine Blogbeiträge lesen und mich kontaktieren. Sie können mir auch Ihr Feedback mitteilen. Für weitere Ideen und Vorschläge können Sie mich über die Kontaktseite kontaktieren.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Entwickler",
      "Ingenieur",
      "Blog",
      "Informative Artikel",
      "TypeScript-Blog",
      "React-Blog",
      "NextJS-Blog",
      "CSS-Blog",
      "NodeJS-Blog",
      "Open Source Blog",
    ],
  },
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { currentLanguage } = useLanguage();
  const { theme: currentTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (language: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs?language=${language}`
      );
      const data = await response.json();
      if (data.success) {
        setBlogPosts(data.data);
      } else {
        console.error("Failed to fetch blogs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div
        className={`blog-container-${currentTheme}`}
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

  return (
    <ConfigProvider theme={themeConfig}>
      <SEO
        title={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].title
        }
        description={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport]
            .description
        }
        url="https://enesertugrulkoyuncu.com/blog"
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        lang={currentLanguage}
        keywords={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].keywords
        }
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
