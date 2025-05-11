import React, { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiTarget,
  FiBarChart2,
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';

const SalesDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sales menu items
  const menuItems = [
    { name: 'Overview', icon: <FiHome />, id: 'overview' },
    { name: 'Report', icon: <FiUsers />, id: 'report' },

  ];

  // Sales metrics data
  const salesMetrics = [
    { title: 'Leads This Week', value: 142, change: '+18%', trend: 'up', target: 150 },
    { title: 'Deals Closed', value: 28, change: '+5%', trend: 'up', target: 30 },
    { title: 'Monthly Revenue', value: '$245,382', change: '+12%', trend: 'up' },
    { title: 'Conversion Rate', value: '19%', change: '+3%', trend: 'up' }
  ];

  // Recent activities data
  const recentActivities = [
    { deal: 'Deal #1001', client: 'Acme Inc', amount: 'M12,500.00', stage: 'Closed', days: 1 },
    { deal: 'Deal #1002', client: 'Globex Corp', amount: 'M25,000.00', stage: 'Negotiation', days: 2 },
    { deal: 'Deal #1003', client: 'Initech', amount: 'M37,500.00', stage: 'Proposal', days: 3 },
    { deal: 'Deal #1004', client: 'Umbrella', amount: 'M50,000.00', stage: 'Qualified', days: 1 },
    { deal: 'Deal #1005', client: 'Wayne Ent', amount: 'M62,500.00', stage: 'New', days: 0 }
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-30 w-64 h-full transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-2">
              <FiTrendingUp size={18} />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">SalesPulse</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500'
                      : darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className={`mr-3 ${activeTab === item.id ? 'text-blue-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`fixed w-full z-20 border-b ${darkMode ? 'border-gray-700 bg-gray-800/90' : 'border-gray-200 bg-white/90'} backdrop-blur-sm`}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 md:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Sales Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <div className="relative">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 relative">
                  <FiBell size={20} />
                  {hasNotifications && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <FiUser size={16} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800" />
                  </div>
                  <span className="hidden md:inline text-gray-700 dark:text-gray-300">Sales Team</span>
                  <FiChevronDown className={`transition-transform ${userMenuOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border`}>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      Your Profile
                    </a>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      Settings
                    </a>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-16 pb-4 px-4 md:px-6">
          {/* Filter Bar */}
          <div className={`flex flex-wrap items-center justify-between mb-6 p-4 rounded-xl ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-sm`}>
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                This Month
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                My Team
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                By Region
              </button>
            </div>
            <button className="flex items-center text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
              <FiRefreshCw className="mr-1" /> Refresh Data
            </button>
          </div>

          {/* Sales Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {salesMetrics.map((metric, index) => (
              <div key={index} className={`p-6 rounded-xl shadow-sm border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{metric.title}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</p>
                  <span className={`flex items-center text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change}
                    {metric.trend === 'up' ? (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </div>
                {metric.target && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" 
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className={`p-6 rounded-xl shadow-sm border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Leads Overview</h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                  View All
                </button>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>

            <div className={`p-6 rounded-xl shadow-sm border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Revenue Trends</h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                  View All
                </button>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Full Width Chart Placeholder */}
          <div className={`p-6 rounded-xl shadow-sm border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } mb-8`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Conversion Funnel</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                View Details
              </button>
            </div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* Recent Activities */}
          <div className={`p-6 rounded-xl shadow-sm border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activities</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                See All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Deal</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Client</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Amount</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Stage</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivities.map((activity, i) => (
                    <tr key={i}>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>{activity.deal}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>{activity.client}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {activity.amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.stage === 'Closed' 
                            ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                            : activity.stage === 'Negotiation'
                              ? darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                              : darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.stage}
                        </span>
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{activity.days} day{activity.days !== 1 ? 's' : ''} ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesDashboard;