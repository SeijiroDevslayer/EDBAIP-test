import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuthContext();

  if (isInitializing) {
    return null;
  }

  if (!isAuthenticated) {
    // This is frontend route protection only, not real authorization.
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
