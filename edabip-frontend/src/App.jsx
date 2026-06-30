import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './modules/auth/pages/LoginPage';
import ForgotPasswordPage from './modules/auth/pages/ForgotPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;