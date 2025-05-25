// components/Login/Login.jsx
import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = ({ onLogin, onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

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
    // Clear any general login error when user starts typing again
    if (loginError) setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate network request with a small delay
    setTimeout(() => {
      // Admin login credentials
      const adminEmail = 'admin@gmail.com';
      const adminPassword = 'admin123';

      // Check if admin credentials
      if (formData.email === adminEmail && formData.password === adminPassword) {
        localStorage.setItem('isAdmin', 'true'); // Set admin flag
        localStorage.setItem('user', JSON.stringify({ 
          email: adminEmail,
          name: 'Admin',
          isAdmin: true
        }));
        onLogin({ email: adminEmail, name: 'Admin', isAdmin: true });
        window.location.href = '/admin'; // Redirect to admin dashboard
        return;
      }

      // Check registered users in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(user => user.email === formData.email);
      
      if (user && user.password === formData.password) {
        // Save to current user in localStorage for ProfileDrawer
        localStorage.setItem('user', JSON.stringify({ 
          email: user.email, 
          name: user.name,
          id: user.id 
        }));
        // Also save to currentUser for other components that might use it
        localStorage.setItem('currentUser', JSON.stringify({ 
          email: user.email, 
          name: user.name,
          id: user.id 
        }));
        setIsLoading(false);
        onLogin({ email: user.email, name: user.name });
      } else {
        setIsLoading(false);
        setLoginError('Invalid credentials or user not registered');
      }
    }, 600);
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-bold text-surface-light mb-6">Welcome Back</h2>
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-lg">
          {loginError}
        </div>
      )}
      
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
              disabled={isLoading}
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
              disabled={isLoading}
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
          disabled={isLoading}
          className={`w-full py-3 relative ${
            isLoading 
              ? 'bg-interactive-muted cursor-not-allowed' 
              : 'bg-interactive-hover hover:bg-accent-light cursor-pointer'
          } text-primary-900 rounded-lg font-medium transition-colors duration-300`}
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Login</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-primary-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            'Login'
          )}
        </button>
        
        {/* Register Link - Modified to use onRegisterClick */}
        <div className="text-center mt-4">
          <p className="text-content-light">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={onRegisterClick}
              className="text-interactive-hover hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;