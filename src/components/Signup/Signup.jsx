import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Add onSignupSuccess prop here
const SignUp = ({ onSignupSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (existingUsers.some(user => user.email === formData.email)) {
      setErrors({ email: 'Email already registered' });
      return;
    }
    
    // Create new user object
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      registeredOn: new Date().toISOString()
    };
    
    // Add to users array and save back to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Alert success and switch to login tab
    alert('Registration successful! Please login with your credentials.');
    
    // Use the onSignupSuccess prop to switch to login tab
    if (onSignupSuccess) {
      onSignupSuccess();
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-bold text-surface-light mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-surface-light mb-2">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-primary-800 text-surface-light rounded-lg
                       border ${errors.name ? 'border-red-500' : 'border-primary-700'}
                       focus:outline-none focus:border-interactive-hover transition-colors`}
              placeholder="Enter your name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-surface-light mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-primary-800 text-surface-light rounded-lg
                       border ${errors.email ? 'border-red-500' : 'border-primary-700'}
                       focus:outline-none focus:border-interactive-hover transition-colors`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-surface-light mb-2">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 bg-primary-800 text-surface-light rounded-lg
                       border ${errors.password ? 'border-red-500' : 'border-primary-700'}
                       focus:outline-none focus:border-interactive-hover transition-colors`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-content-light hover:text-surface-light"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-interactive-hover text-primary-900 rounded-lg font-medium
                   hover:bg-accent-light transition-colors duration-300"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
          </div>
        </div>

        {/* Login Link - now switches tab instead of navigating */}
        <div className="text-center mt-4">
          <p className="text-content-light">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onSignupSuccess} 
              className="text-interactive-hover hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;