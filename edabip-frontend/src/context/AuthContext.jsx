import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// ---- MOCK BACKEND ----
const MOCK_USER = { email: 'test@gmail.com', password: 'pass12345' };
let mockAttemptsUsed = 0;
const MAX_ATTEMPTS = 5;

function mockLoginRequest(credentials) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockAttemptsUsed >= MAX_ATTEMPTS) {
        resolve({ success: false, locked: true, message: 'Account temporarily locked' });
        return;
      }

      if (
        credentials.email === MOCK_USER.email &&
        credentials.password === MOCK_USER.password
      ) {
        mockAttemptsUsed = 0; // resetting the attempts on successful login
        resolve({ success: true, user: { email: credentials.email }, token: 'mock-token-123' });
      } else {
        mockAttemptsUsed += 1;
        const attemptsRemaining = MAX_ATTEMPTS - mockAttemptsUsed;
        resolve({
          success: false,
          locked: attemptsRemaining <= 0,
          attemptsRemaining,
          message: 'Invalid email or password',
        });
      }
    }, 600); // simulate network delay
  });
}
//

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
  () => !!localStorage.getItem('authToken')
);
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
  const login = useCallback(async (credentials) => {
    const data = await mockLoginRequest(credentials);

    if (!data.success) {
      return data; // { success: false, attemptsRemaining, locked, message }
    }

    setUser(data.user);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', data.token);

    return { success: true };
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
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
