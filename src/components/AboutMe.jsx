import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaNodeJs, FaHtml5, FaCss3Alt, FaDatabase, FaGithub } from "react-icons/fa";
import { SiDjango, SiJavascript, SiPostgresql, SiFirebase, SiGoogleads, SiSanity } from "react-icons/si";


// Animation variants for staggered skills
const skillsVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 }
  }),
};

const skills = [
  { icon: <FaReact className="text-2xl" />, name: "React", color: "text-blue-400" },
  { icon: <SiDjango className="text-2xl" />, name: "Django", color: "text-green-400" },
  { icon: <SiJavascript className="text-2xl" />, name: "JavaScript", color: "text-yellow-400" },
  { icon: <FaPython className="text-2xl" />, name: "Python", color: "text-blue-600" },
  { icon: <FaNodeJs className="text-2xl" />, name: "Node.js", color: "text-green-600" },
  { icon: <FaHtml5 className="text-2xl" />, name: "HTML5", color: "text-orange-500" },
  { icon: <FaCss3Alt className="text-2xl" />, name: "CSS3", color: "text-blue-500" },
  { icon: <FaDatabase className="text-2xl" />, name: "SQL/NoSQL", color: "text-indigo-400" },
  { icon: <FaGithub className="text-2xl" />, name: "GitHub", color: "text-gray-300" },
  { icon: <SiPostgresql className="text-2xl" />, name: "PostgreSQL", color: "text-blue-400" },
  { icon: <SiFirebase className="text-2xl" />, name: "Firebase", color: "text-yellow-500" },
  { icon: <SiGoogleads className="text-2xl" />, name: "Google Ads", color: "text-green-500" },
  { icon: <SiSanity className="text-2xl" />, name: "SanityIO", color: "text-red-400" },
];

export default function AboutMe() {
  const [bio, setBio] = useState("");

  // Use proxy in development, full URL in production
  const API_URL = import.meta.env.DEV ? "" : "https://portfoliobackend-5mtm.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/api/about/`)
      .then(res => res.json())
      .then(data => {
        setBio(data.bio || "Backend se data load ho raha hai...");
      })
      .catch(err => {
        console.error("Error fetching bio:", err);
        setBio("Backend se data load karne me problem aayi.");
      });
  }, [API_URL]);

  return (
    <section
      id="about"
      className="py-20 flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto"
    >
      {/* Profile Image with hover effect */}
      <motion.img
        src="https://avatars.githubusercontent.com/u/152030460?s=400&u=8179ed5ade0e60d5bb048ac00b8e87396ef55274&v=4"
        alt="Chaitanya Bajaj"
        className="w-40 h-40 rounded-full border-4 border-purple-400 shadow-lg object-cover mb-6 md:mb-0"
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        whileHover={{ rotate: [0, 8, -8, 0], scale: 1.07, transition: { duration: 0.6 } }}
      />

      {/* About Content */}
      <motion.div
        className="flex-1"
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120, delay: 0.2 }}
      >
        {/* Animated Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ x: -60, opacity: 0, scale: 0.8 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          About Me
        </motion.h2>

        {/* Bio from backend */}
        <motion.p
          className="text-lg text-gray-200 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {bio}
        </motion.p>

        <motion.p
          className="text-md text-gray-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Coding is not just my profession, it's my passion. I enjoy working with new technologies, collaborating in teams, and constantly learning to improve my skills.
        </motion.p>

        {/* Skills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-4"
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-3">My Tech Stack:</h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.name}
                className={`flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg shadow font-semibold ${skill.color} cursor-pointer`}
                custom={i}
                variants={skillsVariant}
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 4px 24px 0 rgba(80,80,255,0.18)",
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
                whileTap={{ scale: 0.97 }}
              >
                {skill.icon} {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
