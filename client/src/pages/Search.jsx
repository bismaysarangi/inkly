import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, Spinner } from "flowbite-react";
import PostCard from "../components/PostCard";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/server/post/getposts?searchTerm=${query}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length < 9) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    if (query) {
      fetchPosts();
    }
  }, [query]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/server/post/getposts?searchTerm=${query}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      if (res.ok) {
        setPosts([...posts, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Search results for: <span className="text-purple-600">{query}</span>
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <Card className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No posts found matching your search. Try different keywords.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {showMore && (
        <div className="text-center">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={handleShowMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}
