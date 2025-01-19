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
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

interface TimelineEntry {
  date: string;
  icon: string;
  title: string;
  subtitle: string;
  description?: string;
}

export default function About() {
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  const [currentInterests, setCurrentInterests] = useState<string[]>([]);
  const { currentLanguage } = useLanguage();
  const [labels, setLabels] = useState({
    technologiesLabel: "",
    currentInterestsLabel: "",
    timelineLabel: "",
  });

  // Fetch timeline data
  const fetchTimelineData = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/about/timeline/about/${language}`
      );
      const dataTimeline = await response.json();
      if (dataTimeline.success) {
        setTimelineData(dataTimeline.data);
      } else {
        console.error("Failed to fetch timeline:", dataTimeline.message);
      }
    } catch (error) {
      console.error("Error fetching timeline data:", error);
    }
  };

  // Fetch current interests
  const fetchCurrentInterests = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/about/interests/about/${language}`
      );
      const data = await response.json();
      if (data.success) {
        setCurrentInterests(data.data.interests);
      } else {
        console.error("Failed to fetch interests:", data.message);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };

  const fetchLabels = async (language: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/about/labels/${language}`
      );
      const data = await response.json();
      console.log("Labels data:", data);
      if (data.success) {
        setLabels(data.labels); // Gelen başlıkları state'e kaydediyoruz
        console.log("Labels anlık:", labels);
      } else {
        console.error("Failed to fetch labels:", data.message);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  // Dil değiştiğinde veri çek
  useEffect(() => {
    const fetchData = async () => {
      await fetchTimelineData(currentLanguage); // Timeline verisini al
      await fetchCurrentInterests(currentLanguage); // İlgi alanlarını al
      await fetchLabels(currentLanguage); // Başlıkları al
    };
    fetchData();
  }, [currentLanguage]); //

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
        <h2>{labels.technologiesLabel}</h2>
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
        <h2>{labels.timelineLabel}</h2>
        <VerticalTimeline>
          {timelineData.map((entry, index) => (
            <VerticalTimelineElement
              key={index}
              className={
                entry.icon === "graduationCap"
                  ? "vertical-timeline-element--education"
                  : "vertical-timeline-element--work"
              }
              date={entry.date}
              icon={
                entry.icon === "graduationCap" ? (
                  <FontAwesomeIcon icon={faGraduationCap} />
                ) : (
                  <FontAwesomeIcon icon={faBriefcase} />
                )
              }
            >
              <h3 className="vertical-timeline-element-title">{entry.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">
                {entry.subtitle}
              </h4>
              {entry.description && <p>{entry.description}</p>}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {/* Sağ Alt Kısım: Güncel İlgi Alanları */}
        <div className="current-interests">
          <h2>{labels.currentInterestsLabel}</h2>
          <ul>
            {currentInterests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
