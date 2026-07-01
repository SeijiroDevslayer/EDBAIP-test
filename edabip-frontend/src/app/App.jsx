import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../modules/auth/pages/LoginPage';
import SignupPage from '../modules/auth/pages/SignupPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import CreateNewPasswordPage from '../modules/auth/pages/CreateNewPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-new-password" element={<CreateNewPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;