import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaUserTie, FaUserCog, FaEnvelope, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SecurityBubbles from './animation/SecurityBubbles';
import { baseUrl } from '../utils/service';

const Signup = () => {
  const navigate = useNavigate();
  
  // Define available roles (removed CLIENT)
  const ROLES = {
    SALES: 'sales',
    FINANCE: 'finance',
    INVESTOR: 'investor',
    PARTNER: 'partner'
  };

  const ROLE_DESCRIPTIONS = {
    [ROLES.SALES]: 'Sales Personnel (Max 3) - Can access sales records',
    [ROLES.FINANCE]: 'Finance Personnel (Max 3) - Can access income statements',
    [ROLES.INVESTOR]: 'Investor - Read-only income statements',
    [ROLES.PARTNER]: 'Partner - Full solution access (except queries)'
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.SALES // Changed default role to SALES
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupStatus, setSignupStatus] = useState(null);
  const [roleCounts, setRoleCounts] = useState(null);
  const fullNameRef = useRef(null);

  useEffect(() => {
    fullNameRef.current.focus();
    
    const fetchRoleCounts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/auth/role-counts`);
        setRoleCounts(response.data);
      } catch (err) {
        console.error('Failed to fetch role counts:', err);
      }
    };
    
    fetchRoleCounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.role) newErrors.role = 'Role is required';
    
    if (roleCounts) {
      const role = formData.role;
      const currentCount = roleCounts[role] || 0;
      
      if (role === ROLES.SALES && currentCount >= 3) {
        newErrors.role = 'Maximum sales personnel (3) reached';
      } else if (role === ROLES.FINANCE && currentCount >= 3) {
        newErrors.role = 'Maximum finance personnel (3) reached';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField === 'fullName') fullNameRef.current.focus();
      else if (firstErrorField === 'email') e.target.email.focus();
      else if (firstErrorField === 'password') e.target.password.focus();
      else if (firstErrorField === 'confirmPassword') e.target.confirmPassword.focus();
      else if (firstErrorField === 'role') e.target.role.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.data.requiresEmailVerification) {
        setSignupStatus('requires_verification');
        toast.success(
          <div className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-2" size={20} />
            <span>Verification email sent! Please check your inbox.</span>
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        
        setTimeout(() => {
          navigate('/email-confirmation', { 
            state: { 
              email: formData.email,
              fullName: formData.fullName 
            } 
          });
        }, 3000);
      } else {
        setSignupStatus('success');
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" size={20} />
            <span>Account created successfully! Redirecting...</span>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }

    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      
      if (err.response?.data?.message === 'This email is already registered') {
        setErrors({ email: 'Email already exists' });
        toast.error('Email already registered. Please login instead.', {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (err.response?.data?.message === 'Invalid role specified') {
        setErrors({ role: 'Invalid role selected' });
        toast.error('Please select a valid role', {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(err.response?.data?.message || 'Signup failed. Please try again later.', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case ROLES.SALES: return <FaUserTie className="mr-2" />;
      case ROLES.FINANCE: return <FaUserShield className="mr-2" />;
      case ROLES.INVESTOR: return <FaUserCog className="mr-2" />;
      case ROLES.PARTNER: return <FaUserShield className="mr-2" />;
      default: return <FiUserPlus className="mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 relative">
      <ToastContainer />
      <SecurityBubbles />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100"
      >
        {signupStatus === 'requires_verification' ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FaEnvelope className="text-blue-500 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
            <p className="text-gray-600 mb-6">
              We've sent a confirmation link to <span className="font-semibold">{formData.email}</span>.
            </p>
            <p className="text-sm text-gray-500">
              Didn't receive the email? <button 
                className="text-blue-600 hover:underline"
                onClick={() => handleResendVerification(formData.email)}
              >
                Resend verification
              </button>
            </p>
          </div>
        ) : signupStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h1>
            <p className="text-gray-600">
              You're being redirected to your dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FiUserPlus className="text-blue-500 text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
              <p className="text-gray-600">Select your role to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  ref={fullNameRef}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent`}
                  placeholder="firstname lastname"
                />
                {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent`}
                >
                  <option value={ROLES.SALES}>Sales Personnel</option>
                  <option value={ROLES.FINANCE}>Finance Personnel</option>
                  <option value={ROLES.INVESTOR}>Investor</option>
                  <option value={ROLES.PARTNER}>Partner</option>
                </select>
                {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  {ROLE_DESCRIPTIONS[formData.role]}
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    {getRoleIcon(formData.role)}
                    Sign Up
                  </>
                )}
              </motion.button>
            </form>
            <div className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:underline"
              >
                Log in
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

// Helper function to resend verification email
const handleResendVerification = async (email) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/resend-verification`, { email });
    toast.success('Verification email resent successfully!', {
      position: "top-center",
      autoClose: 3000,
    });
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to resend verification email', {
      position: "top-center",
      autoClose: 3000,
    });
  }
};

export default Signup;
