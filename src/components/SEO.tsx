import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publisher?: string;
  lang?: string;
  keywords?: string[];
}

export default function SEO({
  title,
  description,
  url,
  image,
  author,
  publisher,
  lang = "en",
  keywords = [],
}: SEOProps) {
  return (
    <Helmet>
      {/* Sayfa Dili */}
      <html lang={lang} />

      {/* Sayfa Başlığı */}
      <title>{title}</title>

      {/* Meta Açıklaması */}
      <meta name="description" content={description} />

      {/*Anahtar Kelimeler */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

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

      {/* Author & Publisher Meta Etiketleri */}
      {author && <meta name="author" content={author} />}
      {publisher && <meta name="publisher" content={publisher} />}
    </Helmet>
  );
}
