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
    title: "Blog - Enes Ertuğrul Koyuncu'nun Blog Sayfası",
    description:
      "Enes Ertuğrul Koyuncu'nun blog sayfası. Blog yazılarımı inceleyebilir ve benimle iletişime geçebilirsiniz. Ayrıca geri bildirimlerinizi paylaşabilirsiniz. Daha fazla fikir ve öneri için iletişim sayfasından benim ile iletişime geçin.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Yazılım Mühendisi",
      "Geliştirici",
      "Mühendis",
      "Blog",
      "Bilgilendirici Yazılar",
      "TypeScript Blog",
      "React Blog",
      "NextJS Blog",
      "CSS Blog",
      "NodeJS Blog",
      "Açık Kaynak Blog",
    ],
  },
  en: {
    title: "Blog - Enes Ertuğrul Koyuncu's Blog Page",
    description:
      "Enes Ertuğrul Koyuncu's blog page. You can review my blog posts and contact me. You can also share your feedback. For more ideas and suggestions, contact me via the contact page.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Engineer",
      "Developer",
      "Blog",
      "Bilgilendirici Yazılar",
      "TypeScript Blog",
      "React Blog",
      "NextJS Blog",
      "CSS Blog",
      "NodeJS Blog",
      "Açık Kaynak Blog",
    ],
  },
  de: {
    title: "Blog - Enes Ertuğrul Koyuncu's Blog Seite",
    description:
      "Enes Ertuğrul Koyuncu's Blog Seite. Sie können meine Blogbeiträge lesen und mich kontaktieren. Sie können mir auch Ihr Feedback mitteilen. Für weitere Ideen und Vorschläge können Sie mich über die Kontaktseite kontaktieren.",
    keywords: [
      "Enes Ertuğrul Koyuncu",
      "Software Engineer",
      "Entwickler",
      "Ingenieur",
      "Blog",
      "Informative Artikel",
      "TypeScript-Blog",
      "React-Blog",
      "NextJS-Blog",
      "CSS-Blog",
      "NodeJS-Blog",
      "Open Source Blog",
    ],
  },
};

export interface IBlogPost {
  _id: string;
  title: { en: string; tr: string; de: string };
  date: string;
  summary: { en: string; tr: string; de: string };
  keywords: string[];
  image: string;
  content: { en: string; tr: string; de: string };
}
