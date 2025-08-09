import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";
import BlogCard from "./BlogCard";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Always fallback to deployed backend if env var is missing
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://portfoliobackend-5mtm.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/blogs/`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setFetchError("Unable to load blogs. Please try again later.");
        setLoading(false);
      });
  }, [API_BASE]);

  return (
    <section id="blog" className="py-20 max-w-6xl mx-auto px-4">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-center items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 shadow-lg">
            <FaPenNib className="text-white text-2xl" />
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Insights & Stories
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Fresh perspectives, code journeys, and everything I’m learning as a
          developer.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : fetchError ? (
        <div className="text-center text-red-400">{fetchError}</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-400">
          No blogs available yet.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
        >
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
