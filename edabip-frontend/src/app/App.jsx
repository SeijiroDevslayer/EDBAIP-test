import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../modules/auth/pages/LoginPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;