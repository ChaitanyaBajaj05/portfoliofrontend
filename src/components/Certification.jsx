import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const API_BASE =
  (import.meta.env.VITE_API_URL?.replace(/\/$/, "")) || "http://localhost:8000";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  hover: {
    scale: 1.025,
    boxShadow: "0 8px 32px 0 rgba(80,80,255,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderColor: "#c7d2fe",
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

const imageVariants = {
  hover: {
    rotate: [0, 6, -6, 0],
    scale: 1.08,
    transition: { duration: 0.9, repeat: Infinity, repeatType: "mirror" },
  },
};

export default function Certification() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/certifications/`)
      .then((res) => {
        setCertifications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="certifications" className="py-20 max-w-6xl mx-auto px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-16 text-center bg-gradient-to-r from-purple-400 via-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <FaCertificate className="inline-block mr-2 mb-1 text-blue-400 animate-bounce" />
        Certifications
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-14 h-14 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.certificate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-7 cursor-pointer border border-gray-100 hover:border-blue-200 transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

              <div className="flex items-center gap-6 relative z-10">
                <motion.img
                  src={
                    cert.logo?.startsWith("http")
                      ? cert.logo
                      : `${API_BASE}${cert.logo}`
                  }
                  alt={cert.organization}
                  className="w-16 h-16 object-contain rounded-lg shadow group-hover:shadow-blue-200/40 transition-all duration-300 bg-white p-2 border border-gray-200"
                  variants={imageVariants}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-700 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-base text-blue-500 font-medium mb-1">
                    {cert.organization}
                  </p>
                  <p className="text-xs text-gray-400">
                    Issued:{" "}
                    {new Date(cert.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <div className="ml-auto pl-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-400 shadow">
                    <FaCertificate className="text-md" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
}
