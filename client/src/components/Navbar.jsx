import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10">
        <img src="/small-logo.png" alt="logo" className="w-full" />
      </Link>
    </nav>
  );
};

export default Navbar;
