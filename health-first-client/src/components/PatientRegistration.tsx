import React, { useState } from 'react';
import './PatientRegistration.css';

interface PatientRegistrationProps {
  onRegister: (formData: PatientRegistrationFormData) => void;
  onBackToLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface PatientRegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Emergency Contact (Optional)
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  
  // Account Security
  password: string;
  confirmPassword: string;
  
  // Terms
  acceptTerms: boolean;
}

const genderOptions = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say'
];

const relationshipOptions = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Friend',
  'Other'
];

const PatientRegistration: React.FC<PatientRegistrationProps> = ({
  onRegister,
  onBackToLogin,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState<PatientRegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [validationErrors, setValidationErrors] = useState<Partial<PatientRegistrationFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^A-Za-z0-9]/.test(password);
  };

  const validateAge = (dateOfBirth: string): boolean => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 13;
    }
    return age >= 13;
  };

  const validateForm = (): boolean => {
    const errors: Partial<PatientRegistrationFormData> = {};

    // Personal Information
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.length > 50) {
      errors.firstName = 'First name must be less than 50 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.length > 50) {
      errors.lastName = 'Last name must be less than 50 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else if (!validateAge(formData.dateOfBirth)) {
      errors.dateOfBirth = 'You must be at least 13 years old to register';
    }

    if (!formData.gender) {
      errors.gender = 'Gender selection is required';
    }

    // Address
    if (!formData.streetAddress.trim()) {
      errors.streetAddress = 'Street address is required';
    } else if (formData.streetAddress.length > 200) {
      errors.streetAddress = 'Street address must be less than 200 characters';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    } else if (formData.city.length > 100) {
      errors.city = 'City must be less than 100 characters';
    }

    if (!formData.state.trim()) {
      errors.state = 'State/Province is required';
    } else if (formData.state.length > 50) {
      errors.state = 'State/Province must be less than 50 characters';
    }

    if (!formData.zipCode.trim()) {
      errors.zipCode = 'ZIP/Postal code is required';
    }

    // Emergency Contact (Optional but if provided, validate)
    if (formData.emergencyContactName.trim() && !formData.emergencyPhone.trim()) {
      errors.emergencyPhone = 'Emergency phone number is required if emergency contact name is provided';
    }

    if (formData.emergencyPhone.trim() && !validatePhone(formData.emergencyPhone)) {
      errors.emergencyPhone = 'Please enter a valid emergency phone number';
    }

    if (formData.emergencyContactName.trim() && formData.emergencyContactName === `${formData.firstName} ${formData.lastName}`.trim()) {
      errors.emergencyContactName = 'Emergency contact cannot be the same as the patient';
    }

    // Account Security
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Terms
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
    }
  };

  const handleInputChange = (field: keyof PatientRegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (!password) return { strength: '', color: '' };
    if (validatePassword(password)) return { strength: 'Strong', color: '#22c55e' };
    if (password.length >= 6) return { strength: 'Medium', color: '#f59e0b' };
    return { strength: 'Weak', color: '#ef4444' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="patient-registration-container">
      <div className="registration-background">
        <div className="healing-pattern"></div>
      </div>
      
      <div className="registration-card">
        <div className="registration-header">
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
          <h2 className="registration-title">Create Your Account</h2>
          <p className="registration-subtitle">Join our health portal to access your medical records and appointments</p>
        </div>

        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {error}
          </div>
        )}

        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  className={`form-input ${validationErrors.firstName ? 'error' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  maxLength={50}
                />
                {validationErrors.firstName && (
                  <div className="validation-error">{validationErrors.firstName}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  className={`form-input ${validationErrors.lastName ? 'error' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  maxLength={50}
                />
                {validationErrors.lastName && (
                  <div className="validation-error">{validationErrors.lastName}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${validationErrors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
                {validationErrors.email && (
                  <div className="validation-error">{validationErrors.email}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <input
                    type="tel"
                    id="phone"
                    className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </div>
                {validationErrors.phone && (
                  <div className="validation-error">{validationErrors.phone}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  className={`form-input ${validationErrors.dateOfBirth ? 'error' : ''}`}
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                {validationErrors.dateOfBirth && (
                  <div className="validation-error">{validationErrors.dateOfBirth}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  className={`form-input ${validationErrors.gender ? 'error' : ''}`}
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {validationErrors.gender && (
                  <div className="validation-error">{validationErrors.gender}</div>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="form-section">
            <h3 className="section-title">Address</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="streetAddress">Street Address *</label>
              <input
                type="text"
                id="streetAddress"
                className={`form-input ${validationErrors.streetAddress ? 'error' : ''}`}
                value={formData.streetAddress}
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                placeholder="Enter your street address"
                maxLength={200}
              />
              {validationErrors.streetAddress && (
                <div className="validation-error">{validationErrors.streetAddress}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  className={`form-input ${validationErrors.city ? 'error' : ''}`}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                  maxLength={100}
                />
                {validationErrors.city && (
                  <div className="validation-error">{validationErrors.city}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="state">State/Province *</label>
                <input
                  type="text"
                  id="state"
                  className={`form-input ${validationErrors.state ? 'error' : ''}`}
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter your state"
                  maxLength={50}
                />
                {validationErrors.state && (
                  <div className="validation-error">{validationErrors.state}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="zipCode">ZIP/Postal Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  className={`form-input ${validationErrors.zipCode ? 'error' : ''}`}
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="Enter ZIP code"
                />
                {validationErrors.zipCode && (
                  <div className="validation-error">{validationErrors.zipCode}</div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="form-section">
            <h3 className="section-title">Emergency Contact (Optional)</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="emergencyContactName">Emergency Contact Name</label>
                <input
                  type="text"
                  id="emergencyContactName"
                  className={`form-input ${validationErrors.emergencyContactName ? 'error' : ''}`}
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  placeholder="Enter emergency contact name"
                  maxLength={100}
                />
                {validationErrors.emergencyContactName && (
                  <div className="validation-error">{validationErrors.emergencyContactName}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="emergencyRelationship">Relationship</label>
                <select
                  id="emergencyRelationship"
                  className="form-input"
                  value={formData.emergencyRelationship}
                  onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)}
                >
                  <option value="">Select relationship</option>
                  {relationshipOptions.map(relationship => (
                    <option key={relationship} value={relationship}>{relationship}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="emergencyPhone">Emergency Phone Number</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <input
                  type="tel"
                  id="emergencyPhone"
                  className={`form-input ${validationErrors.emergencyPhone ? 'error' : ''}`}
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  placeholder="Enter emergency phone number"
                />
              </div>
              {validationErrors.emergencyPhone && (
                <div className="validation-error">{validationErrors.emergencyPhone}</div>
              )}
            </div>
          </div>

          {/* Account Security Section */}
          <div className="form-section">
            <h3 className="section-title">Account Security</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password *</label>
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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
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
                {formData.password && (
                  <div className="password-strength" style={{ color: passwordStrength.color }}>
                    Password strength: {passwordStrength.strength}
                  </div>
                )}
                {validationErrors.password && (
                  <div className="validation-error">{validationErrors.password}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                  </svg>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      {showConfirmPassword ? (
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      ) : (
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      )}
                    </svg>
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <div className="validation-error">{validationErrors.confirmPassword}</div>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-section">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="acceptTerms"
                className="checkbox-input"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              />
              <label htmlFor="acceptTerms" className="checkbox-custom"></label>
              <label htmlFor="acceptTerms" className="checkbox-label">
                I agree to the <button type="button" className="link-button">Terms of Service</button> and{' '}
                <button type="button" className="link-button">Privacy Policy</button> *
              </label>
            </div>
            {validationErrors.acceptTerms && (
              <div className="validation-error">{validationErrors.acceptTerms}</div>
            )}
          </div>

          <button
            type="submit"
            className={`registration-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="registration-footer">
          <p className="footer-text">
            Already have an account?{' '}
            <button type="button" className="login-link" onClick={onBackToLogin}>
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration; 