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
          Mühendisliği mezunuyum ve web geliştirme konusunda uzmanlaşmaya
          çalışan bir yazılım mühendisiyim. Özellikle{" "}
          <u>React.js, Next.js, NodeJS, Tailwind CSS, Typescript</u> gibi araç
          ve teknolojilerle projeler geliştiriyorum.
        </p>
        <p>
          Üniversite yıllarımda Kanada merkezli Codezy Inc.'de staj yapma ve
          bazı projeleri üstlenme fırsatı yakaladım. İlk staj sürecimde sosyal
          medya platformlarını{" "}
          <u>next-react js ve firebase, nodejs, mongodb, postgresql</u> gibi
          birçok teknolojiyle klonlamaya çalıştım ayrıca şirketin ana projesi
          olan web tabanlı mimari çizim sitesinde hem frontend hem backend
          tarafında görev aldım.
        </p>
        <p>
          İkinci stajımda ise öncesinde staj yapmış olduğum şirkette bu kez
          frontend ağırlıklı olmak üzere bir{" "}
          <strong>Düzenlenebilir Harita Sistemi</strong> geliştirmeye çalıştım.
          React ve Leaflet js ile kurduğum bu sitede Ant-Design gibi hazır
          UI'lar ile birlikte kendi CSS'lerimi yazdım. Staj sürecimin sonunda
          projeyi kullanıcıların rahatça kullanabileceği bir sistem ve arayüz
          ile bırakmış oldum. Bu harita sistemi projesinde Google Maps'teki
          dünya üzerinde ikonlar, şekiller ekleyebiliyor, bunları
          düzenleyebiliyor, dünya üzerindeki herhangi bir yere not alabiliyor ve
          eklediğiniz her içeriği toplu silebiliyorsunuz. Genel amacı harita
          üzerinde herhangi bir konunun anlatılmasını kolay kılmayı sağlayan
          proje diyebiliriz.
        </p>
        <p>
          Üniversite zamanlarımda ise web projelerinden sonra en çok python ile
          çalışmalar yaptım. Özellikle makine öğrenmesi, doğal dil işleme ve
          veri analizi gibi konularda projeler geliştirdim. Bu projelerde veri
          toplama kısmında gerek anket gerek veri kazıma gibi işlemlerden sonra
          bu verilerin formatlanması, hangi modellerde çalışacağının testleri,
          sonuçları grafiklere dökerek sonuç çıkarma gibi işlemler
          gerçekleştirdim. PyQt5 ile masaüstü uygulaması yazdım.
        </p>

        <p>
          Güncel olarak fullstack developer olarak kendimi geliştirmeye
          çalışıyorum. Bu aşamada önceliğim Next ve Node js olsa da ilerde
          ThreeJs'ten gatsby'e kadar birçok frameworke de bakmayı düşünüyorum.
          Hobi olarak diğer mühendis arkadaşlarımla oyun projesi geliştirmeye
          çalışıyor ve son günlerde llm projelerine göz atmaya çalışıyorum.
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
