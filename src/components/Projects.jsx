import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const API_BASE = import.meta.env.DEV ? "" : "https://portfoliobackend-5mtm.onrender.com";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const categories = [
    { key: "", label: "All" },
    { key: "Python", label: "Python" },
    { key: "Full-Stack", label: "Full-Stack" },
    { key: "Graphic Design", label: "Graphic" },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/projects/${category ? `?category=${category}` : ""}`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <section id="projects" className="py-16 px-4 md:px-12 scroll-mt-20">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      {/* Mobile Dropdown */}
      <div className="flex justify-center mb-8 md:hidden">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800/80 border border-blue-500 text-white text-sm rounded-full px-4 py-2 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {categories.map((cat) => (
            <option key={cat.key || "All"} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Category Buttons */}
      <div className="hidden md:flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key || "All"}
            onClick={() => setCategory(cat.key)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
              category === cat.key
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">No projects yet</div>
      ) : (
        <>
          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
            >
              {projects.map((project, i) => (
                <SwiperSlide key={project.id}>
                  <motion.div
                    className="rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl shadow-2xl border border-gray-700 overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <ProjectCard project={project} navigate={navigate} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div
            className={`hidden md:grid gap-8 ${
              projects.length > 1
                ? "grid-cols-2 lg:grid-cols-3 auto-rows-[350px]"
                : "grid-cols-1"
            }`}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:scale-[1.03] hover:border-blue-500 hover:shadow-blue-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard project={project} navigate={navigate} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function ProjectCard({ project, navigate }) {
  const API_BASE = import.meta.env.DEV ? "" : "https://portfoliobackend-5mtm.onrender.com";
  const isFullStack = project.category === "Full-Stack";

  return (
    <div className="flex flex-col h-full group">
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={project.image.startsWith("http") ? project.image : `${API_BASE}${project.image}`}
          alt={project.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-5 mt-auto">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-300 hover:text-purple-400 transition"
            >
              <FaGithub /> Code
            </a>
          )}
          {isFullStack && (
            <button
              onClick={() =>
                project.live_link
                  ? window.open(project.live_link, "_blank")
                  : navigate("/maintenance")
              }
              className="inline-flex items-center gap-1 text-gray-300 hover:text-green-400 transition"
            >
              <FaExternalLinkAlt /> Live
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
