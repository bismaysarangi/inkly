import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
