import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // Context sağlayıcıyı ekledik
import "./App.css";
import Header from "./components/Header";
import Layout from "./components/layout";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import CvView from "./components/CvView";
import About from "./components/About";
// import Blog from "./components/Blog";
// import Contact from "./components/Contact";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/cv" element={<CvView />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
