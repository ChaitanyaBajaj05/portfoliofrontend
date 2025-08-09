import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
// Remove trailing slash & add fallback for local dev
const API_BASE =
  (import.meta.env.VITE_API_URL?.replace(/\/$/, "")) || "http://localhost:8000";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill all fields.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/messages/`, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Message not sent. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 max-w-4xl mx-auto px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Contact Me
      </motion.h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg max-w-xl mx-auto flex flex-col gap-6"
      >
        {error && <p className="text-red-400 text-center">{error}</p>}
        {submitted && <p className="text-green-400 text-center">Message sent successfully!</p>}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded-md bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-md bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="p-3 rounded-md bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
