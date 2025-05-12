import React, { useState } from 'react';
import {
  FiHome,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiTarget,
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SalesDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [reportGenerating, setReportGenerating] = useState(false);

  // Sample sales data with enhanced structure
  const salesData = [
    { 
      date: '2025-04-11', 
      revenue: 17234.34, 
      cost: 10405, 
      profit: 6829.34, 
      losses: 0,
      products: [
        { name: 'DDR4 RAM 16GB', units: 3, revenue: 2699.97, cost: 1350 },
        { name: 'Refurbished Motherboard', units: 3, revenue: 5251.5, cost: 3600 }
      ]
    },
    { 
      date: '2025-04-12', 
      revenue: 42359.13, 
      cost: 28669, 
      profit: 13690.13, 
      losses: 1925,
      products: [
        { name: 'Refurbished Laptop', units: 7, revenue: 25350, cost: 19500, losses: 1750 },
        { name: 'Intel Core i7 CPU', units: 6, revenue: 7637.5, cost: 5200 }
      ]
    },
    // Additional days would follow same structure
  ];

  // Calculate totals
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalCost = salesData.reduce((sum, day) => sum + day.cost, 0);
  const totalProfit = salesData.reduce((sum, day) => sum + day.profit, 0);
  const totalLosses = salesData.reduce((sum, day) => sum + day.losses, 0);
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(2) : 0;

  // Sales metrics data
  const salesMetrics = [
    { 
      title: 'Total Revenue', 
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12%', 
      trend: 'up',
      icon: <FiDollarSign className="text-blue-500" />
    },
    { 
      title: 'Total Profit', 
      value: `$${totalProfit.toLocaleString()}`,
      change: '+8%', 
      trend: 'up',
      icon: <FiTrendingUp className="text-green-500" />
    },
    { 
      title: 'Total Losses', 
      value: `$${totalLosses.toLocaleString()}`,
      change: '-2%', 
      trend: 'down',
      icon: <FiTarget className="text-red-500" />
    },
    { 
      title: 'Profit Margin', 
      value: `${profitMargin}%`,
      change: '+1.5%', 
      trend: 'up',
      icon: <FiBarChart2 className="text-purple-500" />
    }
  ];

  // Chart data configurations
  const financialTrendsData = {
    labels: salesData.map(item => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: salesData.map(item => item.revenue),
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: 'Cost',
        data: salesData.map(item => item.cost),
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: 'Profit',
        data: salesData.map(item => item.profit),
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 2,
        tension: 0.3
      }
    ]
  };

  const profitLossComparisonData = {
    labels: salesData.map(item => item.date),
    datasets: [
      {
        label: 'Profit',
        data: salesData.map(item => item.profit),
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 2
      },
      {
        label: 'Losses',
        data: salesData.map(item => item.losses),
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        borderWidth: 2
      }
    ]
  };

  // Generate report function
  const generateReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
      setReportGenerating(false);
      // In a real app, this would generate a PDF or CSV
      alert('Report generated successfully!');
    }, 1500);
  };

  // Menu items
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, id: 'overview' },
    { name: 'Revenue', icon: <FiDollarSign />, id: 'revenue' }
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-30 w-64 h-full transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-white mr-2">
              <FiTrendingUp size={18} />
            </div>
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">SalesInsight</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium'
                      : darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`sticky top-0 z-20 border-b ${
          darkMode ? 'border-gray-700 bg-gray-800/90' : 'border-gray-200 bg-white/90'
        } backdrop-blur-sm`}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 md:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Financial Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {['week', 'month', 'quarter'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === range 
                        ? 'bg-indigo-600 text-white'
                        : darkMode 
                          ? 'text-gray-300 hover:bg-gray-600' 
                          : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <button
                onClick={() => setHasNotifications(false)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 relative"
              >
                <FiBell size={20} />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <FiUser size={16} />
                  </div>
                  <FiChevronDown className={`transition-transform ${
                    userMenuOpen ? 'transform rotate-180' : ''
                  }`} />
                </button>

                {userMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border`}>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>Profile</a>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>Settings</a>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-16 pb-4 px-4 md:px-6">
          {/* Filters and Actions */}
          <div className={`flex flex-wrap items-center justify-between mb-6 p-4 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-500" />
                <select className={`text-sm rounded-md ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                } p-2`}>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This quarter</option>
                </select>
              </div>
              <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-400">
                <FiRefreshCw className="mr-1" /> Refresh
              </button>
            </div>
            
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button 
                onClick={generateReport}
                disabled={reportGenerating}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {reportGenerating ? (
                  <>
                    <FiRefreshCw className="animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FiDownload className="mr-2" />
                    Export
                  </>
                )}
              </button>
              <button className="flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                <FiPrinter className="mr-2" />
                Print
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {salesMetrics.map((metric, index) => (
              <div key={index} className={`p-5 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                    <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {metric.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">vs last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Financial Trends */}
            <div className={`p-5 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Financial Trends</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-400">
                  View Details
                </button>
              </div>
              <div className="h-80">
                <Line 
                  data={financialTrendsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: darkMode ? '#E5E7EB' : '#374151'
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          color: darkMode ? '#9CA3AF' : '#6B7280'
                        }
                      },
                      y: {
                        grid: {
                          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          color: darkMode ? '#9CA3AF' : '#6B7280'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Profit vs Losses */}
            <div className={`p-5 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Profit vs Losses</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-400">
                  View Details
                </button>
              </div>
              <div className="h-80">
                <Bar 
                  data={profitLossComparisonData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: darkMode ? '#E5E7EB' : '#374151'
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          color: darkMode ? '#9CA3AF' : '#6B7280'
                        }
                      },
                      y: {
                        grid: {
                          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          color: darkMode ? '#9CA3AF' : '#6B7280'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className={`p-5 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-400">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Date</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Products</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Revenue</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Profit</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {salesData.map((day, i) => (
                    <tr key={i}>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>{day.date}</td>
                      <td className={`px-4 py-3 text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>
                        {day.products.slice(0, 2).map(p => p.name).join(', ')}
                        {day.products.length > 2 && ` +${day.products.length - 2} more`}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>${day.revenue.toLocaleString()}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                        day.profit > 0 
                          ? (darkMode ? 'text-green-400' : 'text-green-600')
                          : (darkMode ? 'text-red-400' : 'text-red-600')
                      }`}>${day.profit.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          day.losses > 0
                            ? darkMode 
                              ? 'bg-red-900 text-red-200' 
                              : 'bg-red-100 text-red-800'
                            : darkMode 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {day.losses > 0 ? 'With Losses' : 'Successful'}
                        </span>
                      </td>
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
