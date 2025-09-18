import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const API_BASE = import.meta.env.DEV ? "" : "https://portfoliobackend-5mtm.onrender.com";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("Message not sent. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Background Glows */}
      <BackgroundGlow color="bg-purple-500/20" size={300} duration={20} position="top-left" />
      <BackgroundGlow color="bg-blue-400/20" size={250} duration={22} position="bottom-right" />

      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Contact Me
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Info */}
        <motion.div
          className="flex flex-col gap-4 w-full md:w-1/3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ContactInfo icon={<FaEnvelope />} label="Email" value="chaitanyabajaj42@gmail.com" />
          <ContactInfo icon={<FaPhone />} label="Phone" value="+91 9350281798" />
          <ContactInfo icon={<FaMapMarkerAlt />} label="Location" value="India" />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 flex flex-col gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-400 text-center text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
            {submitted && (
              <motion.p
                className="text-green-400 text-center text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Message sent successfully!
              </motion.p>
            )}
          </AnimatePresence>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none w-full"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 20px rgba(168,85,247,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-md w-full"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

function ContactInfo({ icon, label, value }) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-3 bg-purple-600/30 rounded-full flex items-center justify-center text-white text-xl">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-white text-sm sm:text-base">{label}</p>
        <p className="text-gray-300 text-xs sm:text-sm">{value}</p>
      </div>
    </motion.div>
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
      className={`absolute ${posClasses} rounded-full blur-3xl ${color} pointer-events-none`}
      style={{ width: `${size}px`, height: `${size}px` }}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
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
