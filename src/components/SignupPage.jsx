import React, { useState, useEffect, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiCheck, FiUserPlus, FiShield, FiBriefcase, FiSettings, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/service';

const Signup = () => {
  const navigate = useNavigate();
  
  // Define available roles
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
    role: ROLES.SALES
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
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

      toast.success(
        <div className="flex items-center">
          <FiMail className="text-blue-500 mr-2" size={20} />
          <span>Account created! Check your email to confirm your account.</span>
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
      
      setSignupSuccess(true);
      
      setTimeout(() => {
        navigate('/email-confirmation', { state: { email: formData.email } });
      }, 3000);

    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      if (err.response?.data?.message === 'Email already registered') {
        setErrors({ email: 'Email already exists' });
        toast.error('Email already registered', {
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
      case ROLES.SALES: return <FiBriefcase className="mr-2" />;
      case ROLES.FINANCE: return <FiShield className="mr-2" />;
      case ROLES.INVESTOR: return <FiSettings className="mr-2" />;
      default: return <FiUserPlus className="mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ToastContainer />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        {signupSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FiMail className="text-blue-500 text-3xl" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Check Your Email!</h1>
            <p className="text-gray-600">
              We've sent a confirmation link to {formData.email}. Please verify your email to complete registration.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FiUserPlus className="text-blue-500 text-2xl" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create an Account</h1>
              <p className="text-gray-500">Select your role to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    ref={fullNameRef}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="name lastname"
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCheck className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    {getRoleIcon(formData.role)}
                    <span>Sign Up</span>
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;