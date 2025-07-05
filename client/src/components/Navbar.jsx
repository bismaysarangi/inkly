import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey">
      <Link to="/" className="flex-none w-10">
        <img src="/small-logo.png" alt="logo" className="w-full" />
      </Link>
    </nav>
  );
};

export default Navbar;
