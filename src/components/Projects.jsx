import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const API_BASE = import.meta.env.DEV
  ? ""
  : "https://portfoliobackend-5mtm.onrender.com";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
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
      .catch(() => setLoading(false));
  }, [category]);

  return (
    <section id="projects" className="py-16 px-4 md:px-12 scroll-mt-20 bg-gray-900 text-white">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      {/* Category Filter */}
      <div className="flex justify-center mb-6 md:mb-12 flex-wrap gap-3">
        {/* Mobile Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800/80 border border-blue-500 text-white text-sm rounded-full px-4 py-2 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition md:hidden"
        >
          {categories.map((cat) => (
            <option key={cat.key || "All"} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
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
                    <ProjectCard
                      project={project}
                      navigate={navigate}
                      onLearnMore={setSelectedProject}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div
            className={`hidden md:grid gap-8 ${
              projects.length > 1
                ? "grid-cols-2 lg:grid-cols-3 auto-rows-[420px]"
                : "grid-cols-1"
            }`}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  navigate={navigate}
                  onLearnMore={setSelectedProject}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Modal for Learn More */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-xl max-w-3xl w-full p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Cross Icon */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white text-2xl md:text-3xl font-bold z-50"
              >
                <FaTimes />
              </button>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h2>

              {/* Swiper for multiple images */}
              {selectedProject.additional_images?.length > 0 ? (
                <Swiper
                  spaceBetween={10}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  className="mb-4 rounded-lg"
                >
                  <SwiperSlide>
                    <img
                      src={
                        selectedProject.image?.startsWith("http")
                          ? selectedProject.image
                          : `${API_BASE}${selectedProject.image}`
                      }
                      alt={selectedProject.title}
                      className="w-full max-h-[500px] object-contain rounded-lg"
                    />
                  </SwiperSlide>
                  {selectedProject.additional_images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={
                          img.image?.startsWith("http")
                            ? img.image
                            : `${API_BASE}${img.image}`
                        }
                        alt={`${selectedProject.title} ${idx + 1}`}
                        className="w-full max-h-[500px] object-contain rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={
                    selectedProject.image?.startsWith("http")
                      ? selectedProject.image
                      : `${API_BASE}${selectedProject.image}`
                  }
                  alt={selectedProject.title}
                  className="w-full max-h-[500px] object-contain rounded-lg mb-4"
                />
              )}

              {/* Description */}
              <p className="text-gray-300 mb-4">{selectedProject.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags?.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-5 flex-wrap">
                {selectedProject.github_link && (
                  <a
                    href={selectedProject.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-purple-400 transition"
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {selectedProject.live_link && (
                  <a
                    href={selectedProject.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-green-400 transition"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, navigate, onLearnMore }) {
  const API_BASE = import.meta.env.DEV
    ? ""
    : "https://portfoliobackend-5mtm.onrender.com";
  const isFullStack = project.category === "Full-Stack";

  return (
    <motion.div
      className="flex flex-col h-full group rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
    >
      {/* Image or Swiper */}
      <div className="relative h-[220px] md:h-48 flex items-center justify-center bg-black overflow-hidden">
        {project.additional_images?.length > 0 ? (
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="h-full w-full"
          >
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={
                  project.image?.startsWith("http")
                    ? project.image
                    : `${API_BASE}${project.image}`
                }
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
            {project.additional_images.map((img, idx) => (
              <SwiperSlide key={idx} className="flex items-center justify-center">
                <img
                  src={img.image?.startsWith("http") ? img.image : `${API_BASE}${img.image}`}
                  alt={`${project.title} ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={
              project.image?.startsWith("http")
                ? project.image
                : `${API_BASE}${project.image}`
            }
            alt={project.title}
            onError={(e) => (e.target.src = "/placeholder.png")}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto flex-wrap">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-gray-700/40 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1 rounded-full transition"
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
              className="flex items-center gap-1 bg-green-600/20 hover:bg-green-600 text-green-300 text-xs px-3 py-1 rounded-full transition"
            >
              <FaExternalLinkAlt /> Live
            </button>
          )}
          <button
            onClick={() => onLearnMore(project)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded-full transition shadow-sm shadow-blue-500/30"
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}
