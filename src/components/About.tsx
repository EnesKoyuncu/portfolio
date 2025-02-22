import "../css/about.scss";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import SEO from "./SEO";

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

import { IMetaTagsLanguageSupport, metaTags } from "../data/aboutData";
import { useQuery } from "@tanstack/react-query";
import LoadingSpin from "./miniComponents/LoadingSpin";
import ErrorComponent from "./miniComponents/ErrorComponent";

interface TimelineEntry {
  date: string;
  icon: string;
  title: string;
  subtitle: string;
  description?: string;
}
interface Ilabels {
  technologiesLabel: string;
  currentInterestsLabel: string;
  timelineLabel: string;
}

export default function About() {
  // const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  // const [currentInterests, setCurrentInterests] = useState<string[]>([]);
  const { currentLanguage } = useLanguage();
  const { theme } = useTheme();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [labels, setLabels] = useState({
  //   technologiesLabel: "",
  //   currentInterestsLabel: "",
  //   timelineLabel: "",
  // });

  const metaTagsText =
    metaTags[currentLanguage as keyof IMetaTagsLanguageSupport];

  // * Fetch Parts -  Timeline Data, Current Interests, Labels
  const fetchTimelineData = async (language: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/about/timeline/about/${language}`
    );
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch timeline data");
    }
  };

  const fetchCurrentInterests = async (language: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/about/interests/about/${language}`
    );
    const data = await response.json();
    if (data.success && data.data && Array.isArray(data.data.interests)) {
      return data.data.interests;
    } else {
      throw new Error("Invalid interests data structure");
    }
  };

  const fetchLabels = async (language: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/about/labels/${language}`
    );
    const data = await response.json();
    if (data.success) {
      return data.labels;
    } else {
      throw new Error(data.message || "Failed to fetch labels");
    }
  };

  // * query parts - timelineData, currentInterests, labels
  const {
    data: timelineData,
    isLoading: timelineLoading,
    error: timelineError,
  } = useQuery<TimelineEntry[]>({
    queryKey: ["timelineData", currentLanguage],
    queryFn: () => fetchTimelineData(currentLanguage),
  });

  const {
    data: currentInterests,
    isLoading: interestsLoading,
    error: interestsError,
  } = useQuery<string[]>({
    queryKey: ["currentInterests", currentLanguage],
    queryFn: () => fetchCurrentInterests(currentLanguage),
  });

  const {
    data: labels,
    isLoading: labelsLoading,
    error: labelsError,
  } = useQuery<Ilabels>({
    queryKey: ["labels", currentLanguage],
    queryFn: () => fetchLabels(currentLanguage),
  });

  const technologies = [
    { name: "React.js", image: "/img/technologies/DALLE-React-bg.webp" },
    { name: "Next.js", image: "/img/technologies/DALLE-Next-bg.webp" },
    { name: "Node.js", image: "/img/technologies/DALLE-Node-bg1.webp" },
    { name: "Python", image: "/img/technologies/DALLE-Python-bg1.webp" },
    { name: "Tailwind CSS", image: "/img/technologies/DALLE-Tailwind-bg.webp" },
    { name: "Git & GitHub", image: "/img/technologies/DALLE-Github-bg.webp" },
    { name: "Docker", image: "/img/technologies/DALLE-Docker-bg.webp" },
    { name: "MongoDB", image: "/img/technologies/DALLE-Mongo-bg.webp" },
    { name: "GraphQL", image: "/img/technologies/DALLE-Graphql-bg.webp" },
    { name: "Firebase", image: "/img/technologies/DALLE-Firebase-bg.webp" },
  ];

  if (timelineLoading || interestsLoading || labelsLoading) {
    return <LoadingSpin mainContainerName="about-main" />;
  }

  if (timelineError || interestsError || labelsError) {
    return (
      <ErrorComponent
        errorMessage={
          timelineError?.message ||
          interestsError?.message ||
          labelsError?.message ||
          "An error occurred while fetching data."
        }
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={`about-main-${theme}`}>
      <SEO
        title={metaTagsText.title}
        description={metaTagsText.description}
        image="/img/file.webp"
        author="Enes Ertuğrul Koyuncu"
        publisher="Enes Ertuğrul Koyuncu"
        keywords={metaTagsText.keywords}
      />
      <h1 className="visually-hidden">Enes Ertuğrul Koyuncu</h1>
      {/* Sol taraf: Kullandığım Teknolojiler */}
      <div className="about-left">
        <h2>{labels?.technologiesLabel}</h2>
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
        <h2>{labels?.timelineLabel}</h2>
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
          <h2>{labels?.currentInterestsLabel}</h2>
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
