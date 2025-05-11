import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';

// Import images
import circuitBoard from '../assets/2.svg';
import teamWorking from '../assets/1.jpg';
import techRecycling from '../assets/2.jpg';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block mb-4">Innovative</span>
                <span className="text-blue-600">E-Waste Solutions</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Transforming electronic waste into sustainable opportunities through cutting-edge recycling technologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/services"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
                >
                  Explore Services
                </Link>
                <Link
                  to="/aboutus"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={circuitBoard} 
                  alt="Circuit board recycling process"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center">
          <div className="inline-block px-8 py-2 mb-8 bg-blue-100 rounded-full text-blue-600 font-medium">
            By The Numbers
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Our Impact in Southern Africa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-bold text-blue-600 mb-4">300+</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tons Recycled</h3>
              <p className="text-gray-600">Electronic waste processed</p>
            </div>
            
            <div className="bg-amber-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-bold text-amber-600 mb-4">98%</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Recovery Rate</h3>
              <p className="text-gray-600">Materials reclaimed</p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="text-5xl font-bold text-green-600 mb-4">50+</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Jobs Created</h3>
              <p className="text-gray-600">Local employment opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <img 
                src={techRecycling} 
                alt="Technology recycling process"
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-6 py-2 bg-blue-100 rounded-full text-blue-600 font-medium">
                Our Process
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900">
                Sustainable Technology Recycling
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Collection</h3>
                    <p className="text-gray-600">
                      Secure collection points with certified data destruction protocols.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-medium">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Processing</h3>
                    <p className="text-gray-600">
                      Advanced separation techniques for maximum material recovery.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Refinement</h3>
                    <p className="text-gray-600">
                      Transforming materials into industrial-grade inputs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-blue-100 rounded-full text-blue-600 font-medium mb-4">
              Leadership
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving Africa's e-waste revolution with expertise and vision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={teamWorking} 
                    alt="Kenneth, Co-Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Kenneth</h3>
                  <div className="text-blue-600 font-medium mb-4">Co-Founder & CEO</div>
                  <p className="text-gray-600 mb-4">
                    Electrical engineer and sustainability expert who developed our proprietary recycling technology.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Founded with M100,000 initial investment
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={teamWorking} 
                    alt="Shadrack, Co-Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Shadrack</h3>
                  <div className="text-blue-600 font-medium mb-4">Co-Founder & COO</div>
                  <p className="text-gray-600 mb-4">
                    Business strategist driving our operational expansion across African markets.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Expanded to 3 countries in 2 years
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* CTA Section - New Layout */}
<div className="bg-gradient-to-r from-blue-500 to-teal-500 py-16">
  <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Text Content */}
        <div className="lg:w-2/3 p-12 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be Part of the<br />
            <span className="text-yellow-300">E-Waste Solution</span>
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Join businesses, investors, and partners who are transforming electronic waste into sustainable opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
            >
              Get Started Today
            </Link>
          </div>
        </div>

        {/* Visual Element */}
        <div className="lg:w-1/3 bg-white p-8 flex items-center justify-center">
          <div className="relative w-full h-full min-h-[200px]">
            <div className="absolute inset-0 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
              +98%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <Footer />
    </div>
  );
};

export default LandingPage;