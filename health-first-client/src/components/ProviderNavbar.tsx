import React from 'react';
import './ProviderNavbar.css';

interface ProviderNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  providerName?: string;
}

const ProviderNavbar: React.FC<ProviderNavbarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  providerName = 'Provider'
}) => {
  return (
    <nav className="provider-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" fill="currentColor"/>
              <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="brand-text">Health First</span>
        </div>

        <div className="navbar-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </button>
          
          <button
            className={`nav-tab ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => onTabChange('availability')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Availability
          </button>
          
          <button
            className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => onTabChange('appointments')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Appointments
          </button>
          
          <button
            className={`nav-tab ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => onTabChange('patients')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v-3.5l-1.7-2.26A2.5 2.5 0 0 0 7.54 8H6.46c-.8 0-1.54.37-2.01 1L1.96 15.5H4.5V22h2v-6h1.5v6h2V16h1.5v6h2z"/>
            </svg>
            Patients
          </button>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span className="user-name">{providerName}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProviderNavbar; 