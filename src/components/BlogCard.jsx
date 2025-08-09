import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaHeart, FaRegHeart, FaShareAlt, FaComment, FaEye } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

export default function BlogCard({ blog }) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Get API base URL from environment variables
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Fetch latest blog data (likes, views, comments)
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/blogs/${blog.id}/`);
      setLikes(res.data.likes_count || 0);
      setViews(res.data.views_count || 0);
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();

    // Register view
    axios
      .post(`${API_BASE}/api/blogs/${blog.id}/view/`, {
        ip_address: "127.0.0.1" // Replace with actual IP logic if needed
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, [blog.id, API_BASE]);

  // Like handler
  const handleLike = async () => {
    if (!liked) {
      try {
        await axios.post(`${API_BASE}/api/likes/`, {
          blog: blog.id,
          ip_address: "127.0.0.1"
        });
        setLiked(true);
        fetchBlogData();
      } catch (error) {
        console.error("Error liking blog:", error);
      }
    }
  };

  // Comment handler
  const handleComment = async (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    try {
      await axios.post(`${API_BASE}/api/comments/`, {
        blog: blog.id,
        name: "Anonymous",
        text: commentText
      });
      setCommentText("");
      fetchBlogData();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Share handler
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/blog/${blog.id}`);
    alert("Blog link copied to clipboard!");
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-blue-900/70 rounded-3xl shadow-2xl flex flex-col transition-transform transform hover:scale-105 hover:shadow-4xl hover:brightness-110"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(99, 102, 241, 0.5)" }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
        <img
          src={
            blog.cover_image.startsWith("http")
              ? blog.cover_image
              : `${API_BASE}${blog.cover_image}`
          }
          alt={blog.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-3xl" />
      </div>
      
      <div className="flex-1 flex flex-col p-6 z-20">
        <h3 className="text-3xl font-extrabold mb-3 text-white truncate" title={blog.title}>
          {blog.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-4" title={blog.description}>
          {blog.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>
            {new Date(blog.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
          <div className="flex items-center gap-2">
            <FaEye className="text-blue-400" />
            <span>{views} views</span>
          </div>
        </div>

        <div className="mt-auto flex gap-6 items-center">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-transform transform hover:scale-110"
            aria-label="Like this blog"
            disabled={liked}
          >
            {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />} {likes}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-transform transform hover:scale-110"
            aria-label="Toggle comments"
          >
            <FaComment size={20} /> {comments.length}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-transform transform hover:scale-110"
            aria-label="Share this blog"
          >
            <FaShareAlt size={20} /> Share
          </button>

          {blog.link && (
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-transform transform hover:scale-110"
              title="Read Full Blog"
            >
              <FaExternalLinkAlt size={18} /> Read More
            </a>
          )}
        </div>

        {showComments && (
          <div className="mt-6 bg-white/10 rounded-lg p-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
            <form onSubmit={handleComment} className="flex gap-3 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-4 rounded-md"
              >
                Post
              </button>
            </form>

            {comments.length === 0 ? (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className="mb-3 border-b border-white/20 pb-2">
                  <p className="text-sm text-purple-300 font-semibold">{c.name}:</p>
                  <p className="text-gray-300 text-sm">{c.text}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
