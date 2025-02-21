import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeProvider";
import { useLanguage } from "./hooks/useLanguage";
import "./App.css";

// Components
import Header from "./components/Header";
import Layout from "./components/layout";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import CvView from "./components/CvView";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const languages = ["tr", "en", "de"];

const queryClient = new QueryClient();

// **Dil Path'lerini Yönetme**
function RedirectToDefaultLanguage() {
  const { currentLanguage } = useLanguage();
  return <Navigate to={`/${currentLanguage}`} replace />;
}

// **Animasyonlu Route'ları Yönetme**
function AnimatedRoutes() {
  const location = useLocation();
  const { currentLanguage } = useLanguage();

  if (!languages.includes(currentLanguage)) {
    return <Navigate to="/en" replace />; // Geçersiz dil kodu varsa /en'ye yönlendir
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Anasayfa */}
        <Route
          path="/:lang"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Hero />
            </motion.div>
          }
        />

        {/* Diğer Sayfalar */}
        <Route
          path="/:lang/cv"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CvView />
            </motion.div>
          }
        />
        <Route
          path="/:lang/projects"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/:lang/about"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/:lang/blog"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Blog />
            </motion.div>
          }
        />
        <Route
          path="/:lang/contact"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Contact />
            </motion.div>
          }
        />

        {/* Eğer herhangi bir dil kodu olmadan erişilirse yönlendirme yap */}
        <Route path="/" element={<RedirectToDefaultLanguage />} />

        {/* Eski site linkleri için yönlendirme yaptık */}
        <Route path="/cv" element={<Navigate to="/en/cv" replace />} />
        <Route
          path="/projects"
          element={<Navigate to="/en/projects" replace />}
        />
        <Route path="/about" element={<Navigate to="/en/about" replace />} />
        <Route path="/blog" element={<Navigate to="/en/blog" replace />} />
        <Route
          path="/contact"
          element={<Navigate to="/en/contact" replace />}
        />
      </Routes>
    </AnimatePresence>
  );
}

// **Ana Uygulama Componenti**
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <Layout>
              <Header />
              <AnimatedRoutes />
            </Layout>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
