interface IMetaTags {
  title: string;
  description: string;
  keywords?: string[];
}

export interface IMetaTagsLanguageSupport {
  tr: IMetaTags;
  en: IMetaTags;
  de: IMetaTags;
}

export const metaTags: IMetaTagsLanguageSupport = {
  tr: {
    title: "Hakkımda - Enes Ertuğrul Koyuncu'nun Bilgi Sayfası",
    description:
      "Enes Ertuğrul Koyuncu hakkında bilgiler, eğitim ve iş deneyimi zaman çizelgesi, güncel ilgi alanları, kullandığı teknolojiler ve daha fazlası.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Mühendis",
      "Web Geliştirici",
      "React",
      "NextJS",
      "NodeJS",
      "Python",
      "Tailwind CSS",
      "Git & GitHub",
      "Docker",
      "MongoDB",
      "GraphQL",
      "Firebase",
      "Zaman Çizelgesi",
      "Eğitim ve İş Hayatı",
      "Güncel İlgi Alanları",
    ],
  },
  en: {
    title: "About Me - Enes Ertuğrul Koyuncu's Informations Page",
    description:
      "Information about Enes Ertugrul Koyuncu, education and work experience timeline, current interests, technologies used and more.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Engineer",
      "Web Developer",
      "React",
      "NextJS",
      "NodeJS",
      "Python",
      "Tailwind CSS",
      "Git & GitHub",
      "Docker",
      "MongoDB",
      "GraphQL",
      "Firebase",
      "Timeline",
      "Education and Work Experiences",
      "Current Interests",
    ],
  },
  de: {
    title: "Über mich - Enes Ertugrul Koyuncu's Informationsseite",
    description:
      "Informationen über Enes Ertugrul Koyuncu, seine Ausbildung und Berufserfahrung, aktuelle Interessen, eingesetzte Technologien und vieles mehr.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software-Ingenieur",
      "Entwickler",
      "Ingenieur",
      "Web-Entwickler",
      "React",
      "NextJS",
      "NodeJS",
      "Python",
      "Tailwind CSS",
      "Git & GitHub",
      "Docker",
      "MongoDB",
      "GraphQL",
      "Firebase",
      "Zeitleiste",
      "Ausbildung und Arbeitsleben",
      "Aktuelle Interessen",
    ],
  },
};
