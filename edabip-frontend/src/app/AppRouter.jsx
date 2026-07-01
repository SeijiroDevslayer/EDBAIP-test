import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../modules/auth/pages/LoginPage.jsx';
import SignupPage from '../modules/auth/pages/SignupPage.jsx';
import MFAChallengePage from '../modules/auth/components/MFAChallenge.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<MFAChallengePage />} /> 
      </Routes>
    </Router>
  );
}
export default AppRouter;