import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/signin" element={<h1>Sign In Page</h1>} />
        <Route path="/signup" element={<h1>Sign Up page</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
