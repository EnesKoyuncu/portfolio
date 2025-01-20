import React, { useState, useEffect } from "react";
import "../css/contact.css";
import {
  faGithub,
  faLinkedin,
  faDiscord,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../context/LanguageContext"; // Dil Context'i

interface Texts {
  titleLinks: string;
  titleForm: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
}

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

  const { currentLanguage } = useLanguage(); // Dil bilgisini al

  const fetchTexts = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/texts/contact/${language}`
      );
      const data = await response.json();
      if (data.success) {
        setTexts(data.translations); // Çevirileri state'e ata
      } else {
        console.error("Çeviriler bulunamadı:", data.message);
      }
    } catch (error) {
      console.error("Çevirileri çekerken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchTexts(currentLanguage); // Dil değişiminde çevirileri güncelle
  }, [currentLanguage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
      alert("Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="contact-container">
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
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/eneskoyuncu5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} /> nsk
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
          />
          <input
            type="email"
            name="email"
            placeholder={texts.emailPlaceholder || "E-posta Adresiniz"}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder={texts.messagePlaceholder || "Mesajınız"}
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">{texts.submitButton || "Gönder"}</button>
        </form>
      </div>
    </div>
  );
}
