import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ThemeProvider from "./components/ThemeProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Search from "./pages/Search";
import UpdatePost from "./pages/UpdatePost";
import Profile from "./pages/ProfilePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsofService";
import DeletePost from "./pages/DeletePost";
import AllPosts from "./pages/AllPosts";

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("Scrolling to top");
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/post/:postSlug" element={<PostPage />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
              <Route path="/delete-post/:postId" element={<DeletePost />} />
              <Route path="/all-posts" element={<AllPosts />} />
              <Route path="/search" element={<Search />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        404
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Page not found
                      </p>
                      <a
                        href="/"
                        className="text-purple-600 hover:text-purple-500"
                      >
                        Go back home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
