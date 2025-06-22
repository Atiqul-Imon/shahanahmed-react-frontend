import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../../context";
import { Menu, X, Download, User, LogOut, Home, FileText, Briefcase, MessageCircle, BarChart3 } from "lucide-react";

const Header = () => {
  const { isLogin, isLoading } = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const downloadResume = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/download-resume`, '_blank');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/project", label: "Projects", icon: Briefcase },
    { path: "/contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold tracking-wide cursor-pointer text-gray-100 hover:text-white transition-colors duration-200">
              Shahan Ahmed
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isActive(item.path)
                      ? 'text-white bg-blue-600 shadow-soft'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
              {!isLoading && isLogin ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-200 font-medium"
                  >
                    <BarChart3 size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 font-medium"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-medium shadow-soft hover:shadow-medium transform hover:scale-105"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="mt-4 lg:hidden animate-slide-down">
            <div className="bg-gray-800 rounded-xl shadow-large border border-gray-700 p-6">
              <nav className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={toggleMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        isActive(item.path)
                          ? 'text-white bg-blue-600'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Mobile Auth Section */}
                <div className="pt-3 border-t border-gray-700">
                  {!isLoading && isLogin ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={toggleMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-700 text-gray-200 font-medium"
                      >
                        <BarChart3 size={20} />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => { handleLogout(); toggleMenu(); }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 font-medium"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium"
                    >
                      <User size={20} />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;