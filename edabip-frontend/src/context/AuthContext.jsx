import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Reset last activity timestamp
  const resetSession = useCallback(() => {
    // This is intentionally empty for now - SessionTimeout handles the actual tracking
  }, []);

  // Check if session is expired (placeholder)
  const isSessionExpired = useCallback(() => {
    return false;
  }, []);

  // Login function
  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        resetSession,
        isSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
