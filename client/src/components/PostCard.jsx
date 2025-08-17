import { Link } from "react-router-dom";
import { Heart, Calendar, User, MessageCircle, Eye } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.numberOfLikes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      return;
    }

    if (isLiking) return;

    try {
      setIsLiking(true);
      const res = await fetch(`/server/post/likepost/${post._id}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.numberOfLikes);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content
      ? content.replace(/<[^>]*>/g, "").split(" ").length
      : 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700">
      <Link to={`/post/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Read Time Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {getReadTime(post.content)} min read
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            {post.title}
          </h3>

          {/* Content Preview */}
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {post.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    post.content.replace(/<[^>]*>/g, "").substring(0, 120) +
                    "...",
                }}
              />
            )}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.updatedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Author</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  isLiked ? "text-red-500" : "hover:text-red-500"
                } ${
                  !currentUser
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={!currentUser || isLiking}
                title={!currentUser ? "Login to like posts" : "Like this post"}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-200 ${
                    isLiked ? "fill-current" : ""
                  } ${isLiking ? "animate-pulse" : ""}`}
                />
                <span className="font-medium">{likes}</span>
              </button>

              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>0</span>
              </div>

              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Hover Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}
