# Health First - Provider Login

A professional healthcare provider login interface built with React and TypeScript, featuring a clean medical theme and comprehensive accessibility features.

## Features

### 🏥 Professional Medical Design
- Clean, modern interface with medical-themed color scheme
- Primary blue (#2563eb) and secondary green (#059669) colors
- Subtle medical pattern background
- Professional typography using Roboto font

### 🔐 Secure Authentication
- Flexible input field accepting email or phone number
- Secure password input with show/hide toggle
- Remember me functionality for session persistence
- Real-time form validation with clear error messages

### ♿ Accessibility Features
- Full keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management and visual indicators
- ARIA labels and descriptions
- Reduced motion support

### 📱 Responsive Design
- Mobile-optimized layout
- Touch-friendly interface elements
- Adaptive design for all screen sizes
- Horizontal and vertical orientation support

### 🎨 Interactive States
- Loading states with animated spinner
- Error handling with clear messaging
- Success states with smooth transitions
- Hover and focus effects

## Demo Credentials

To test the login functionality:
- **Email:** `demo@healthfirst.com`
- **Password:** `password123`

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd health-first-client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Component Structure

```
src/
├── components/
│   ├── ProviderLogin.tsx    # Main login component
│   └── ProviderLogin.css    # Component styles
├── App.tsx                  # Main app with demo functionality
├── App.css                  # App-level styles
└── main.tsx                # Entry point
```

## Usage

```tsx
import ProviderLogin from './components/ProviderLogin';

function App() {
  const handleLogin = (credentials) => {
    // Handle login logic
    console.log('Login credentials:', credentials);
  };

  const handleForgotPassword = () => {
    // Handle forgot password
  };

  const handleRegister = () => {
    // Handle registration
  };

  return (
    <ProviderLogin
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onRegister={handleRegister}
      isLoading={false}
      error={undefined}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onLogin` | `(credentials) => void` | Yes | Callback function for login submission |
| `onForgotPassword` | `() => void` | Yes | Callback function for forgot password |
| `onRegister` | `() => void` | Yes | Callback function for registration |
| `isLoading` | `boolean` | No | Loading state for the login button |
| `error` | `string` | No | Error message to display |

## Validation Rules

- **Email/Phone:** Accepts valid email format or phone number format
- **Password:** Minimum 6 characters required
- **Real-time validation:** Errors clear as user types
- **Form submission:** Validates all fields before submission

## Security Features

- Password masking by default
- Secure password visibility toggle
- Form auto-complete attributes
- Protection against common attacks
- Input sanitization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design System

### Colors
- Primary Blue: `#2563eb`
- Secondary Green: `#059669`
- Error Red: `#dc2626`
- Text Gray: `#374151`
- Border Gray: `#e5e7eb`

### Typography
- Font Family: Roboto
- Weights: 300, 400, 500, 600, 700

### Spacing
- Consistent 8px grid system
- Responsive padding and margins

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from healthcare UI best practices
- Accessibility guidelines from WCAG 2.1
- Medical theme based on professional healthcare applications
