import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      {/* left side */}
      <div className="flex items-center p-3 max-w-3xl mx-auto flex-col gap-2">
        <Link to="/" className="text-sm sm:text-xl font-bold dark:text-white">
          <span className="text-3xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-full px-6 py-2 tracking-wide inline-block">
            Inkly
          </span>
        </Link>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Create an account to get started with Inkly.
        </p>
      </div>
      {/* right side */}
      <div className="">
        <form className="flex flex-col gap-4 p-3 max-w-3xl mx-auto">
          <div className="space-y-4">
            <div>
              <Label
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                value="Your username"
              >
                Username
              </Label>
              <TextInput
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                className="w-full py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <Label
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                value="Your email"
              >
                Email
              </Label>
              <TextInput
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <Label
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                value="Your password"
              >
                Password
              </Label>
              <TextInput
                type="password"
                id="password"
                placeholder="Create a password"
                required
                className="w-full py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-6 w-1/3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 px-6 py-3 tracking-wide rounded-lg font-semibold"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <Link
            to="/login"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
          >
            Already have an account? <span className="font-medium">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
