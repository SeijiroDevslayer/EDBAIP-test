import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from './modules/auth/pages/SignupPage';
import ForgotPasswordPage from './modules/auth/pages/ForgotPasswordPage';
import PasswordResetSuccessPage from './modules/auth/pages/PasswordResetSuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;