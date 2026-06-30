import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../modules/auth/pages/LoginPage.jsx';
import SignupPage from '../modules/auth/pages/SignupPage.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
