import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

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

  // Common navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" }
  ];

  // Role-specific dashboard paths
  const roleDashboardPaths = {
    SALES: "/sales-dashboard",
    FINANCE: "/finance-dashboard",
    INVESTOR: "/investor-portal",
    DEVELOPER: "/dev-console",
    IWC_PARTNER: "/partner-dashboard"
  };

  // Role-specific navigation links
  const roleBasedLinks = {
    SALES: [
      { path: "/sales-dashboard", label: "Sales Dashboard" },
      { path: "/client-queries", label: "Client Queries" }
    ],
    FINANCE: [
      { path: "/finance-dashboard", label: "Financial Reports" },
      { path: "/income-statements", label: "Income Statements" }
    ],
    INVESTOR: [
      { path: "/investor-portal", label: "Investor Portal" }
    ],
    DEVELOPER: [
      { path: "/dev-console", label: "Developer Console" }
    ],
    IWC_PARTNER: [
      { path: "/partner-dashboard", label: "Partner Dashboard" },
      { path: "/analytics", label: "Analytics" }
    ]
  };

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user) return '/';
    return roleDashboardPaths[user.role] || '/';
  };

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    const dashboardPath = getDashboardPath();
    setIsMenuOpen(false);
    navigate(dashboardPath);
  };

  // Get links for current user role
  const getUserLinks = () => {
    if (!user) return [];
    return roleBasedLinks[user.role] || [];
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user) return '';
    const nameParts = user.name ? user.name.split(' ') : user.email.split('@')[0].split('.');
    return nameParts
      .map(part => part.charAt(0).toUpperCase()
      .join('')
      .substring(0, 2));
  };

  // Get avatar color based on user role
  const getAvatarColor = () => {
    if (!user) return 'bg-gray-400';
    const roleColors = {
      SALES: 'bg-blue-500',
      FINANCE: 'bg-green-500',
      INVESTOR: 'bg-purple-500',
      DEVELOPER: 'bg-yellow-500',
      IWC_PARTNER: 'bg-teal-500'
    };
    return roleColors[user.role] || 'bg-indigo-500';
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
              {/* <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-teal-600"
              >
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
              </svg> */}
              <span className="text-xl font-semibold text-gray-900">
                IWB
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-teal-600 px-1 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

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
                          {user.role.replace('_', ' ')}
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
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors duration-200"
                >
                  Sign In
                </Link>
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

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
                    {user.role.replace('_', ' ')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-5">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
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