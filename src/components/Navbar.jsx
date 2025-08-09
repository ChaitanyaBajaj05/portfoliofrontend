import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaUser, FaFolderOpen, FaEnvelope, FaHome, FaBlog, FaCertificate } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("Home");

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home", icon: <FaHome /> },
    { name: "About", href: "#about", icon: <FaUser /> },
    { name: "Certifications", href: "#certifications", icon: <FaCertificate /> },
    { name: "Projects", href: "#projects", icon: <FaFolderOpen /> },
    { name: "Blogs", href: "/blog", icon: <FaBlog /> },
    { name: "Contact", href: "#contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-white/5 backdrop-blur-xl shadow-lg hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with Gradient Animation */}
          <motion.a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            CB
          </motion.a>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <ul className="flex gap-8 text-lg font-medium">
              {navLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ scale: 1.05 }}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-6 ml-4">
              <motion.a
                href="https://github.com/ChaitanyaBajaj05"
                target="_blank"
                rel="noopener"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-purple-400"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-blue-400"
              >
                <FaLinkedin size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
        <div className="flex justify-between items-center px-6 py-4">
          <motion.a
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            CB
          </motion.a>
          
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="text-2xl text-gray-400 hover:text-purple-400 transition-colors"
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:hidden fixed top-16 w-full bg-gray-900/95 backdrop-blur-xl z-40"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-3 py-3 text-gray-300 hover:text-purple-400 transition-colors"
                    onClick={() => setNavOpen(false)}
                  >
                    <span className="text-purple-400">{link.icon}</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800">
        <div className="flex justify-around items-center h-16 px-4">
          {navLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className="relative flex flex-col items-center justify-center p-2"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {active === item.name && (
                  <motion.span
                    layoutId="mobileNav"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              
              <motion.span
                className={`text-2xl ${
                  active === item.name 
                    ? "text-purple-400" 
                    : "text-gray-400"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {item.icon}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </nav>
    </>
  );
}
