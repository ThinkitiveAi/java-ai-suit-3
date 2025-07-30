import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProviderLogin from './components/ProviderLogin';
import ProviderRegistration from './components/ProviderRegistration';
import PatientLogin from './components/PatientLogin';
import PatientRegistration from './components/PatientRegistration';
import type { RegistrationFormData } from './components/ProviderRegistration';
import type { PatientRegistrationFormData } from './components/PatientRegistration';

// Provider Dashboard Component
const ProviderDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Provider Dashboard</h1>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
    <div className="dashboard-content">
      <p>Welcome to the Healthcare Provider Dashboard</p>
      <p>Manage your patients, appointments, and healthcare services.</p>
    </div>
  </div>
);

// Patient Dashboard Component
const PatientDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Patient Dashboard</h1>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
    <div className="dashboard-content">
      <p>Welcome to your Health Portal</p>
      <p>View your health records, appointments, and medical information.</p>
    </div>
  </div>
);

// Provider Routes Component
const ProviderRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'registration'>('login');

  const handleLogin = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (credentials.email === 'demo@healthfirst.com' && credentials.password === 'Pass@123') {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleRegister = async (formData: RegistrationFormData) => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      console.log('Provider Registration data:', formData);
      alert('Registration successful! Please check your email for verification.');
      setCurrentView('login');
      setError('');
      setIsLoading(false);
    }, 3000);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here.');
  };

  const handleRegisterClick = () => {
    setCurrentView('registration');
    setError('');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setError('');
  };

  if (isLoggedIn) {
    return <ProviderDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentView === 'login' ? (
        <ProviderLogin
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onRegister={handleRegisterClick}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <ProviderRegistration
          onRegister={handleRegister}
          onBackToLogin={handleBackToLogin}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

// Patient Routes Component
const PatientRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'registration'>('login');

  const handleLogin = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (credentials.email === 'patient@healthfirst.com' && credentials.password === 'Pass@123') {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleRegister = async (formData: PatientRegistrationFormData) => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      console.log('Patient Registration data:', formData);
      alert('Registration successful! Please check your email for verification.');
      setCurrentView('login');
      setError('');
      setIsLoading(false);
    }, 3000);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here.');
  };

  const handleRegisterClick = () => {
    setCurrentView('registration');
    setError('');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setError('');
  };

  if (isLoggedIn) {
    return <PatientDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentView === 'login' ? (
        <PatientLogin
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onRegister={handleRegisterClick}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <PatientRegistration
          onRegister={handleRegister}
          onBackToLogin={handleBackToLogin}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

// Home Component with route selection
const Home: React.FC = () => (
  <div className="home-container">
    <div className="home-background">
      <div className="healing-pattern"></div>
    </div>
    
    <div className="home-card">
      <div className="home-header">
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
        <h2 className="home-title">Welcome to Health First</h2>
        <p className="home-subtitle">Choose your portal to get started</p>
      </div>

      <div className="portal-selection">
        <a href="/provider/login" className="portal-card provider-portal">
          <div className="portal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3>Healthcare Provider</h3>
          <p>Access your medical practice dashboard</p>
        </a>

        <a href="/patient/login" className="portal-card patient-portal">
          <div className="portal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h3>Patient Portal</h3>
          <p>View your health records and appointments</p>
        </a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider/*" element={<ProviderRoutes />} />
        <Route path="/patient/*" element={<PatientRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
