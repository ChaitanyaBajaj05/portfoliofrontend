import { motion } from "framer-motion";

export default function Maintenance() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#0f172a] text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🚧 Page Under Maintenance 🚧
        </motion.h1>

        {/* Subtext */}
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          We’re working hard to bring this project live. Check back soon!
        </p>

        {/* Button to go back to Home */}
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          Go Back to Portfolio
        </a>
      </motion.div>
    </section>
  );
}
