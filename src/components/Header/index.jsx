import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../../context";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { isLogin, isLoading } = useContext(MyContext);
  const userId = localStorage.getItem("userId");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide cursor-pointer">
            <Link
              to="/"
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
            >
              Shahan Ahmed
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8 text-lg font-medium">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 50);
                  }}
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              {!isLoading && isLogin && (
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-400 transition"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link to="/blog" className="hover:text-blue-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/project" className="hover:text-blue-400 transition">
                  Project
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>

              {!isLoading && isLogin ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-400 transition"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="hover:text-blue-400 transition">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="mt-4 lg:hidden">
           
            <ul className="flex flex-col space-y-4 text-lg font-medium">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 50);
                    setMenuOpen(false);
                  }}
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              {!isLoading && isLogin && (
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/blog"
                  className="hover:text-blue-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/project"
                  className="hover:text-blue-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Project
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>

              {!isLoading && isLogin ? (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="hover:text-blue-400 transition"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
