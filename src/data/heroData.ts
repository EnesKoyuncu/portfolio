interface IHeroAriaLabels {
  linkedin: string;
  github: string;
  medium: string;
  cv: string;
  projects: string;
}

export interface IHeroAriaLabelsLanguageSupport {
  tr: IHeroAriaLabels;
  en: IHeroAriaLabels;
  de: IHeroAriaLabels;
}

export const heroAriaLabels: IHeroAriaLabelsLanguageSupport = {
  tr: {
    linkedin: "Linkedin Sayfası",
    github: "Github Sayfası",
    medium: "Medium Sayfası",
    cv: "CV Sayfası",
    projects: "Projeler Sayfası",
  },
  en: {
    linkedin: "Linkedin Page",
    github: "Github Page",
    medium: "Medium Page",
    cv: "CV Page",
    projects: "Projects Page",
  },
  de: {
    linkedin: "Linkedin Seite",
    github: "Github Seite",
    medium: "Medium Seite",
    cv: "CV Seite",
    projects: "Projekte Seite",
  },
};

export interface IMetaTags {
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
    title: "Enes Ertuğrul Koyuncu Kişisel Web Sitesi",
    description:
      "Enes Ertuğrul Koyuncu'nun kişisel web sitesi. Yazılım Mühendisi, Full Stack Developer ve Blogger. Projelerimi, blog yazılarımı inceleyin ve benimle iletişime geçin.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Portfolyo",
      "Blog",
      "Full Stack Developer",
      "Portföy",
      "Developer",
      "Mühendis",
      "React",
      "Ön uç geliştirici",
      "Arka uç geliştirici",
    ],
  },
  en: {
    title: "Enes Ertuğrul Koyuncu Portfolio Website",
    description:
      "Enes Ertuğrul Koyuncu's personal website. Software Engineer, Full Stack Developer, and Blogger. Check out my projects, blog posts, and contact me.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Portfolio",
      "Blog",
      "Full Stack Developer",
      "Portfolio",
      "Developer",
      "Engineer",
      "React",
      "Frontend Developer",
      "Backend Developer",
    ],
  },
  de: {
    title: "Enes Ertugrul Koyuncu Portfolio-Website",
    description:
      "Enes Ertugrul Koyuncu's persönliche Website. Software-Ingenieur, Full-Stack-Entwickler und Blogger. Überprüfen Sie meine Projekte, Blog-Beiträge und kontaktieren Sie mich.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software-Ingenieur",
      "Entwickler",
      "Portfolio",
      "Blog",
      "Full-Stack-Entwickler",
      "Portfolio",
      "Entwickler",
      "Ingenieur",
      "React",
      "Frontend-Entwickler",
      "Backend-Entwickler",
    ],
  },
};
