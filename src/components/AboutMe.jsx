import { motion } from "framer-motion";
import {
  FaReact, FaPython, FaNodeJs, FaHtml5, FaCss3Alt, FaDatabase, FaGithub
} from "react-icons/fa";
import {
  SiDjango, SiJavascript, SiPostgresql, SiFirebase, SiGoogleads, SiSanity, SiAngular, SiReact, SiTypescript
} from "react-icons/si";

// Animation for skills
const skillsVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 }
  }),
};

// Tech stack list
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
  { icon: <SiAngular className="text-2xl" />, name: "Angular", color: "text-red-500" },
  { icon: <SiTypescript className="text-2xl" />, name: "TypeScript", color: "text-blue-500" },
];

// Timeline events
const timelineData = [
  { year: "2025", title: "Angular, React Native & TypeScript", description: "Building cross-platform apps with Angular, React Native, and TypeScript." },
  { year: "2024", title: "React.js & Django REST Framework", description: "Built full-stack apps integrating REST APIs, explored Angular." },
  { year: "2023", title: "Full-Stack Developer", description: "Created multiple full-stack projects with React, Django, and Node.js." },
  { year: "2022", title: "Frontend Developer", description: "Specialized in responsive design, animations, and UI/UX improvements." },
  { year: "2021", title: "Python Developer", description: "Worked on automation, APIs, and backend logic using Python and Django." },
  { year: "2020", title: "Started Coding Journey", description: "Began learning programming fundamentals and building small projects." },
];

export default function AboutMe() {
  const bio = "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable applications and solving complex problems through code. With experience in both frontend and backend development, I enjoy building complete solutions from concept to deployment.";

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Profile + Bio */}
        <div>
          <motion.img
            src="https://avatars.githubusercontent.com/u/152030460?s=400&u=8179ed5ade0e60d5bb048ac00b8e87396ef55274&v=4"
            alt="Chaitanya Bajaj"
            className="w-44 h-44 rounded-full border-4 border-purple-400 shadow-lg object-cover mb-6"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{ rotate: [0, 8, -8, 0], scale: 1.07 }}
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>

          <p className="text-lg text-gray-200 mb-4">{bio}</p>
          <p className="text-md text-gray-400 mb-8">
            Coding is not just my profession, it's my passion. I enjoy working with new technologies, collaborating in teams, and constantly learning to improve my skills.
          </p>

          {/* Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-100 mb-3">My Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  className={`flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg shadow font-semibold ${skill.color}`}
                  custom={i}
                  variants={skillsVariant}
                  whileHover={{
                    scale: 1.12,
                    boxShadow: "0 4px 24px rgba(80,80,255,0.18)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.icon} {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Attractive Alternating Timeline */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-purple-300">My Journey</h3>
          <div className="relative border-l-4 border-purple-400">
            {timelineData.map((item, i) => (
              <motion.div
                key={i}
                className={`mb-12 ml-6 relative ${i % 2 === 0 ? "md:ml-6 md:mr-20" : "md:ml-20 md:mr-6"} `}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Year badge */}
                <div className="absolute -left-[46px] w-12 h-12 flex items-center justify-center bg-purple-500 rounded-full text-white font-bold shadow-lg">
                  {item.year}
                </div>
                <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
