import "../css/about.css";
import Tilt from "react-parallax-tilt";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

export default function About() {
  const technologies = [
    { name: "React.js", image: "/img/technologies/DALLE-React-bg.jpg" },
    { name: "Next.js", image: "/img/technologies/DALLE-Next-bg.jpg" },
    { name: "Node.js", image: "/img/technologies/DALLE-Node-bg1.jpg" },
    { name: "Python", image: "/img/technologies/DALLE-Python-bg1.jpg" },
    { name: "Tailwind CSS", image: "/img/technologies/DALLE-Tailwind-bg.jpg" },
    { name: "Git & GitHub", image: "/img/technologies/DALLE-Github-bg.jpg" },
    { name: "Docker", image: "/img/technologies/DALLE-Docker-bg.jpg" },
    { name: "MongoDB", image: "/img/technologies/DALLE-Mongo-bg.jpg" },
    { name: "GraphQL", image: "/img/technologies/DALLE-Graphql-bg.jpg" },
    { name: "Firebase", image: "/img/technologies/DALLE-Firebase-bg.jpg" },
  ];

  return (
    <div className="about-main">
      {/* Sol taraf: Kullandığım Teknolojiler */}
      <div className="about-left">
        <h2>Kullandığım Teknolojiler</h2>
        <div className="tech-stack-grid">
          {technologies.map((tech, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={250}
            >
              <div
                className="tech-card"
                style={{
                  backgroundImage: `url(${tech.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span>{tech.name}</span>
              </div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Sağ taraf: Zaman Çizelgesi */}
      <div className="about-right">
        <h2>Zaman Çizelgesi</h2>
        <VerticalTimeline>
          {/* Mezuniyet */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2019 - 2024"
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">
              Yazılım Mühendisliği Mezuniyeti
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Celal Bayar Üniversitesi
            </h4>
          </VerticalTimelineElement>

          {/* Intern */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2022 - 2023"
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Software Engineer Intern
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Codezy Inc.</h4>
            <p>
              Frontend projelerde çalıştım, React, Next.js ve TailwindCSS
              kullandım.
            </p>
          </VerticalTimelineElement>

          {/* Frontend Developer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2024"
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Frontend Developer
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Codezy Inc.</h4>
            <p>
              Editable Map System projesini liderlik ettim, React ve LeafletJS
              kullandım.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>

        {/* Sağ Alt Kısım: Güncel İlgi Alanları */}
        <div className="current-interests">
          <h2>Şu Anda Nelerle İlgileniyorum?</h2>
          <ul>
            <li>Next.js ve React animasyonları üzerine çalışıyorum.</li>
            <li>TypeScript ve backend entegrasyonları öğreniyorum.</li>
            <li>Kişisel projelerime daha fazla zaman ayırıyorum.</li>
            <li>Yeni teknolojiler ve frameworkler araştırıyorum.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
