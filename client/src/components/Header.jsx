import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg text-white">
          Inkly
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={Search}
          className="hidden lg:inline"
        />
      </form>
      <Button className="h-10 w-12" color="gray" pill>
        <Search />
      </Button>
    </Navbar>
  );
};

export default Header;
