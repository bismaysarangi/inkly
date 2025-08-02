import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/server/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

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
          Welcome back to Inkly. Sign in to continue.
        </p>
      </div>
      {/* right side */}
      <div className="">
        <form
          className="flex flex-col gap-4 p-3 max-w-3xl mx-auto"
          onSubmit={handleSubmit}
        >
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {errorMessage}
            </div>
          )}
          <div className="space-y-4">
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
                onChange={handleChange}
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
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="w-full py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-6 w-1/3 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 px-6 py-3 tracking-wide rounded-lg font-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <Link
            to="/signup"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
          >
            Don't have an account? <span className="font-medium">Sign up</span>
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
