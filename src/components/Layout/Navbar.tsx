
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-festai-darkgray text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Fest.ai
        </Link>
        <div className="space-x-6">
          <Link to="/features" className="hover:text-gray-300">
            Features
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
