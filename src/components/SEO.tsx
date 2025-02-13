import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export default function SEO({ title, description, url, image }: SEOProps) {
  return (
    <Helmet>
      {/* Sayfa Başlığı */}
      <title>{title}</title>

      {/* Meta Açıklaması */}
      <meta name="description" content={description} />

      {/* Arama Motoru Index ve Follow */}
      <meta name="robots" content="index, follow" />

      {/* Canonical URL (Google için en doğru URL) */}
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn vb. için) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Cards (Twitter Paylaşımı için) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
