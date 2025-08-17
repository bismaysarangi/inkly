import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/server/auth/signout", {
        method: "POST",
      });
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

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Inkly
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "light" ? (
              <FaMoon className="text-gray-700 dark:text-gray-300" />
            ) : (
              <FaSun className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <Link
            to="/search"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <HiOutlineSearch className="text-gray-700 dark:text-gray-300 text-xl" />
          </Link>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </Link>
              <Button
                gradientDuoTone="purpleToBlue"
                outline
                onClick={handleSignOut}
                className="hidden sm:inline-flex"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button gradientDuoTone="purpleToBlue">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
