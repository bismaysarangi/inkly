import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [searchBoxVisibilty, setSearchBoxVisibilty] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10">
        <img src="/small-logo.png" alt="logo" className="w-full" />
      </Link>
      <div
        className={
          "absolute w-full left-0 top-full mt-0.5 border-b border-b-gray-700 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
          (searchBoxVisibilty ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-auto bg-fuchsia-300 text-amber-800 p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder-amber-950 md:pl-12 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
        />
        <i className="fi fi-rs-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-2xl"></i>
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          className="md:hidden bg-fuchsia-300 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setSearchBoxVisibilty((currentVal) => !currentVal)}
        >
          <i className="fi fi-rs-search text-xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
