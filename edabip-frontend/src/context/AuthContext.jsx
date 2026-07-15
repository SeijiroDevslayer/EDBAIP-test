import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

// ---- MOCK BACKEND ----
let mockAttemptsUsed = 0;
const MAX_ATTEMPTS = 5;

export function AuthProvider({ children }) {
  // Mock user with persistent password
  const [mockUser, setMockUser] = useState(() => ({
    email: "test@gmail.com",
    password: localStorage.getItem("mockPassword") || "pass12345",
  }));

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("authToken")
  );

  const [user, setUser] = useState(null);

  // Reset last activity timestamp
  const resetSession = useCallback(() => {
    // This is intentionally empty for now
  }, []);

  // Check if session is expired
  const isSessionExpired = useCallback(() => {
    return false;
  }, []);

  // Update password
  const updatePassword = useCallback(
    (newPassword) => {
      const updatedUser = {
        ...mockUser,
        password: newPassword,
      };

      setMockUser(updatedUser);

      // Save new password so it survives refresh
      localStorage.setItem("mockPassword", newPassword);
    },
    [mockUser]
  );

  // Login function
  const login = useCallback(
    async (credentials) => {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          if (mockAttemptsUsed >= MAX_ATTEMPTS) {
            resolve({
              success: false,
              locked: true,
              message: "Account temporarily locked",
            });
            return;
          }

          if (
            credentials.email === mockUser.email &&
            credentials.password === mockUser.password
          ) {
            mockAttemptsUsed = 0;

            resolve({
              success: true,
              user: {
                email: credentials.email,
              },
              token: "mock-token-123",
            });
          } else {
            mockAttemptsUsed++;

            resolve({
              success: false,
              locked: mockAttemptsUsed >= MAX_ATTEMPTS,
              attemptsRemaining: MAX_ATTEMPTS - mockAttemptsUsed,
              message: "Invalid email or password",
            });
          }
        }, 600);
      });

      if (!data.success) {
        return data;
      }

      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem("authToken", data.token);

      return {
        success: true,
      };
    },
    [mockUser]
  );

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        updatePassword,
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