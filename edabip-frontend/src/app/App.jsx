import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { SessionTimeout } from '../modules/auth/hooks/useSessionTimeout.jsx';
import ProtectedRoute from '../routes/ProtectedRoute.jsx';
import { routes } from '../routes/routeConfig.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SessionTimeout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                  ) : (
                    route.element
                  )
                }
              />
            ))}
          </Routes>
        </SessionTimeout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
