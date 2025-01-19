import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

interface BlogPost {
  _id: string;
  title: string;
  date: string;
  summary: string;
  keywords: string[];
  image: string;
  content: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { currentLanguage } = useLanguage(); // Dil değerini al

  // API'den veri çek
  const fetchBlogs = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${language}`
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

  // currentLanguage değiştikçe blogları güncelle
  useEffect(() => {
    fetchBlogs(currentLanguage);
  }, [currentLanguage]);

  return (
    <div className="blog-main">
      <h1>Blog</h1>
      <div className="blog-posts">
        {blogPosts.map((post) => (
          <div key={post._id} className="blog-card">
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <button>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
