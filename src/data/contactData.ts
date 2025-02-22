// src/data/contactData.ts

export interface Texts {
  titleLinks: string;
  titleForm: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
}

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
