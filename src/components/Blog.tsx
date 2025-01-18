import { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // 🌐 Blog yazılarını backend’den çek
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  return (
    <div className="blog-main">
      <h1>{texts.heading}</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-card">
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
}
