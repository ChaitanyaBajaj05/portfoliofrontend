import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#181c24] text-gray-300 py-8 px-4 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo or Name */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
            Chaitanya Bajaj
          </span>
          <button
            onClick={scrollToTop}
            className="ml-2 p-2 rounded-full bg-white/10 hover:bg-purple-600 transition-colors"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg text-purple-300" />
          </button>
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/chaitanyabajaj05"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://linkedin.com/in/chaitanyabajajfsd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Chaitanya Bajaj. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
