import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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

    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Admin login credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    // Check if credentials are correct
    if (formData.email === adminEmail && formData.password === adminPassword) {
      localStorage.setItem('isAdmin', 'true'); // Set admin flag
      alert('Admin logged in successfully');
      window.location.href = '/admin'; // Redirect to admin dashboard
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-bold text-surface-light mb-6">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
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

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a href="#" className="text-sm text-content-light hover:text-surface-light transition-colors">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-interactive-hover text-primary-900 rounded-lg font-medium
                   hover:bg-accent-light transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
