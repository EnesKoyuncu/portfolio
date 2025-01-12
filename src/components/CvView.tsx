import "../css/CvView.css";

export default function CvView() {
  return (
    <div className="cv-container">
      <div className="cv-pdf">
        <iframe
          src="/pdf/EnesErtugrulKoyuncu-CV-ENG-V2.pdf"
          width="100%"
          height="100%"
          title="CV"
        />
      </div>
      <div className="cv-notes">
        <h2>Hakkımda</h2>
        <p>
          Merhaba! Ben Enes Ertuğrul Koyuncu. Celal Bayar Üniversitesi Yazılım
          Mühendisliği mezunuyum ve frontend geliştirme konusunda uzmanlaşmış
          bir yazılım mühendisiyim. Özellikle React.js, Next.js, Tailwind CSS,
          Leaflet.js gibi araçlarla projeler geliştiriyorum.
        </p>
        <p>
          Üniversite yıllarımda Kanada merkezli Codezy Inc.'de staj yapma ve
          projelere liderlik etme fırsatı yakaladım. Özellikle harita sistemleri
          üzerinde çalışarak React ve Leaflet kullanarak etkileşimli projeler
          geliştirdim.
        </p>
        <p>
          Python ile veri analizi ve web scraping projelerinde de deneyimim var.
          Şu anda global projelerde yer almayı ve frontend alanında kariyerime
          devam etmeyi hedefliyorum.
        </p>
        <p>
          İletişim için bana{" "}
          <a href="https://www.linkedin.com/in/eneskoyuncu5/" target="_blank">
            LinkedIn
          </a>{" "}
          veya{" "}
          <a href="https://github.com/EnesKoyuncu" target="_blank">
            GitHub
          </a>{" "}
          üzerinden ulaşabilirsiniz.
        </p>
      </div>
    </div>
  );
}
