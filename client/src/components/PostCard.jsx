import { Link } from "react-router-dom";
import { Heart, Calendar, User, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.numberOfLikes);
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleLike = async () => {
    if (!currentUser) {
      return;
    }
    try {
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
    }
  };

  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                isLiked ? "text-red-500" : ""
              }`}
              disabled={!currentUser}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span>{likes}</span>
            </button>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>0</span>
            </div>
          </div>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
