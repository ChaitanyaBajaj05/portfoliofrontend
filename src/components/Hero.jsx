import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowDown, FaDownload } from "react-icons/fa";

export default function Hero() {
  // Direct path to resume file in public folder
  const resumeUrl = "/chaitanyabajajspecialized.pdf";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-8"
    >
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, 
              rgba(110, 142, 251, 0.4) 0%, 
              rgba(167, 119, 227, 0.4) 100%
            ),
            linear-gradient(45deg, 
              rgba(15, 32, 39, 0.9) 0%, 
              rgba(44, 83, 100, 0.9) 50%, 
              rgba(35, 37, 38, 0.9) 100%
            )`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl sm:text-2xl text-purple-400 mb-4 font-mono">
                Hi, I'm
              </p>
              <motion.h1
                className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 4,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "300% 300%",
                  lineHeight: 1.2,
                }}
              >
                Chaitanya Bajaj
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl text-gray-300 leading-relaxed"
            >
              Crafting digital experiences with
              <span className="text-purple-400 font-semibold"> React </span>
              and
              <span className="text-blue-400 font-semibold"> Django</span>
            </motion.p>

            {/* Social Links + Resume */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-6 mt-8 items-center"
            >
              {/* GitHub */}
              <a
                href="https://github.com/chaitanyabajaj05"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 hover:bg-gray-800 transition-all">
                  <FaGithub className="w-8 h-8 text-purple-400 group-hover:text-white transition-colors" />
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/chaitanyabajajfsd"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 hover:bg-gray-800 transition-all">
                  <FaLinkedin className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                </span>
              </a>

              {/* Resume Download Button */}
              <a
                href={resumeUrl}
                download
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-purple-600 transition-all duration-300 focus:outline-none mt-2"
              >
                <FaDownload className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce flex flex-col items-center gap-2">
            <FaArrowDown className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-gray-400">Scroll to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
