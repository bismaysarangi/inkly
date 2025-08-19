import { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaReply, FaEdit, FaTrash } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isLiked, setIsLiked] = useState(
    currentUser ? comment.likes.includes(currentUser._id) : false
  );
  const [likes, setLikes] = useState(comment.numberOfLikes);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

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

  const handleEdit = async () => {
    try {
      const res = await fetch(`/server/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      if (res.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/server/comment/deleteComment/${comment._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      if (res.ok) {
        // You might want to handle comment deletion in the parent component
        console.log("Comment deleted successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    // Implement reply functionality
    console.log("Reply submitted:", replyContent);
    setIsReplying(false);
    setReplyContent("");
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
      <div className="flex items-start space-x-4 mb-2">
        <img
          src={
            comment.userId.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={comment.userId.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {comment.userId.username}
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

          {isEditing ? (
            <div className="mt-2">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="mb-2"
              />
              <div className="flex space-x-2">
                <Button
                  size="xs"
                  onClick={handleEdit}
                  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Save
                </Button>
                <Button
                  size="xs"
                  className="bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {comment.content}
            </p>
          )}

          <div className="flex space-x-4 mt-3">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
            >
              <FaReply className="mr-1" /> Reply
            </button>
            {currentUser && currentUser._id === comment.userId._id && (
              <>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </>
            )}
          </div>

          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-4">
              <Textarea
                placeholder="Write your reply..."
                rows="2"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="mb-2"
              />
              <div className="flex space-x-2">
                <Button
                  size="xs"
                  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Post Reply
                </Button>
                <Button
                  size="xs"
                  className="bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
