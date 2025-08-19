import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spinner } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/server/post/getposts?limit=6");
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-12 px-4 mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Inkly
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              A place to share your thoughts, ideas, and stories with the world.
              Join our community of writers and readers today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                as={Link}
                to="/sign-up"
              >
                Get Started
              </Button>
              <Button
                className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                as={Link}
                to="/about"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
              alt="Blogging"
              className="w-full rounded-xl shadow-xl"
            />
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Posts
            </h2>
            <Link
              to="/search"
              className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
            >
              View all <HiOutlineArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Spinner size="xl" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border-0 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to start writing?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join our community of writers and share your stories with
              thousands of readers.
            </p>
            <Button
              className="mx-auto bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              as={Link}
              to="/sign-up"
            >
              Create an account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
