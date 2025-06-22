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
    { path: "/blog", label: "Blog", icon: FileText },
    { path: "/project", label: "Projects", icon: Briefcase },
    { path: "/contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <Link to="/" className="text-2xl font-bold tracking-wide cursor-pointer transition-colors duration-200 hover:text-primary-600">
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
                      ? 'text-primary-600 bg-primary-50 shadow-soft'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Resume Button */}
            <button
              onClick={downloadResume}
              className="flex items-center space-x-2 bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-soft hover:shadow-medium transform hover:scale-105"
            >
              <Download size={18} />
              <span>Resume</span>
            </button>

            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              {!isLoading && isLogin ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-all duration-200 font-medium"
                  >
                    <BarChart3 size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-error-600 hover:bg-error-50 transition-all duration-200 font-medium"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-all duration-200 font-medium shadow-soft hover:shadow-medium transform hover:scale-105"
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
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="mt-4 lg:hidden animate-slide-down">
            <div className="bg-white rounded-xl shadow-large border border-gray-100 p-6">
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
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Mobile Resume Button */}
                <button
                  onClick={() => { downloadResume(); toggleMenu(); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-success-500 to-success-600 text-white font-medium transition-all duration-200"
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>

                {/* Mobile Auth Section */}
                <div className="pt-3 border-t border-gray-200">
                  {!isLoading && isLogin ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={toggleMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-secondary-100 text-secondary-700 font-medium"
                      >
                        <BarChart3 size={20} />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => { handleLogout(); toggleMenu(); }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-error-600 hover:bg-error-50 font-medium"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary-500 text-white font-medium"
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