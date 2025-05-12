import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

// Role configuration (could be moved to a separate config file)
const ROLES = {
  SALES: 'SALES',
  FINANCE: 'FINANCE',
  INVESTOR: 'INVESTOR',
  IWC_PARTNER: 'IWC_PARTNER',
  CLIENT: 'CLIENT',
  DEVELOPER: 'DEVELOPER'
};

const ROLE_DASHBOARD_PATHS = {
  [ROLES.SALES]: "/sales-dashboard",
  [ROLES.FINANCE]: "/finance-dashboard",
  [ROLES.INVESTOR]: "/investor-portal",
  [ROLES.DEVELOPER]: "/dev-console",
  [ROLES.IWC_PARTNER]: "/partner-dashboard",
  [ROLES.CLIENT]: "/client-dashboard"
};

const ROLE_BASED_LINKS = {
  [ROLES.SALES]: [
    { path: "/sales-dashboard", label: "Sales Dashboard" },
    { path: "/client-queries", label: "Client Queries" },
    { path: "/sales-targets", label: "Sales Targets" }
  ],
  [ROLES.FINANCE]: [
    { path: "/finance-dashboard", label: "Financial Reports" },
    { path: "/income-statements", label: "Income Statements" },
    { path: "/expense-reports", label: "Expense Reports" }
  ],
  [ROLES.INVESTOR]: [
    { path: "/investor-portal", label: "Investor Portal" },
    { path: "/financial-summaries", label: "Financial Summaries" }
  ],
  [ROLES.DEVELOPER]: [
    { path: "/dev-console", label: "Developer Console" },
    { path: "/api-docs", label: "API Documentation" }
  ],
  [ROLES.IWC_PARTNER]: [
    { path: "/partner-dashboard", label: "Partner Dashboard" },
    { path: "/analytics", label: "Analytics" },
    { path: "/collaboration", label: "Collaboration" }
  ],
  [ROLES.CLIENT]: [
    { path: "/client-dashboard", label: "My Account" },
    { path: "/orders", label: "My Orders" },
    { path: "/support", label: "Support" }
  ]
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Common navigation links for all users
  const commonNavLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" }
  ];

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user) return '/';
    return ROLE_DASHBOARD_PATHS[user.role] || '/';
  };

  // Get links for current user role
  const getUserLinks = () => {
    if (!user) return [];
    return ROLE_BASED_LINKS[user.role] || [];
  };

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    const dashboardPath = getDashboardPath();
    setIsMenuOpen(false);
    navigate(dashboardPath);
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user) return '';
    
    try {
      const nameParts = user.name 
        ? user.name.trim().split(/\s+/) 
        : (user.email || '').split('@')[0].split(/[.\-_]/);
      
      return nameParts
        .filter(part => part.length > 0)
        .map(part => part.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
    } catch (e) {
      console.error('Error generating initials:', e);
      return '?';
    }
  };

  // Get avatar color based on user role
  const getAvatarColor = () => {
    if (!user) return 'bg-gray-400';
    const roleColors = {
      [ROLES.SALES]: 'bg-blue-500',
      [ROLES.FINANCE]: 'bg-green-500',
      [ROLES.INVESTOR]: 'bg-purple-500',
      [ROLES.DEVELOPER]: 'bg-yellow-500',
      [ROLES.IWC_PARTNER]: 'bg-teal-500',
      [ROLES.CLIENT]: 'bg-indigo-500'
    };
    return roleColors[user.role] || 'bg-indigo-500';
  };

  // Format role for display
  const formatRole = (role) => {
    if (!role) return '';
    return role
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav 
      className={`fixed w-full z-50 top-0 transition-all duration-300
        ${isScrolled ? 'bg-white/95 shadow-sm' : 'bg-white/90'} 
        backdrop-blur-md border-b border-gray-200`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <span className="text-xl font-semibold text-gray-900">
                IWB
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {/* Common links */}
              {commonNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-teal-600 px-1 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Role-specific links */}
              {user && getUserLinks().map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-teal-600 px-1 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User/Auth Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleMenu}
                      className="flex items-center max-w-xs rounded-full focus:outline-none"
                    >
                      <div className={`w-8 h-8 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-medium text-sm`}>
                        {getUserInitials()}
                      </div>
                    </button>
                  </div>

                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-2">
                        <p className="text-sm text-gray-900 truncate">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {formatRole(user.role)}
                        </p>
                      </div>
                      <button
                        onClick={handleDashboardClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Common links */}
            {commonNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Role-specific links */}
            {user && getUserLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-medium`}>
                    {getUserInitials()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name || user.email}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {formatRole(user.role)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-5 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-teal-600 bg-white border border-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 text-center text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {user && (
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
