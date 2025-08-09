import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Certification from "./components/Certification";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Maintenance from "./components/Maintenance"; // <-- NEW IMPORT

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] text-white font-sans">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                <Hero />
                <AboutMe />
                <Certification />
                <Projects />
                <Contact />
              </main>
            }
          />

          {/* Blog Page */}
          <Route path="/blog" element={<Blog />} />

          {/* Maintenance Page */}
          <Route path="/maintenance" element={<Maintenance />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
