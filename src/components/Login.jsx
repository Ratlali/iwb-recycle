import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiEye, FiEyeOff, FiCheckCircle, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { baseUrl } from '../utils/service';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
        remember: rememberMe
      });

      const { token, user } = response.data;
      
      // Store token based on remember me
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));

      toast.success(
        <div className="flex items-center">
          <FiCheckCircle className="text-green-500 mr-2" size={20} />
          <span>Login successful! Redirecting...</span>
        </div>,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Enhanced role-based navigation
      setTimeout(() => {
        const dashboardPaths = {
          sales: '/sales-dashboard',
          finance: '/finance-dashboard',
          investor: '/investor-portal',
          partner: '/partner-dashboard',
          client: '/',
          developer: '/developer'
        };

        navigate(dashboardPaths[user.role] || '/dashboard');
      }, 2000);

    } catch (err) {
      console.error('Login failed:', err);
      
      let errorMessage = 'Login failed. Please try again.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Invalid email or password';
          setErrors({ password: errorMessage });
        } else if (err.response.status === 403) {
          errorMessage = 'Account not verified. Please check your email.';
        } else if (err.response.status === 429) {
          errorMessage = 'Too many attempts. Please try again later.';
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${baseUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={5000} />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Logo Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-5 px-6 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-white/90 p-2.5 rounded-lg shadow-md mb-3">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-blue-600">
                <rect width="36" height="36" rx="8" fill="currentColor"/>
                <path d="M14 24V12L22 18L14 24Z" fill="white"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">IWB Portal</h1>
            <p className="text-blue-100 mt-1 text-sm">Intelligent Business Solutions</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    autoComplete="username"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center shadow-md hover:shadow-lg ${
                isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2" /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-400">Or continue with</span>
              </div>
            </div>
          </div>

        
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;