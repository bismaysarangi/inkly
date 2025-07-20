import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { Search, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:bg-gray-900/90 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white"
        >
          <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white font-semibold tracking-wide">
            Inkly
          </span>
        </Link>

        <div className="flex gap-3 md:order-2 items-center">
          <div className="relative">
            <form>
              <TextInput
                type="text"
                placeholder="Search..."
                rightIcon={Search}
                className={`${
                  isSearchOpen ? "block" : "hidden"
                } lg:block absolute right-0 top-0 w-64 z-10 lg:relative lg:w-auto`}
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
          <Button
            size="sm"
            variant="ghost"
            className="hidden sm:inline h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Moon size={18} />
          </Button>
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-full px-6">
              Sign In
            </Button>
          </Link>

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
                className="block py-3 px-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 md:hover:bg-transparent md:border-0 md:hover:text-purple-600 md:p-2 dark:text-gray-300 md:dark:hover:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-3 px-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 md:hover:bg-transparent md:border-0 md:hover:text-purple-600 md:p-2 dark:text-gray-300 md:dark:hover:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="block py-3 px-4 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 md:hover:bg-transparent md:border-0 md:hover:text-purple-600 md:p-2 dark:text-gray-300 md:dark:hover:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300 font-semibold"
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
