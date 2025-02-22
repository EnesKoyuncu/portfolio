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
    title: "CV - Enes Ertugrul Koyuncu'nun  CV Sayfası",
    description:
      "Enes Ertuğrul Koyuncu'nun CV sayfası. CV'imi inceleyebilir ve ayrıntılar hakkında benimle iletişime geçebilirsiniz. CV'm hakkında geri bildirimlerinizi bekliyorum.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "CV",
      "Portfolyo",
      "Tecrübelerim",
    ],
  },
  en: {
    title: "CV - Enes Ertugrul Koyuncu's CV Page",
    description:
      "Enes Ertuğrul Koyuncu's CV page. You can review my CV and contact me for more details. I am waiting for your feedback about my CV. For more information, you can contact me.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Developer",
      "Portfolio",
      "CV",
      "Experiences",
    ],
  },
  de: {
    title: "CV - Enes Ertugrul Koyuncu's CV Seite",
    description:
      "Enes Ertuğrul Koyuncu's Lebenslauf Seite. Sie können meinen Lebenslauf einsehen und mich für weitere Details kontaktieren",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software-Ingenieur",
      "Entwickler",
      "Portfolio",
      "CV",
      "Erfahrungen",
    ],
  },
};
