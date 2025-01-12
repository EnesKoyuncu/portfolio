import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import CvView from "./components/CvView";
import Layout from "./components/layout";
import About from "./components/About";
function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cv" element={<CvView />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
