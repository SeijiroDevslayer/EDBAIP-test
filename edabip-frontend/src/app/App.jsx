import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { SessionTimeout } from '../modules/auth/hooks/useSessionTimeout.jsx';
import LoginPage from '../modules/auth/pages/LoginPage';
import SignupPage from '../modules/auth/pages/SignupPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import CreateNewPasswordPage from '../modules/auth/pages/CreateNewPasswordPage';
import PasswordResetSuccessPage from '../modules/auth/pages/PasswordResetSuccessPage';
import SessionExpiredPage from '../modules/auth/pages/SessionExpiredPage';
import DashboardPage from '../modules/dashboard/pages/DashboardPage.jsx';
import AccountLockedPage from '../modules/auth/pages/AccountLockedPage';
import ContactSupportPage from '../modules/auth/pages/ContactSupportPage';
import LandingPage from '../modules/landing-page/Landing-Page.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SessionTimeout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/create-new-password" element={<CreateNewPasswordPage />} />
            <Route
              path="/password-reset-success"
              element={<PasswordResetSuccessPage />}
            />
            <Route
              path="/session-expired"
              element={<SessionExpiredPage />}
            />
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
            <Route
              path="/account-locked"
              element={<AccountLockedPage />}
            />
            <Route
              path="/contact-support"
              element={<ContactSupportPage />}
            />
            <Route
              path="/landing-page"
              element={<LandingPage />}
            />
          </Routes>
        </SessionTimeout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;