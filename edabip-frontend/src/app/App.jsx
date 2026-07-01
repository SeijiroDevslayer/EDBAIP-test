import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../modules/auth/pages/LoginPage';
import SignupPage from '../modules/auth/pages/SignupPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import PasswordResetSuccessPage from '../modules/auth/pages/PasswordResetSuccessPage';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccessPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;