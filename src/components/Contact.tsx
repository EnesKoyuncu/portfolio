import React, { useState, useEffect } from "react";
import "../css/contact.scss";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";

import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Spin, message } from "antd";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface Texts {
  titleLinks: string;
  titleForm: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
}

type SubmitStatus = "success" | "error" | "idle";

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
    title: "İletişim - Enes Ertuğrul Koyuncu İletişim Sayfası",
    description:
      "Enes Ertuğrul Koyuncu İletişim sayfası, birçok sosyal medya. platform, gmail veya iletişim formu üzerinden bana ulaşabilir ve sitem hakkında bana görüşlerinizi bildirebilirsiniz. Site hakkındaki görüşleriniz benim için önemli.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Portföy",
      "Mühendis",
      "İletişim",
      "İletişim Formu",
      "Github Sayfası",
      "Linkedin Sayfası",
      "Mail Adresi",
      "Twitter Sayfası",
    ],
  },
  en: {
    title: "Contact - Enes Ertuğrul Koyuncu Contact Page",
    description:
      "Enes Ertugrul Koyuncu Contact page, many social media. platform, you can reach me via gmail or contact form and you can give me your opinions about my site. Your opinions about the site are important to me.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Portfolio",
      "Engineer",
      "Contact",
      "Contact Form",
      "Github Page",
      "Linkedin Page",
      "Mail Address",
      "Twitter Page",
    ],
  },
  de: {
    title: "Kontakt - Enes Ertuğrul Koyuncu Kontaktseite",
    description:
      "Enes Ertuğrul Koyuncu Kontaktseite, viele soziale Medien. Plattform, können Sie mich über gmail oder Kontaktformular erreichen und Sie können mir Ihre Meinung über meine Website geben. Ihre Meinungen über die Seite sind mir wichtig.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Entwickler",
      "Portfolio",
      "Ingenieur",
      "Kontakt",
      "Kontaktformular",
      "Github-Seite",
      "Linkedin-Seite",
      "E-Mail-Adresse",
      "Twitter-Seite",
    ],
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [texts, setTexts] = useState<Texts>({
    titleLinks: "",
    titleForm: "",
    namePlaceholder: "",
    emailPlaceholder: "",
    messagePlaceholder: "",
    submitButton: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const { currentLanguage } = useLanguage(); // Dil bilgisini al
  const { theme } = useTheme();

  const fetchTexts = async (language: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/texts/contact/${language}`
      );
      const data = await response.json();
      if (data.success) {
        setTexts(data.translations);
      } else {
        console.error("Failed to fetch texts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts(currentLanguage);
  }, [currentLanguage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  // Show message based on submit status
  useEffect(() => {
    if (submitStatus === "success") {
      message.success("Message sent successfully!");
    } else if (submitStatus === "error") {
      message.error("Failed to send message. Please try again.");
    }
  }, [submitStatus]);

  if (loading) {
    return (
      <div
        className={`contact-container-${theme}`}
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
    <div className={`contact-container-${theme}`}>
      <SEO
        title={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].title
        }
        description={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport]
            .description
        }
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={
          metaTags[currentLanguage as keyof IMetaTagsLanguageSupport].keywords
        }
      />
      <h1 className="visually-hidden">
        {" "}
        {currentLanguage === "en"
          ? "Contact"
          : currentLanguage === "tr"
          ? "İletişim"
          : "Kontakt"}{" "}
      </h1>
      {/* Sol taraf: Linkler */}
      <div className="contact-links">
        <h2>{texts.titleLinks || "Bağlantılarım"}</h2>
        <ul>
          <li>
            <a
              href="https://github.com/EnesKoyuncu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} /> EnesKoyuncu
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/eneskoyuncu5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} /> eneskoyuncu5
            </a>
          </li>
          <li>
            <a
              href="mailto:enes.koyuncu5507@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faEnvelope} /> enes.koyuncu5507@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://x.com/Enes_Koyuncu5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} /> Enes_Koyuncu5
            </a>
          </li>
        </ul>
      </div>

      {/* Sağ taraf: İletişim Formu */}
      <div className="contact-form">
        <h2>{texts.titleForm || "İletişim Formu"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={texts.namePlaceholder || "Adınız"}
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={submitting}
          />
          <input
            type="email"
            name="email"
            placeholder={texts.emailPlaceholder || "E-posta Adresiniz"}
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={submitting}
          />
          <textarea
            name="message"
            placeholder={texts.messagePlaceholder || "Mesajınız"}
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={submitting}
          ></textarea>
          <button type="submit" disabled={submitting}>
            {submitting ? (
              <Spin size="small" style={{ marginRight: "8px" }} />
            ) : null}
            {texts.submitButton || "Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
