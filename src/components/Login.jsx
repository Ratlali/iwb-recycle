import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogIn, FiLock, FiMail, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
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
    if (!formData.email) newErrors.email = 'Email is required';
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
        password: formData.password
      });

      const { token, user } = response.data;
      
      // Store token based on remember me
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));

      // Show success notification
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
          partner: '/iwc',
          developer: '/developer',
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
          errorMessage = 'Verification required. Please check your email.';
        } else if (err.response.status === 404) {
          errorMessage = 'Login endpoint not found';
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${baseUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ToastContainer />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <FiLock className="text-blue-500 text-2xl" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
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
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
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

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;