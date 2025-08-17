import { Link, useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import { Sun, Moon, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const handleSignout = async () => {
    try {
      const res = await fetch("/server/auth/signout", {
        method: "POST",
      });
      if (res.ok) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg">
              Inkly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                path === "/"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                path === "/about"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              About
            </Link>
            <Link
              to="/create-post"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                path === "/create-post"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              Create Post
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {currentUser ? (
              <div className="relative group">
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link
                    to="/dashboard?tab=profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button gradientDuoTone="purpleToBlue">Sign In</Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                path === "/"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                path === "/about"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/create-post"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                path === "/create-post"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Create Post
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
