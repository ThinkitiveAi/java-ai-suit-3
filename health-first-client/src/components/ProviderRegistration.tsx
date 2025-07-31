import React, { useState } from 'react';
import './ProviderRegistration.css';

interface ProviderRegistrationProps {
  onRegister: (formData: RegistrationFormData) => void;
  onBackToLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  specialization: string;
  yearsOfExperience: number;
  clinicAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  licenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: string;
  clinicAddress?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const specializations = [
  'ONCOLOGY',
  'HEMATOLOGY',
  'GASTROENTEROLOGY',
  'ORTHOPEDIC_SURGERY',
  'PSYCHIATRY',
  'PHYSICIAN_ASSISTANT',
  'RADIOLOGY',
  'PEDIATRICS',
  'PLASTIC_SURGERY',
  'ANESTHESIOLOGY',
  'NURSE_PRACTITIONER',
  'GENERAL_SURGERY',
  'OBSTETRICS_GYNECOLOGY',
  'NEPHROLOGY',
  'PHYSICAL_MEDICINE',
  'OTOLARYNGOLOGY',
  'RHEUMATOLOGY',
  'CARDIOLOGY',
  'NEUROLOGY',
  'DERMATOLOGY',
  'INFECTIOUS_DISEASE',
  'NEUROSURGERY',
  'INTERNAL_MEDICINE',
  'OPHTHALMOLOGY',
  'PATHOLOGY',
  'ALLERGY_IMMUNOLOGY',
  'UROLOGY',
  'EMERGENCY_MEDICINE',
  'OTHER',
  'FAMILY_MEDICINE',
  'PULMONOLOGY'
];

// Helper function to convert API values to display names
const getSpecializationDisplayName = (apiValue: string): string => {
  const displayNames: { [key: string]: string } = {
    'ONCOLOGY': 'Oncology',
    'HEMATOLOGY': 'Hematology',
    'GASTROENTEROLOGY': 'Gastroenterology',
    'ORTHOPEDIC_SURGERY': 'Orthopedic Surgery',
    'PSYCHIATRY': 'Psychiatry',
    'PHYSICIAN_ASSISTANT': 'Physician Assistant',
    'RADIOLOGY': 'Radiology',
    'PEDIATRICS': 'Pediatrics',
    'PLASTIC_SURGERY': 'Plastic Surgery',
    'ANESTHESIOLOGY': 'Anesthesiology',
    'NURSE_PRACTITIONER': 'Nurse Practitioner',
    'GENERAL_SURGERY': 'General Surgery',
    'OBSTETRICS_GYNECOLOGY': 'Obstetrics & Gynecology',
    'NEPHROLOGY': 'Nephrology',
    'PHYSICAL_MEDICINE': 'Physical Medicine',
    'OTOLARYNGOLOGY': 'Otolaryngology',
    'RHEUMATOLOGY': 'Rheumatology',
    'CARDIOLOGY': 'Cardiology',
    'NEUROLOGY': 'Neurology',
    'DERMATOLOGY': 'Dermatology',
    'INFECTIOUS_DISEASE': 'Infectious Disease',
    'NEUROSURGERY': 'Neurosurgery',
    'INTERNAL_MEDICINE': 'Internal Medicine',
    'OPHTHALMOLOGY': 'Ophthalmology',
    'PATHOLOGY': 'Pathology',
    'ALLERGY_IMMUNOLOGY': 'Allergy & Immunology',
    'UROLOGY': 'Urology',
    'EMERGENCY_MEDICINE': 'Emergency Medicine',
    'OTHER': 'Other',
    'FAMILY_MEDICINE': 'Family Medicine',
    'PULMONOLOGY': 'Pulmonology'
  };
  
  return displayNames[apiValue] || apiValue;
};

const ProviderRegistration: React.FC<ProviderRegistrationProps> = ({
  onRegister,
  onBackToLogin,
  isLoading = false,
  error
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    licenseNumber: '',
    specialization: '',
    yearsOfExperience: 0,
    clinicAddress: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
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

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Personal Information
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    // Professional Information
    if (!formData.licenseNumber.trim()) errors.licenseNumber = 'Medical license number is required';
    if (!formData.specialization) errors.specialization = 'Specialization is required';
    if (formData.yearsOfExperience <= 0) errors.yearsOfExperience = 'Years of experience is required';

    // Clinic Address
    if (!formData.clinicAddress.street.trim()) {
      if (!errors.clinicAddress) errors.clinicAddress = {};
      errors.clinicAddress.street = 'Street address is required';
    }
    if (!formData.clinicAddress.city.trim()) {
      if (!errors.clinicAddress) errors.clinicAddress = {};
      errors.clinicAddress.city = 'City is required';
    }
    if (!formData.clinicAddress.state.trim()) {
      if (!errors.clinicAddress) errors.clinicAddress = {};
      errors.clinicAddress.state = 'State is required';
    }
    if (!formData.clinicAddress.zip.trim()) {
      if (!errors.clinicAddress) errors.clinicAddress = {};
      errors.clinicAddress.zip = 'ZIP code is required';
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
    if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
    }
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddressChange = (field: keyof RegistrationFormData['clinicAddress'], value: string) => {
    setFormData(prev => ({
      ...prev,
      clinicAddress: { ...prev.clinicAddress, [field]: value }
    }));
    if (validationErrors.clinicAddress?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        clinicAddress: { ...prev.clinicAddress, [field]: undefined }
      }));
    }
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (!password) return { strength: '', color: '' };
    if (validatePassword(password)) return { strength: 'Strong', color: '#059669' };
    if (password.length >= 6) return { strength: 'Medium', color: '#f59e0b' };
    return { strength: 'Weak', color: '#dc2626' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="provider-registration-container">
      <div className="registration-background">
        <div className="medical-pattern"></div>
      </div>
      
      <div className="registration-card">
        <div className="registration-header">
          <div className="logo-section">
            <div className="medical-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" fill="white"/>
                <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="white"/>
              </svg>
            </div>
            <h1 className="app-title">Health First</h1>
          </div>
          <h2 className="registration-title">Provider Registration</h2>
          <p className="registration-subtitle">Join our healthcare network and start managing your practice</p>
        </div>

        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`form-input ${validationErrors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                  />
                </div>
                {validationErrors.firstName && (
                  <span className="error-text">{validationErrors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`form-input ${validationErrors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                  />
                </div>
                {validationErrors.lastName && (
                  <span className="error-text">{validationErrors.lastName}</span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`form-input ${validationErrors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                  />
                </div>
                {validationErrors.email && (
                  <span className="error-text">{validationErrors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`form-input ${validationErrors.phoneNumber ? 'error' : ''}`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {validationErrors.phoneNumber && (
                  <span className="error-text">{validationErrors.phoneNumber}</span>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>Professional Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="licenseNumber">Medical License Number *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  <input
                    type="text"
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className={`form-input ${validationErrors.licenseNumber ? 'error' : ''}`}
                    placeholder="Enter your medical license number"
                  />
                </div>
                {validationErrors.licenseNumber && (
                  <span className="error-text">{validationErrors.licenseNumber}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="specialization">Specialization *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <select
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className={`form-input ${validationErrors.specialization ? 'error' : ''}`}
                  >
                    <option value="">Select your specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>
                        {getSpecializationDisplayName(spec)}
                      </option>
                    ))}
                  </select>
                </div>
                {validationErrors.specialization && (
                  <span className="error-text">{validationErrors.specialization}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="yearsOfExperience">Years of Experience *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <input
                  type="number"
                  id="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                  className={`form-input ${validationErrors.yearsOfExperience ? 'error' : ''}`}
                  placeholder="Enter years of experience"
                  min="0"
                  max="50"
                />
              </div>
              {validationErrors.yearsOfExperience && (
                <span className="error-text">{validationErrors.yearsOfExperience}</span>
              )}
            </div>
          </div>

          {/* Clinic Address */}
          <div className="form-section">
            <h3>Clinic Address</h3>
            <div className="form-group">
              <label htmlFor="street">Street Address *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <input
                  type="text"
                  id="street"
                  value={formData.clinicAddress.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className={`form-input ${validationErrors.clinicAddress?.street ? 'error' : ''}`}
                  placeholder="Enter street address"
                />
              </div>
              {validationErrors.clinicAddress?.street && (
                <span className="error-text">{validationErrors.clinicAddress.street}</span>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <input
                    type="text"
                    id="city"
                    value={formData.clinicAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className={`form-input ${validationErrors.clinicAddress?.city ? 'error' : ''}`}
                    placeholder="Enter city"
                  />
                </div>
                {validationErrors.clinicAddress?.city && (
                  <span className="error-text">{validationErrors.clinicAddress.city}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <input
                    type="text"
                    id="state"
                    value={formData.clinicAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className={`form-input ${validationErrors.clinicAddress?.state ? 'error' : ''}`}
                    placeholder="Enter state"
                  />
                </div>
                {validationErrors.clinicAddress?.state && (
                  <span className="error-text">{validationErrors.clinicAddress.state}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <input
                  type="text"
                  id="zip"
                  value={formData.clinicAddress.zip}
                  onChange={(e) => handleAddressChange('zip', e.target.value)}
                  className={`form-input ${validationErrors.clinicAddress?.zip ? 'error' : ''}`}
                  placeholder="Enter ZIP code"
                />
              </div>
              {validationErrors.clinicAddress?.zip && (
                <span className="error-text">{validationErrors.clinicAddress.zip}</span>
              )}
            </div>
          </div>

          {/* Account Security */}
          <div className="form-section">
            <h3>Account Security</h3>
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`form-input ${validationErrors.password ? 'error' : ''}`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
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
              {passwordStrength.strength && (
                <div className="password-strength">
                  <span style={{ color: passwordStrength.color }}>
                    {passwordStrength.strength}
                  </span>
                </div>
              )}
              {validationErrors.password && (
                <span className="error-text">{validationErrors.password}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                </svg>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                <span className="error-text">{validationErrors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-section">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className={validationErrors.acceptTerms ? 'error' : ''}
                />
                <span className="checkmark"></span>
                I agree to the <a href="#" className="terms-link">Terms and Conditions</a> and <a href="#" className="terms-link">Privacy Policy</a> *
              </label>
              {validationErrors.acceptTerms && (
                <span className="error-text">{validationErrors.acceptTerms}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onBackToLogin}
              className="back-button"
              disabled={isLoading}
            >
              Back to Login
            </button>
            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistration; 