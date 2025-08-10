import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowDown, FaDownload } from "react-icons/fa";

export default function Hero() {
  const resumeUrl = "/chaitanyabajajspecialized.pdf";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 
      bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden"
    >
      {/* Multi-layer Background Glow */}
      <BackgroundGlow color="bg-purple-500/20" size={500} duration={18} position="top-left" />
      <BackgroundGlow color="bg-blue-500/20" size={400} duration={22} position="bottom-right" />
      <BackgroundGlow color="bg-pink-500/10" size={300} duration={25} position="top-right" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        <motion.p
          className="text-lg sm:text-xl text-purple-400 font-mono mb-4 tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r 
          from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent 
          drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Chaitanya Bajaj
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Crafting digital experiences with{" "}
          <span className="text-purple-400 font-semibold">React</span> and{" "}
          <span className="text-blue-400 font-semibold">Django</span>
        </motion.p>

        {/* Social & Resume Buttons */}
        <motion.div
          className="flex flex-wrap gap-6 mt-10 justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
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

          {/* Resume Button */}
          <motion.a
            href={resumeUrl}
            download
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
            text-white font-semibold shadow-xl hover:shadow-purple-500/40 hover:from-pink-500 hover:to-purple-600 
            transition-all duration-300 backdrop-blur-md border border-white/10"
          >
            <FaDownload className="inline-block mr-2 group-hover:animate-bounce" />
            Download Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-11 h-11 rounded-full border-2 border-purple-400 flex items-center justify-center animate-pulse">
          <FaArrowDown className="w-5 h-5 text-purple-400" />
        </div>
        <span className="text-sm text-gray-400 mt-2 tracking-wider">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}

function SocialButton({ href, icon, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ rotate: 5, scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center justify-center w-14 h-14 rounded-full 
      bg-gray-900/50 backdrop-blur-lg border border-white/10 hover:bg-gradient-to-r ${color} 
      transition-all duration-300 shadow-lg hover:shadow-purple-500/40`}
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
        x: [0, 50, -50, 0],
        y: [0, -50, 50, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
