import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Spinner } from "flowbite-react";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://inkly-server-v564.onrender.com/post/getposts?slug=${postSlug}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLikes(data.posts[0].numberOfLikes);
          setLiked(
            currentUser ? data.posts[0].likes.includes(currentUser._id) : false
          );
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug, currentUser]);

  const handleLike = async () => {
    if (!currentUser) {
      return;
    }
    try {
      const res = await fetch(
        `https://inkly-server-v564.onrender.com/post/likepost/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      if (res.ok) {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Link
            to="/"
            className="text-purple-600 hover:text-purple-500 mt-4 inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <article>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={
                post.userId.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={post.userId.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {post.userId.username}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {post.category}
          </span>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl mb-8"
          />
        )}

        <div
          className="prose dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex items-center space-x-6 mb-12">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              liked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            }`}
            disabled={!currentUser}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{likes} Likes</span>
          </button>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <FaComment />
            <span>Comments</span>
          </div>
          <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        {currentUser && currentUser._id === post.userId._id && (
          <div className="flex space-x-4 mb-8">
            <Link to={`/update-post/${post._id}`}>
              <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                Edit Post
              </Button>
            </Link>
            <Link to={`/delete-post/${post._id}`}>
              <Button color="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                Delete Post
              </Button>
            </Link>
          </div>
        )}
      </article>

      <CommentSection postId={post._id} />
    </div>
  );
}
