import { useEffect, useState } from "react";
import { Button, Textarea, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://inkly-server-v564.onrender.com/comment/getPostComments/${postId}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setComments(data);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    try {
      setCommentLoading(true);
      const res = await fetch(
        "https://inkly-server-v564.onrender.com/comment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            postId,
            userId: currentUser._id,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setCommentLoading(false);
        return;
      }
      if (res.ok) {
        setComment("");
        setComments([data, ...comments]); // This should work now with populated data
        setCommentLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setCommentLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h2>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            placeholder="Write a comment..."
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
          />
          <Button
            type="submit"
            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
            disabled={commentLoading}
          >
            {commentLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Posting...
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </form>
      ) : (
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You must be signed in to leave a comment.
          </p>
          <Link to="/sign-in">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
