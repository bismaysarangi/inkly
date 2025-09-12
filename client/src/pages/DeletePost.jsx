import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Spinner, Alert } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DeletePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://inkly-server-v564.onrender.com/post/getposts?postId=${postId}`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }

        if (res.ok) {
          // Check if current user is the author of the post
          if (currentUser._id !== data.posts[0].userId._id) {
            setError("You are not authorized to delete this post");
            setLoading(false);
            return;
          }

          setPost(data.posts[0]);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchPost();
    }
  }, [postId, currentUser]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetch(
        `https://inkly-server-v564.onrender.com/post/deletepost/${postId}/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setDeleting(false);
        return;
      }

      if (res.ok) {
        setDeleting(false);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button
            onClick={() => navigate("/")}
            className="mt-4 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-2xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Delete Post
        </h1>

        {error && (
          <Alert color="failure" className="mb-6 border-l-4 border-red-500">
            <div className="font-medium text-red-800 dark:text-red-200">
              {error}
            </div>
          </Alert>
        )}

        <div className="mb-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to delete this post?
          </p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            "{post.title}"
          </h2>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-xl my-6 mx-auto"
            />
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Posted on{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={() => navigate(-1)}
            color="gray"
            disabled={deleting}
            className="px-6 py-2.5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-2.5 bg-gradient-to-br from-red-600 to-red-500 text-white hover:bg-gradient-to-bl focus:ring-red-300 dark:focus:ring-red-800"
          >
            {deleting ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Deleting...
              </>
            ) : (
              "Yes, Delete Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
