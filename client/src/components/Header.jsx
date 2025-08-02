import { TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Moon, Sun, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (isSearchOpen || showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSearchOpen, showUserMenu]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/server/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        setShowUserMenu(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setIsSearchOpen(false);
  };

  return (
    <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:bg-gray-900/90 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white"
        >
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-full px-6 py-2 tracking-wide">
            Inkly
          </span>
        </Link>

        <div className="flex gap-3 md:order-2 items-center">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSubmit}>
              <TextInput
                type="text"
                placeholder="Search..."
                rightIcon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${
                  isSearchOpen ? "block" : "hidden"
                } lg:block fixed right-4 left-4 top-20 z-50 lg:relative lg:right-auto lg:left-auto lg:top-auto lg:w-auto shadow-lg lg:shadow-none rounded-lg lg:rounded-md`}
                autoFocus={isSearchOpen}
              />
            </form>
            <Button
              size="sm"
              variant="ghost"
              className="lg:hidden h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={18} />
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            size="sm"
            variant="ghost"
            className="hidden sm:inline h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* User Authentication */}
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors p-0"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User size={18} />
                )}
              </Button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      @{currentUser.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <Link
                    to="/dashboard?tab=profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-full px-6">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2.5 w-11 h-11 justify-center text-gray-500 rounded-full md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:text-gray-400 dark:focus:ring-purple-600 transition-all duration-200"
          >
            <div
              className={`transition-transform duration-300 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block animate-fadeIn" : "hidden"
          } w-full md:block md:w-auto transition-all duration-300`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-200/50 rounded-2xl bg-gray-50/80 backdrop-blur-sm md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800/80 md:dark:bg-transparent dark:border-gray-700/50 shadow-lg md:shadow-none">
            <li>
              <Link
                to="/"
                className={`block py-3 px-4 rounded-xl md:border-0 md:p-2 transition-all duration-300 font-semibold ${
                  path === "/"
                    ? "text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50 md:bg-transparent dark:text-purple-400"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 md:hover:bg-transparent md:hover:text-purple-600 dark:text-gray-300 md:dark:hover:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-3 px-4 rounded-xl md:border-0 md:p-2 transition-all duration-300 font-semibold ${
                  path === "/about"
                    ? "text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50 md:bg-transparent dark:text-purple-400"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 md:hover:bg-transparent md:hover:text-purple-600 dark:text-gray-300 md:dark:hover:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`block py-3 px-4 rounded-xl md:border-0 md:p-2 transition-all duration-300 font-semibold ${
                  path === "/projects"
                    ? "text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50 md:bg-transparent dark:text-purple-400"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 md:hover:bg-transparent md:hover:text-purple-600 dark:text-gray-300 md:dark:hover:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
