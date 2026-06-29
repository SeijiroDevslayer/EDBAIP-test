import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../modules/auth/pages/LoginPage.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
