import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function PostCard({ post, onPostClick, isAuthenticated }) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isLiked = currentUser ? post.likes.includes(currentUser._id) : false;

  const handlePostClick = (e) => {
    e.preventDefault();
    if (onPostClick) {
      onPostClick(post.slug);
    } else if (!isAuthenticated) {
      navigate("/sign-in");
    } else {
      navigate(`/post/${post.slug}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div onClick={handlePostClick} className="cursor-pointer">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-3">
              {isLiked ? (
                <FaHeart className="text-red-500 mr-1" />
              ) : (
                <FaRegHeart className="mr-1" />
              )}
              {post.numberOfLikes}
            </span>
          </div>
        </div>
        <div onClick={handlePostClick} className="cursor-pointer">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400">
            {post.title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePostClick}
            className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
          >
            Read more
          </button>
          <div className="flex items-center">
            <img
              src={
                post.userId.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={post.userId.username}
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {post.userId.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
