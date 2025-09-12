import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Spinner } from "flowbite-react";
import {
  HiOutlineArrowLeft,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineUsers,
  HiOutlineSparkles,
  HiOutlineSearch,
} from "react-icons/hi";
import { FaFire, FaList } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import PostCard from "../components/PostCard";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
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
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://inkly-server-v564.onrender.com/post/getposts"
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
    fetchAllPosts();
  }, []);

  const filteredAndSortedPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "createdAt":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes.length - a.likes.length;
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mr-4"
              >
                <HiOutlineArrowLeft className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center">
                <FaList className="w-8 h-8 mr-3 text-purple-600" />
                <span className="hidden sm:inline">All Posts</span>
              </h1>
            </div>
            {currentUser && (
              <Button
                as={Link}
                to="/create-post"
                onClick={(e) => handleClick(e, "/create-post")}
                className="sm:text-lg text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                <HiOutlinePencil className="mr-2 w-4 h-4" />
                Write New Post
              </Button>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Discover all the amazing stories from our community of writers
          </p>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Search Posts
                </label>
                <div className="relative">
                  <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by title, content, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="views">Most Views</option>
                  <option value="likes">Most Likes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Posts
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {new Set(posts.map((post) => post.userId)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Writers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {posts
                    .reduce((total, post) => total + post.likes.length, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Likes
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <Spinner size="xl" className="mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Loading all posts...
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
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredAndSortedPosts.length} of {posts.length}{" "}
                  posts
                </p>
                {searchTerm && (
                  <Button
                    color="gray"
                    onClick={() => setSearchTerm("")}
                    className="text-sm"
                  >
                    Clear Search
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onPostClick={handlePostClick}
                    isAuthenticated={!!currentUser}
                  />
                ))}
              </div>
            </>
          )}

          {filteredAndSortedPosts.length === 0 && !loading && !error && (
            <div className="text-center py-16">
              <HiOutlineSearch className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm
                  ? `No posts matching "${searchTerm}"`
                  : "No posts available yet"}
              </p>
              {searchTerm && (
                <Button
                  color="gray"
                  onClick={() => setSearchTerm("")}
                  className="mr-4"
                >
                  Clear Search
                </Button>
              )}
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
  );
}
