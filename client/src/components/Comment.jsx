import { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(
    currentUser ? comment.likes.includes(currentUser._id) : false
  );
  const [likes, setLikes] = useState(comment.numberOfLikes || 0);

  const handleLike = async () => {
    if (!currentUser) {
      return;
    }
    try {
      const res = await fetch(`/server/comment/likeComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      if (res.ok) {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get user data safely
  const userData =
    comment.userId && typeof comment.userId === "object"
      ? comment.userId
      : { username: "Unknown User", profilePicture: "" };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
      <div className="flex items-start space-x-4 mb-2">
        <img
          src={
            userData.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={userData.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 text-sm ${
                  isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
                <span>{likes}</span>
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
