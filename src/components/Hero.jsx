import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaArrowDown,
  FaDownload,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Hero() {
  const resumeUrl = "/chaitanyabajajspecialized.pdf";

  const roles = [
    "Full Stack Developer 🚀",
    "React & Django Specialist ⚡",
    "Problem Solver 💡",
    "Creative Coder 🎨",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [showRole, setShowRole] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowRole(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setShowRole(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8
      bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden"
    >
      {/* Animated Background Glow */}
      <BackgroundGlow color="bg-purple-500/30" size={500} duration={20} position="top-left" />
      <BackgroundGlow color="bg-blue-400/20" size={450} duration={22} position="bottom-right" />
      <BackgroundGlow color="bg-pink-400/20" size={400} duration={24} position="top-right" />

      {/* Optional Hero Avatar */}
      {/* <motion.img
        src="/avatar.png"
        alt="Chaitanya Bajaj"
        className="w-40 h-40 rounded-full border-4 border-white/20 shadow-xl mb-6 object-cover"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      /> */}

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <motion.p
          className="text-lg sm:text-xl text-purple-400 font-mono mb-2 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r
          from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent
          drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Chaitanya Bajaj
        </motion.h1>

        {/* Rotating Roles */}
        <AnimatePresence mode="wait">
          {showRole && (
            <motion.p
              key={roleIndex}
              className="mt-4 text-xl sm:text-3xl font-semibold text-gray-200"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                {roles[roleIndex]}
              </span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-lg sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Crafting digital experiences with{" "}
          <span className="text-purple-400 font-semibold">React</span> and{" "}
          <span className="text-blue-400 font-semibold">Django</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 mt-10 justify-center items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <CTAButton
            href="#projects"
            icon={<FaBriefcase className="mr-2" />}
            text="View My Work"
            color="from-purple-500 to-pink-500"
          />
          <CTAButton
            href="#contact"
            icon={<FaEnvelope className="mr-2" />}
            text="Contact Me"
            color="from-blue-500 to-cyan-500"
          />
          <CTAButton
            href={resumeUrl}
            icon={<FaDownload className="mr-2" />}
            text="Download Resume"
            color="from-pink-500 to-purple-600"
            download
          />
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex gap-6 mt-10 justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <SocialButton
            href="https://github.com/chaitanyabajaj05"
            icon={<FaGithub className="w-7 h-7" />}
            color="from-purple-500 to-pink-500"
          />
          <SocialButton
            href="https://linkedin.com/in/chaitanyabajajfsd"
            icon={<FaLinkedin className="w-7 h-7" />}
            color="from-blue-500 to-cyan-500"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/40"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaArrowDown className="w-5 h-5 text-purple-400" />
        </motion.div>
        <span className="text-sm text-gray-400 mt-2 tracking-wider">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}

function CTAButton({ href, icon, text, color, download }) {
  return (
    <motion.a
      href={href}
      download={download}
      whileHover={{ scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative px-6 py-3 rounded-full bg-gradient-to-r ${color} 
      text-white font-semibold shadow-xl hover:shadow-purple-500/50 
      transition-all duration-300 backdrop-blur-md border border-white/10 flex items-center justify-center`}
    >
      {icon} {text}
    </motion.a>
  );
}

function SocialButton({ href, icon, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ rotate: 10, scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center justify-center w-14 h-14 rounded-full 
      bg-gray-900/50 backdrop-blur-lg border border-white/10 hover:bg-gradient-to-r ${color} 
      transition-all duration-300 shadow-lg hover:shadow-purple-500/50`}
    >
      <span className="text-white group-hover:scale-125 transition-transform duration-300">
        {icon}
      </span>
    </motion.a>
  );
}

function BackgroundGlow({ color, size, duration, position }) {
  const posClasses =
    position === "top-left"
      ? "top-0 left-0"
      : position === "bottom-right"
      ? "bottom-0 right-0"
      : position === "top-right"
      ? "top-0 right-0"
      : "";

  return (
    <motion.div
      className={`absolute ${posClasses} rounded-full blur-3xl ${color}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      animate={{
        x: [0, 40, -40, 0],
        y: [0, -40, 40, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
