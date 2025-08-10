import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Use proxy in development, full URL in production
const API_BASE = import.meta.env.DEV ? "" : "https://portfoliobackend-5mtm.onrender.com";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

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
    <section id="projects" className="py-20 scroll-mt-20">
      {/* Section Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {[
          { key: "", label: "All" },
          { key: "Python", label: "Python Projects" },
          { key: "Full-Stack", label: "Full-Stack Projects" },
          { key: "Graphic Design", label: "Graphic Design" },
        ].map((cat) => (
          <motion.button
            key={cat.key || "All"}
            onClick={() => setCategory(cat.key)}
            className={`px-5 py-2 rounded-full font-medium transition-all border ${
              category === cat.key
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                : "text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Loading / Empty State / Projects */}
      {loading ? (
        <div className="text-center text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">No projects yet</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
          {projects.map((project, i) => {
            const isGraphic = project.category === "Graphic Design";
            const isFullStack = project.category === "Full-Stack";

            return (
              <motion.div
                key={project.id}
                className="group bg-white/5 rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-700 hover:border-blue-500 transition-colors"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Project Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={
                      project.image?.startsWith("http")
                        ? project.image
                        : project.image?.startsWith("/")
                        ? `${API_BASE}${project.image}`
                        : `${API_BASE}/media/${project.image}`
                    }
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800";
                    }}
                  />
                </div>

                {/* Project Details */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

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

                  {/* Graphic Design Projects */}
                  {isGraphic ? (
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      {project.additional_images?.length > 0 ? (
                        project.additional_images.map((img, idx) => (
                          <img
                            key={idx}
                            src={
                              img?.startsWith("http")
                                ? img
                                : img?.startsWith("/")
                                ? `${API_BASE}${img}`
                                : `${API_BASE}/media/${img}`
                            }
                            alt={`Design ${idx + 1}`}
                            className="w-full h-28 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src = "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400";
                            }}
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">No extra designs</span>
                      )}
                    </div>
                  ) : (
                    /* Python & Full-Stack Projects */
                    <div className="mt-auto flex gap-4">
                      {/* Code Button */}
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

                      {/* Live Button */}
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
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
} update to this also
