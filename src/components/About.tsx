import "../css/about.scss";
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
import { useTheme } from "../context/ThemeContext";
import { Spin, Button } from "antd";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [labels, setLabels] = useState({
    technologiesLabel: "",
    currentInterestsLabel: "",
    timelineLabel: "",
  });

  const { theme } = useTheme();

  // Fetch timeline data
  const fetchTimelineData = async (language: string) => {
    try {
      console.log(
        "Fetching timeline data from:",
        `${import.meta.env.VITE_API_URL}/api/about/timeline/about/${language}`
      );
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/about/timeline/about/${language}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Timeline response:", data);
      if (data.success) {
        setTimelineData(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch timeline data");
      }
    } catch (error) {
      console.error("Error fetching timeline data:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching timeline data"
      );
    }
  };

  // Fetch current interests
  const fetchCurrentInterests = async (language: string) => {
    try {
      console.log(
        "Fetching interests from:",
        `${import.meta.env.VITE_API_URL}/api/about/interests/about/${language}`
      );
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/about/interests/about/${language}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Interests response:", data);
      if (data.success && data.data && Array.isArray(data.data.interests)) {
        setCurrentInterests(data.data.interests);
      } else {
        console.error("Invalid interests data structure:", data);
        setCurrentInterests([]);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching interests"
      );
      setCurrentInterests([]);
    }
  };

  const fetchLabels = async (language: string) => {
    try {
      console.log(
        "Fetching labels from:",
        `${import.meta.env.VITE_API_URL}/api/about/labels/${language}`
      );
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/about/labels/${language}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Labels response:", data);
      if (data.success) {
        setLabels(
          data.labels || {
            technologiesLabel: "Technologies",
            currentInterestsLabel: "What I'm Currently Interested In",
            timelineLabel: "Timeline",
          }
        );
      } else {
        throw new Error(data.message || "Failed to fetch labels");
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching labels"
      );
    }
  };

  // Dil değiştiğinde veri çek
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchTimelineData(currentLanguage),
          fetchCurrentInterests(currentLanguage),
          fetchLabels(currentLanguage),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLanguage]);

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

  if (loading) {
    return (
      <div
        className={`about-main-${theme}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`about-main-${theme}`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: "1rem",
        }}
      >
        <p>{error}</p>
        <Button
          onClick={() => {
            setLoading(true);
            setError(null);
            Promise.all([
              fetchTimelineData(currentLanguage),
              fetchCurrentInterests(currentLanguage),
              fetchLabels(currentLanguage),
            ]).finally(() => setLoading(false));
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`about-main-${theme}`}>
      {/* Sol taraf: Kullandığım Teknolojiler */}
      <div className="about-left">
        <h2>{labels.technologiesLabel}</h2>
        <div className="tech-stack-grid">
          {technologies?.map((tech, index) => (
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
          {timelineData?.map((entry, index) => (
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
            {currentInterests?.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
