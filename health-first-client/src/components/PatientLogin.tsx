import React, { useState } from 'react';
import './PatientLogin.css';

interface PatientLoginProps {
  onLogin: (credentials: { email: string; password: string; rememberMe: boolean }) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  isLoading?: boolean;
  error?: string;
}

const PatientLogin: React.FC<PatientLoginProps> = ({
  onLogin,
  onForgotPassword,
  onRegister,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (email.includes('@')) {
      return emailRegex.test(email);
    } else {
      return phoneRegex.test(email.replace(/\D/g, ''));
    }
  };

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email or phone number is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email or phone number';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="patient-login-container">
      <div className="login-background">
        <div className="healing-pattern"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="healing-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" fill="white"/>
                <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="white"/>
              </svg>
            </div>
            <h1 className="app-title">Health First</h1>
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to access your health records and appointments</p>
        </div>

        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email or Phone Number</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <input
                type="text"
                id="email"
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email or phone number"
                autoComplete="email"
              />
            </div>
            {validationErrors.email && (
              <div className="validation-error">{validationErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`form-input ${validationErrors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {showPassword ? (
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  ) : (
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  )}
                </svg>
              </button>
            </div>
            {validationErrors.password && (
              <div className="validation-error">{validationErrors.password}</div>
            )}
          </div>

          <div className="form-options">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="rememberMe"
                className="checkbox-input"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              />
              <label htmlFor="rememberMe" className="checkbox-custom"></label>
              <label htmlFor="rememberMe" className="checkbox-label">
                Remember me
              </label>
            </div>
            
            <button
              type="button"
              className="forgot-password-link"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <button type="button" className="register-link" onClick={onRegister}>
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin; 