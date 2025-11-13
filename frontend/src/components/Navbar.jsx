import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icons (install lucide-react)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="font-bold text-lg sm:text-xl">
          Healthcare System
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/admin/users" className="hover:text-blue-400 transition">
            Admin Manage Users
          </Link>
          <Link to="/editor/posts" className="hover:text-blue-400 transition">
            Editor Manage Posts
          </Link>
          <Link to="/viewposts" className="hover:text-blue-400 transition">
            View Posts
          </Link>
        </div>

        {/* Auth Links (Desktop) */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/signin" className="hover:text-blue-400 transition">
            Sign In
          </Link>
          <Link to="/signup" className="hover:text-blue-400 transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-gray-800 rounded-lg p-4">
          <Link
            to="/admin/users"
            className="block hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Admin Manage Users
          </Link>
          <Link
            to="/editor/posts"
            className="block hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Editor Manage Posts
          </Link>
          <Link
            to="/viewposts"
            className="block hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            View Posts
          </Link>
          <hr className="border-gray-700" />
          <Link
            to="/signin"
            className="block hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
