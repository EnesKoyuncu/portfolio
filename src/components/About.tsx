import "../css/about.css";
import profilePic from "/img/pp2kARE.jpg";
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
  return (
    <div className="about-main">
      {/* Sol taraf: Profil ve kısa tanıtım */}
      <div className="about-left">
        <div className="about-card">
          <div className="about-card-top">
            <img src={profilePic} alt="Profile" />
          </div>
          <div className="about-card-bottom">
            <h2>Enes Ertuğrul Koyuncu</h2>
            <h3>Software Engineer</h3>
            <p data-icon="📍">İzmir, Türkiye</p>
            <p data-icon="🎓">
              Celal Bayar Üniversitesi - Yazılım Mühendisliği
            </p>
            <p data-icon="💻">Frontend & Backend Developer</p>
            <p data-icon="🎯">
              Global projelerde yer almak ve kendimi geliştirmek istiyorum.
            </p>
          </div>
        </div>
      </div>

      {/* Sağ taraf: Zaman Çizelgesi ve Teknolojiler */}
      <div className="about-right">
        <h2>Zaman Çizelgesi</h2>
        <VerticalTimeline>
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

        <h2>Kullandığım Teknolojiler</h2>
        <div className="tech-stack">
          <span>React.js</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>Python</span>
          <span>Tailwind CSS</span>
          <span>Git & GitHub</span>
          <span>Docker</span>
          <span>MongoDB</span>
          <span>GraphQL</span>
          <span>Firebase</span>
        </div>
      </div>
    </div>
  );
}
