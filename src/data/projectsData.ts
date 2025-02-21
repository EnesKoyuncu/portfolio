interface IAriaLabels {
  imageTitle: string;
  expandButton: string;
  viewProject: string;
  noProjectsFound: string; // aria-label değil ekstra interface ve yapı kurmak istemedim, ilerde değişebilir.
  h1VisuallyHidden: string;
  h2VisuallyHidden: string;
}

export interface IAriaLabelsLanguageSupport {
  tr: IAriaLabels;
  en: IAriaLabels;
  de: IAriaLabels;
}

export const ariaLabels: IAriaLabelsLanguageSupport = {
  tr: {
    imageTitle: "Proje Resmi",
    expandButton: "Detayları Gör",
    viewProject: "Projeyi Görüntüle",
    noProjectsFound: "Proje bulunamadı",
    h1VisuallyHidden: "Merhaba",
    h2VisuallyHidden: "Projeler sayfama hoş geldiniz!",
  },
  en: {
    imageTitle: "Project Image",
    expandButton: "View Details",
    viewProject: "View Project",
    noProjectsFound: "No projects found",
    h1VisuallyHidden: "Hello",
    h2VisuallyHidden: "Welcome to my projects page!",
  },
  de: {
    imageTitle: "Projekt Bild",
    expandButton: "Details anzeigen",
    viewProject: "Projekt anzeigen",
    noProjectsFound: "Keine Projekte gefunden",
    h1VisuallyHidden: "Hallo",
    h2VisuallyHidden: "Willkommen auf meiner Projekte-Seite!",
  },
};

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
    title: "Projeler - Enes Ertuğrul Koyuncu",
    description:
      "Enes Ertuğrul Koyuncu'nun çalıştığı projeler. Proje detaylarının yer aldığı sayfa. Projelerimi inceleyebilir ve benimle iletişime geçebilirsiniz.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Portföy",
      "Mühendis",
      "React",
      "NextJS",
      "Ön uç geliştirici",
      "Arka uç geliştirici",
      "Projeler",
      "Web Projeleri",
    ],
  },
  en: {
    title: "Projects - Enes Ertuğrul Koyuncu",
    description:
      "Projects Enes Ertuğrul Koyuncu has worked on. The page with project details. You can review my projects and contact me and also you can share your feedbacks.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Full Stack Developer",
      "Web Developer",
      "Engineer",
      "React",
      "NextJS",
      "Projects",
      "Web Projects",
      "Frontend Developer",
      "Backend Developer",
    ],
  },
  de: {
    title: "Projekte - Enes Ertuğrul Koyuncu",
    description:
      "Projekte, an denen Enes Ertuğrul Koyuncu gearbeitet hat. Die Seite mit den Projektdetails. Sie können meine Projekte überprüfen und mich kontaktieren.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software-Ingenieur",
      "Entwickler",
      "Full-Stack-Entwickler",
      "Ingenieur",
      "React",
      "NextJS",
      "Frontend-Entwickler",
      "Backend-Entwickler",
      "Geschäftsbereich",
    ],
  },
};
