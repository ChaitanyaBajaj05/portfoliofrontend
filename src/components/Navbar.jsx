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
import { ReactTyped } from "react-typed"; // ✅ Correct import

// Links except Blogs for bottom nav
const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "About", href: "#about", icon: FaUser },
  { name: "Certifications", href: "#certifications", icon: FaCertificate },
  { name: "Projects", href: "#projects", icon: FaFolderOpen },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
];

const socialLinks = [
  { href: "https://github.com/ChaitanyaBajaj05", icon: FaGithub, color: "hover:text-purple-400" },
  { href: "https://linkedin.com/in/yourusername", icon: FaLinkedin, color: "hover:text-blue-400" },
];

// Memoized Nav Item for Mobile
const NavItem = memo(({ link, active, setActive }) => {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.href}
      onClick={() => setActive(link.name)}
      className="relative flex flex-col items-center justify-center gap-1 p-2 w-14 group"
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {active === link.name && (
          <motion.span
            layoutId="activeBubble"
            className="absolute -top-2 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/40 to-blue-500/40 shadow-lg shadow-purple-500/50"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          />
        )}
      </AnimatePresence>

      <Icon
        className={`text-2xl transition-transform duration-300 ${
          active === link.name
            ? "text-white scale-125 drop-shadow-lg"
            : "text-gray-400 group-hover:scale-110"
        }`}
      />
      <span
        className={`text-xs transition-all duration-300 ${
          active === link.name ? "text-white font-semibold" : "text-gray-400"
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
          {/* Typing Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-extrabold tracking-wide">
            <ReactTyped
              strings={[
                "Chaitanya Bajaj",
                "A Full Stack Developer",
                "Django + React Specialist",
              ]}
              typeSpeed={60}
              backSpeed={30}
              loop
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            />
          </motion.div>

          {/* Links (Blogs included in desktop only) */}
          <ul className="flex gap-8 text-lg font-medium">
            {navLinks.concat({ name: "Blogs", href: "/blog", icon: FaBlog }).map((link) => (
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
        <div className="flex justify-between items-center px-4 py-3">
          {/* Typing Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-sm sm:text-base font-bold tracking-wide max-w-[70%] overflow-hidden"
          >
            <ReactTyped
              strings={[
                "Chaitanya Bajaj",
                "A Full Stack Developer",
                "Django + React Specialist",
              ]}
              typeSpeed={50}
              backSpeed={25}
              loop
              className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            />
          </motion.div>

          {/* Blog button on mobile top bar */}
          <motion.a
            href="/blog"
            onClick={() => setActive("Blogs")}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl transition-colors ${
              active === "Blogs"
                ? "text-purple-400 border border-purple-400"
                : "text-gray-300 hover:text-purple-300"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <FaBlog className="text-lg" />
            Blog
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
          rounded-3xl
          bg-gray-900/90
          backdrop-blur-xl
          border
          border-gray-700
          shadow-2xl
          pb-[env(safe-area-inset-bottom)]
          transition-all
        "
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        <div className="flex justify-around items-center h-20 px-4 relative">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} active={active} setActive={setActive} />
          ))}

          {/* Animated Glow Behind */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 pointer-events-none"
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </nav>
    </div>
  );
}
