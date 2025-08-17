import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Search as SearchIcon, Filter, SortDesc } from "lucide-react";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/server/post/getposts?${searchQuery}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sidebarData.searchTerm)
      urlParams.set("searchTerm", sidebarData.searchTerm);
    if (sidebarData.sort) urlParams.set("sort", sidebarData.sort);
    if (sidebarData.category && sidebarData.category !== "uncategorized") {
      urlParams.set("category", sidebarData.category);
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/server/post/getposts?${searchQuery}`);
      if (!res.ok) return;

      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  const clearFilters = () => {
    setSidebarData({
      searchTerm: "",
      sort: "desc",
      category: "uncategorized",
    });
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Content
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search through our collection of articles and tutorials
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar/Filters */}
          <div className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showFilters ? "Hide" : "Show"}
                </button>
              </div>

              <form
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
                onSubmit={handleSubmit}
              >
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Term
                  </label>
                  <TextInput
                    placeholder="Search articles..."
                    id="searchTerm"
                    type="text"
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    icon={SearchIcon}
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.sort}
                    id="sort"
                  >
                    <option value="desc">Latest First</option>
                    <option value="asc">Oldest First</option>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.category}
                    id="category"
                  >
                    <option value="uncategorized">All Categories</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                    <option value="nodejs">Node.js</option>
                    <option value="python">Python</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">
                      Mobile Development
                    </option>
                    <option value="devops">DevOps</option>
                    <option value="design">Design</option>
                    <option value="tutorials">Tutorials</option>
                  </Select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    gradientDuoTone="purpleToBlue"
                    className="flex-1"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    type="button"
                    color="gray"
                    onClick={clearFilters}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <SortDesc className="w-5 h-5 mr-2 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {loading
                    ? "Searching..."
                    : `Found ${posts.length} article${
                        posts.length !== 1 ? "s" : ""
                      }`}
                </h2>
              </div>
              {sidebarData.searchTerm && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Results for "{sidebarData.searchTerm}"
                </div>
              )}
            </div>

            {/* Active Filters */}
            {(sidebarData.searchTerm ||
              sidebarData.category !== "uncategorized") && (
              <div className="mb-6 flex flex-wrap gap-2">
                {sidebarData.searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Search: {sidebarData.searchTerm}
                    <button
                      onClick={() => {
                        setSidebarData((prev) => ({ ...prev, searchTerm: "" }));
                        const urlParams = new URLSearchParams(location.search);
                        urlParams.delete("searchTerm");
                        navigate(`/search?${urlParams.toString()}`);
                      }}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {sidebarData.category !== "uncategorized" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Category: {sidebarData.category}
                    <button
                      onClick={() => {
                        setSidebarData((prev) => ({
                          ...prev,
                          category: "uncategorized",
                        }));
                        const urlParams = new URLSearchParams(location.search);
                        urlParams.delete("category");
                        navigate(`/search?${urlParams.toString()}`);
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters} gradientDuoTone="purpleToBlue">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>

                {showMore && (
                  <div className="text-center">
                    <Button
                      onClick={handleShowMore}
                      color="gray"
                      size="lg"
                      className="font-semibold"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
