import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaLock, 
  FaUserPlus,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

const EnhancedLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  // Floating animation for background elements
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Initialize floating elements positions
    const initialPositions = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setPositions(initialPositions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login successful:', formData);
      // Add your success logic here
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Bubbles */}
        {positions.map((pos) => (
          <div
            key={pos.id}
            className="absolute w-6 h-6 bg-white/10 rounded-full animate-float"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${15 + pos.id * 2}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/15 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md">
        {/* Card with Glass Effect */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-105">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500/90 to-indigo-600/90 p-8 text-center relative overflow-hidden">
            {/* Header Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative">
              <h1 className="text-4xl font-bold text-white mb-3 animate-fade-in-down">
                Welcome Back
              </h1>
              <p className="text-blue-100/90 text-lg font-light animate-fade-in-up">
                Sign in to continue access
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full"></div>
          </div>
          
          {/* Login Form */}
          <div className="p-8">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3 animate-shake">
                <FaExclamationCircle className="text-red-400 flex-shrink-0 text-lg" />
                <span className="text-red-700 text-sm font-medium">{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
                    isFocused.email || formData.email ? 'transform -translate-y-1 scale-110' : ''
                  }`}>
                    <FaEnvelope className={`h-5 w-5 transition-colors duration-300 ${
                      errors.email ? 'text-red-400' : 
                      isFocused.email ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-200 focus:border-red-400' 
                        : 'border-gray-200 bg-white/80 focus:ring-blue-200 focus:border-blue-400'
                    } backdrop-blur-sm`}
                    placeholder="Enter your email"
                  />
                  {formData.email && !errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center animate-scale-in">
                      <FaCheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm flex items-center space-x-2 animate-fade-in">
                    <FaExclamationCircle className="flex-shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
              
              {/* Password Field */}
              <div className="space-y-3">
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
                    isFocused.password || formData.password ? 'transform -translate-y-1 scale-110' : ''
                  }`}>
                    <FaLock className={`h-5 w-5 transition-colors duration-300 ${
                      errors.password ? 'text-red-400' : 
                      isFocused.password ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className={`block w-full pl-12 pr-12 py-4 border-2 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-300 bg-red-50/50 focus:ring-red-200 focus:border-red-400' 
                        : 'border-gray-200 bg-white/80 focus:ring-blue-200 focus:border-blue-400'
                    } backdrop-blur-sm`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? 
                      <FaEyeSlash className="h-5 w-5" /> : 
                      <FaEye className="h-5 w-5" />
                    }
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm flex items-center space-x-2 animate-fade-in">
                    <FaExclamationCircle className="flex-shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>
              
              {/* Sign In Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-lg font-semibold text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform ${
                    isLoading 
                      ? 'bg-blue-400 cursor-not-allowed scale-95' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl active:scale-95'
                  } shadow-lg`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Signing In...
                    </>
                  ) : (
                    <span className="flex items-center space-x-2">
                      {/* <FaLock className="h-4 w-4" /> */}
                      <span>Sign In</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
            
            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-white/80 text-sm">
                Don't have an account?{' '}
                <a 
                  href="#" 
                  className="font-semibold text-white hover:text-blue-200 inline-flex items-center space-x-2 transition-all duration-300 group"
                >
                  <FaUserPlus className="transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="border-b border-transparent group-hover:border-white/50 transition-all duration-300">
                    Create your account
                  </span>
                </a>
              </p>
            </div>
          </div>
          
          {/* Enhanced Footer */}
          <div className="bg-white/5 px-8 py-4 text-center border-t border-white/10">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-700"></div>
              <p className="text-white/70 text-sm font-medium"></p>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-500"></div>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLogin;