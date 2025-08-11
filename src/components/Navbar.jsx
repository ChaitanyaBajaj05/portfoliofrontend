import React, { useState, memo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaUser,
  FaFolderOpen,
  FaEnvelope,
  FaHome,
  FaBlog,
  FaCertificate,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "About", href: "#about", icon: FaUser },
  { name: "Certifications", href: "#certifications", icon: FaCertificate },
  { name: "Projects", href: "#projects", icon: FaFolderOpen },
  { name: "Blogs", href: "/blog", icon: FaBlog },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
];

const socialLinks = [
  { href: "https://github.com/ChaitanyaBajaj05", icon: FaGithub, color: "hover:text-purple-400" },
  { href: "https://linkedin.com/in/yourusername", icon: FaLinkedin, color: "hover:text-blue-400" },
];

// Memoized Nav Item
const NavItem = memo(({ link, active, setActive }) => {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.href}
      onClick={() => setActive(link.name)}
      className="relative flex flex-col items-center justify-center gap-1 p-2"
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {active === link.name && (
          <motion.span
            layoutId="navHighlight"
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <Icon
        className={`text-xl transition-transform duration-300 ${
          active === link.name ? "text-purple-400 scale-110" : "text-gray-400 group-hover:scale-110"
        }`}
      />
      <span
        className={`text-xs ${
          active === link.name ? "text-purple-300" : "text-gray-500"
        }`}
      >
        {link.name}
      </span>
    </motion.a>
  );
});

export default function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <div className="overflow-x-hidden w-full">
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-wide"
            whileHover={{ scale: 1.05 }}
          >
            CB
          </motion.a>

          {/* Links */}
          <ul className="flex gap-8 text-lg font-medium">
            {navLinks.map((link) => (
              <motion.li key={link.name} whileHover={{ scale: 1.05 }}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.name)}
                  className={`relative transition-colors duration-300 ${
                    active === link.name
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {link.name}
                  {active === link.name && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex gap-6 ml-4">
            {socialLinks.map(({ href, icon: Icon, color }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className={`text-gray-400 ${color} transition-colors`}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="flex justify-center items-center px-6 py-4">
          <motion.a
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            CB
          </motion.a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="
          md:hidden
          fixed
          left-1/2
          -translate-x-1/2
          z-50
          w-[95%]
          max-w-md
          rounded-2xl
          bg-gray-900/80
          backdrop-blur-xl
          border
          border-gray-700
          shadow-lg
          pb-[env(safe-area-inset-bottom)]
        "
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 1rem)"
        }}
      >
        <div className="flex justify-around items-center h-16 px-4">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} active={active} setActive={setActive} />
          ))}
        </div>
      </nav>
    </div>
  );
}
