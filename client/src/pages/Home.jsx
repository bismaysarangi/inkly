import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Spinner } from "flowbite-react";
import {
  HiOutlineArrowRight,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineUsers,
  HiOutlineSparkles,
} from "react-icons/hi";
import { FaQuoteLeft, FaFire } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (e, path) => {
    if (!currentUser) {
      e.preventDefault();
      navigate("/sign-in");
    }
  };
  const handlePostClick = (postSlug) => {
    if (!currentUser) {
      navigate("/sign-in");
    } else {
      navigate(`/post/${postSlug}`);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://inkly-server-v564.onrender.com/post/getposts?limit=6"
        );
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                {currentUser ? (
                  <div className="mb-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      Welcome back, {currentUser.username}!
                    </h1>
                    <p className="text-xl opacity-90 mb-8">
                      Ready to share your next story? Your audience is waiting.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button
                        size="lg"
                        className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 font-semibold px-8 py-3"
                        as={Link}
                        to="/create-post"
                        onClick={(e) => handleClick(e, "/create-post")}
                      >
                        <HiOutlinePencil className="mr-2 w-5 h-5" />
                        Write New Post
                      </Button>
                      <Button
                        size="lg"
                        className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 font-semibold px-8 py-3"
                        as={Link}
                        to="/dashboard"
                        onClick={(e) => handleClick(e, "/dashboard")}
                      >
                        View Dashboard
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      Welcome to{" "}
                      <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        Inkly
                      </span>
                    </h1>
                    <p className="text-xl opacity-90 mb-8">
                      A place to share your thoughts, ideas, and stories with
                      the world. Join our community of passionate writers and
                      readers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button
                        size="lg"
                        className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 font-semibold px-8 py-3"
                        as={Link}
                        to="/sign-up"
                      >
                        Get Started Free
                      </Button>
                      <Button
                        size="lg"
                        className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 font-semibold px-8 py-3"
                        as={Link}
                        to="/about"
                        onClick={(e) => handleClick(e, "/about")}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
                  alt="Creative Writing"
                  className="relative w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Inkly?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to share your stories and connect with
                readers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HiOutlinePencil className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Easy Writing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Intuitive editor with rich formatting options to bring your
                  ideas to life
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HiOutlineUsers className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Growing Community
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with like-minded writers and engage with passionate
                  readers
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HiOutlineSparkles className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Get Discovered
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Reach new audiences and grow your readership with our
                  discovery features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaFire className="w-8 h-8 mr-3 text-orange-500" />
                  Trending Posts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Discover the most popular stories in our community
                </p>
              </div>
              <Link
                to="/all-posts"
                onClick={(e) => handleClick(e, "/all-posts")}
                className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
              >
                Explore All Posts
                <HiOutlineArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="text-center">
                  <Spinner size="xl" className="mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading amazing content...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md mx-auto">
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onPostClick={handlePostClick}
                    isAuthenticated={!!currentUser}
                  />
                ))}
              </div>
            )}

            {posts.length === 0 && !loading && !error && (
              <div className="text-center py-16">
                <HiOutlinePencil className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Be the first to share your story with the community!
                </p>
                {currentUser && (
                  <Button
                    as={Link}
                    to="/create-post"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    <HiOutlinePencil className="mr-2 w-4 h-4" />
                    Write First Post
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaQuoteLeft className="w-12 h-12 mx-auto text-purple-600 mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6 italic">
              "Inkly has transformed how I share my thoughts with the world. The
              community here is incredibly supportive and engaging."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="text-left">
                <div className="font-semibold text-gray-90 dark:text-white">
                  Sarah Johnson
                </div>
                <div className="text-purple-600 dark:text-purple-400">
                  Featured Writer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Thriving Community
              </h2>
              <p className="text-xl opacity-90">
                Numbers that speak for themselves
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  10,000+
                </div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <HiOutlineUsers className="w-5 h-5 mr-2" />
                  Active Writers
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  50,000+
                </div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <HiOutlinePencil className="w-5 h-5 mr-2" />
                  Posts Published
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <HiOutlineEye className="w-5 h-5 mr-2" />
                  Monthly Readers
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <MdTrendingUp className="w-5 h-5 mr-2" />
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - Only for non-logged-in users */}
      {!currentUser && (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-0 overflow-hidden">
                <div className="p-12 text-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <HiOutlineSparkles className="w-16 h-16 mx-auto text-purple-600 mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Ready to Start Your Writing Journey?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                      Join thousands of writers who are already sharing their
                      stories, building their audience, and making their mark on
                      the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-8 py-3"
                        as={Link}
                        to="/sign-up"
                      >
                        Create Free Account
                      </Button>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-8 py-3"
                        as={Link}
                        to="/sign-in"
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
