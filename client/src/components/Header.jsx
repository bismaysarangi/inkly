import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { useState } from "react";
import {
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaPlus,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSignOut = async () => {
    try {
      const res = await fetch(
        "https://inkly-server-v564.onrender.com/auth/signout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchInput(false);
      setSearchTerm("");
    }
  };

  const toggleSearch = () => {
    setShowSearchInput(!showSearchInput);
    setSearchTerm("");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Inkly
            </span>
          </Link>

          {/* Desktop Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
              >
                <HiOutlineSearch className="text-xl" />
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-gray-700 dark:text-gray-300" />
              ) : (
                <FaSun className="text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile Search Toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle search"
            >
              {showSearchInput ? (
                <FaTimes className="text-gray-700 dark:text-gray-300 text-xl" />
              ) : (
                <HiOutlineSearch className="text-gray-700 dark:text-gray-300 text-xl" />
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-3">
                {/* Dashboard Button */}
                <Link to="/dashboard">
                  <Button
                    className="hidden cursor-pointer sm:inline-flex bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:bg-gradient-to-bl focus:ring-purple-300 dark:focus:ring-purple-800"
                    size="sm"
                  >
                    <FaTachometerAlt className="mr-2" />
                    Dashboard
                  </Button>
                </Link>

                {/* Create Post Button */}
                <Link to="/create-post">
                  <Button
                    className="cursor-pointer bg-gradient-to-br from-green-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-green-300 dark:focus:ring-green-800"
                    size="sm"
                  >
                    <FaPlus className="mr-2" />
                    <span className="hidden sm:inline">Create Post</span>
                    <span className="sm:hidden">Create</span>
                  </Button>
                </Link>

                {/* Profile Picture */}
                <Link to="/profile">
                  <img
                    src={
                      currentUser.profilePicture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                  />
                </Link>

                {/* Sign Out Button */}
                <Button
                  className="cursor-pointer hidden lg:inline-flex bg-gradient-to-br from-red-500 to-pink-500 text-white hover:bg-gradient-to-bl focus:ring-red-300 dark:focus:ring-red-800"
                  onClick={handleSignOut}
                  size="sm"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </Button>

                {/* Mobile Sign Out (icon only) */}
                <button
                  onClick={handleSignOut}
                  className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Sign out"
                >
                  <FaSignOutAlt className="text-red-500" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-2 cursor-pointer">
                <Link to="/sign-in">
                  <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Form */}
        {showSearchInput && (
          <form onSubmit={handleSearchSubmit} className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
              >
                <HiOutlineSearch className="text-xl" />
              </button>
            </div>
          </form>
        )}
      </div>
    </header>
  );
}
