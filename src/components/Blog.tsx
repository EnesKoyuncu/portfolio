import { useState, useEffect } from "react";
import "../css/blog.css";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  image: string;
  content: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/json/blogs.json")
      .then((response) => response.json())
      .then((data: BlogPost[]) => {
        console.log("Fetched Data:", data); // Konsola yazdır
        setBlogPosts(data);
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  const togglePost = (id: number) => {
    setExpandedPostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="blog-main">
      <h1>Blog Yazıları</h1>
      {/* Blog Kartları Render Kontrolü */}
      {blogPosts.length > 0 ? (
        <div className="blog-posts">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <button onClick={() => togglePost(post.id)}>Devamını Oku</button>
              {expandedPostId === post.id && (
                <div className="blog-content">{post.content}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}
