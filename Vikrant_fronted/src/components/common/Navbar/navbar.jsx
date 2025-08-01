

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FileText, Phone, Wrench, Activity, LogOut, User } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../utils/constants.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setShowUserMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Public navigation items
  const publicNavItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Team', path: ROUTES.TEAM, icon: <Users size={16} /> },
    { label: 'Project', path: ROUTES.PROJECT, icon: <FileText size={16} /> },
    { label: 'Contact', path: ROUTES.CONTACT, icon: <Phone size={16} /> },
  ];

  // Private navigation items (only show when authenticated)
  const privateNavItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: <Activity size={16} /> },
    { label: 'Service', path: ROUTES.SERVICE, icon: <Wrench size={16} /> },
  ];

  // Combine navigation items based on authentication status
  const navItems = isAuthenticated 
    ? [...publicNavItems, ...privateNavItems]
    : publicNavItems;

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-md border border-green-500/40 rounded-full shadow-2xl px-6 py-3 hover:border-lime-400/60 transition-all duration-300">
        <div className="flex items-center space-x-8">
          
          
          

          {/* Navigation Buttons */}
          <div className="flex space-x-3">
            {navItems.map(({ label, path, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform 
                  ${isActive(path)
                    ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white scale-105 shadow-lg shadow-green-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-lime-500/20 hover:scale-105 hover:border-green-400/30 border border-transparent'}`}
              >
                {icon && icon}
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            ))}
          </div>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-lime-500/20 hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-400/30"
                >
                  <User size={16} />
                  <span className="whitespace-nowrap">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md border border-green-500/40 rounded-xl shadow-2xl py-2">
                    <div className="px-4 py-2 border-b border-green-500/20">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-sm text-green-300 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-lime-500 text-white hover:from-green-600 hover:to-lime-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                <User size={16} />
                <span className="whitespace-nowrap">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;