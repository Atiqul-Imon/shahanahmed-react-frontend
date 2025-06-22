import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/dashboard/blogs', icon: FileText, label: 'Blogs' },
    { to: '/dashboard/projects', icon: Briefcase, label: 'Projects' },
    { to: '/dashboard/snippets', icon: Code, label: 'Snippets' },
  ];

  const bottomNavItems = [
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { to: '/logout', icon: LogOut, label: 'Logout' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <div className={`flex items-center space-x-2 transition-all duration-200 ${!isOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            {isOpen && (
              <span className="text-xl font-bold text-gray-800">Dashboard</span>
            )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 ${
              isActive(item.to)
                ? 'bg-primary-50 text-primary-600 font-semibold'
                : 'text-gray-600'
            } ${!isOpen && 'justify-center'}`}
            title={isOpen ? '' : item.label}
          >
            <item.icon size={20} />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-6 border-t border-gray-200 space-y-2">
        {bottomNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 text-gray-600 ${
              !isOpen && 'justify-center'
            }`}
            title={isOpen ? '' : item.label}
          >
            <item.icon size={20} />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 