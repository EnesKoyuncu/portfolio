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
import { useQuery } from "@tanstack/react-query";
import { Texts, IMetaTagsLanguageSupport, metaTags } from "../data/contactData";
import LoadingSpin from "./miniComponents/LoadingSpin";
import ErrorComponent from "./miniComponents/ErrorComponent";

type SubmitStatus = "success" | "error" | "idle";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const { currentLanguage } = useLanguage(); // Dil bilgisini al
  const { theme } = useTheme();

  const metaTagsText =
    metaTags[currentLanguage as keyof IMetaTagsLanguageSupport];

  const {
    data: texts,
    isLoading,
    error,
  } = useQuery<Texts>({
    queryKey: ["contactTexts", currentLanguage],
    queryFn: () => fetchTexts(currentLanguage),
  });

  const fetchTexts = async (language: string): Promise<Texts> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/texts/contact/${language}`
    );
    const data = await response.json();
    if (data.success) {
      return data.translations;
    } else {
      throw new Error(data.message || "Failed to fetch texts");
    }
  };

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

  if (isLoading) {
    return <LoadingSpin mainContainerName="contact-container" />;
  }

  if (error) {
    return (
      <ErrorComponent
        errorMessage={error.message}
        onRetry={() => fetchTexts(currentLanguage)}
      />
    );
  }

  return (
    <div className={`contact-container-${theme}`}>
      <SEO
        title={metaTagsText.title}
        description={metaTagsText.description}
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={metaTagsText.keywords}
      />
      <h1 className="visually-hidden">
        {currentLanguage === "en"
          ? "Contact"
          : currentLanguage === "tr"
          ? "İletişim"
          : "Kontakt"}
      </h1>
      {/* Sol taraf: Linkler */}
      <div className="contact-links">
        <h2>{texts?.titleLinks || "Bağlantılarım"}</h2>
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
        <h2>{texts?.titleForm || "İletişim Formu"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={texts?.namePlaceholder || "Adınız"}
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={submitting}
          />
          <input
            type="email"
            name="email"
            placeholder={texts?.emailPlaceholder || "E-posta Adresiniz"}
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={submitting}
          />
          <textarea
            name="message"
            placeholder={texts?.messagePlaceholder || "Mesajınız"}
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={submitting}
          ></textarea>
          <button type="submit" disabled={submitting}>
            {submitting ? (
              <Spin size="small" style={{ marginRight: "8px" }} />
            ) : null}
            {texts?.submitButton || "Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
