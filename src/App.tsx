import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // Context sağlayıcıyı ekledik

import "./App.css";

// components
import Header from "./components/Header";
import Layout from "./components/layout";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import CvView from "./components/CvView";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/cv" element={<CvView />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Header />
          <AnimatedRoutes />
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
