import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';
import { AUTH_STATUS } from '../modules/auth/utils/authConfig.js';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing, authStatus } = useAuthContext();

  if (isInitializing) {
    return null;
  }

  // MFA pending is not authenticated — credentials alone are insufficient.
  const canAccess =
    isAuthenticated && authStatus === AUTH_STATUS.AUTHENTICATED;

  if (!canAccess) {
    // This is frontend route protection only, not real authorization.
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
