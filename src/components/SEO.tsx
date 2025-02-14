import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  author?: string;
  publisher?: string;
  keywords?: string[];
}

export default function SEO({
  title,
  description,
  image,
  author,
  publisher,
  keywords = [],
}: SEOProps) {
  const location = useLocation();
  const { currentLanguage } = useLanguage();

  // Canonical URL: Mevcut sayfa URL'sini dinamik olarak gösteriyoruz
  const baseUrl = "https://eneskoyuncu.com";
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  // Hreflang etiketleri: Google'a çok dilli yapı hakkında bilgi veriyoruz
  const hreflangs = [
    {
      lang: "en",
      url: `${baseUrl}/en${location.pathname.replace(/^\/(tr|de)/, "")}`,
    },
    {
      lang: "tr",
      url: `${baseUrl}/tr${location.pathname.replace(/^\/(en|de)/, "")}`,
    },
    {
      lang: "de",
      url: `${baseUrl}/de${location.pathname.replace(/^\/(en|tr)/, "")}`,
    },
  ];

  return (
    <Helmet>
      {/* Sayfa Dili */}
      <html lang={currentLanguage} />

      {/* Sayfa Başlığı */}
      <title>{title}</title>

      {/* Meta Açıklaması */}
      <meta name="description" content={description} />

      {/* Anahtar Kelimeler */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Arama Motoru Index ve Follow */}
      <meta name="robots" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Etiketleri */}
      {hreflangs.map((langData) => (
        <link
          rel="alternate"
          href={langData.url}
          hrefLang={langData.lang}
          key={langData.lang}
        />
      ))}

      {/* Open Graph (Facebook, LinkedIn vb. için) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={canonicalUrl} />
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
