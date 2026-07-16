import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearMockSession,
  createMockSession,
  isMockAuthEnabled,
  MOCK_AUTH_UNAVAILABLE_MESSAGE,
  readMockSession,
  saveMockSession,
} from "../modules/auth/utils/mockSession.js";

const AuthContext = createContext(null);

// ---- MOCK BACKEND ----
let mockAttemptsUsed = 0;
const MAX_ATTEMPTS = 5;

export function AuthProvider({ children }) {
  const [mockUser, setMockUser] = useState({
    email: "test@gmail.com",
    password: "pass12345",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Development-only mock authentication. Browser storage is not trusted
    // authentication and must never be treated as proof of identity.
    const session = isMockAuthEnabled ? readMockSession() : null;

    if (!isMockAuthEnabled) {
      clearMockSession();
    }

    if (session) {
      setUser(session.user);
      setIsAuthenticated(true);
    }

    setIsInitializing(false);
  }, []);

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

      return {
        success: true,
      };
    },
    [mockUser]
  );

  const loginWithGoogleMock = useCallback((googleUser) => {
    if (!isMockAuthEnabled) {
      throw new Error(MOCK_AUTH_UNAVAILABLE_MESSAGE);
    }

    if (
      !googleUser ||
      typeof googleUser !== "object" ||
      typeof googleUser.id !== "string" ||
      typeof googleUser.email !== "string" ||
      googleUser.provider !== "google"
    ) {
      throw new Error("Google returned an incomplete user profile.");
    }

    const session = createMockSession(googleUser);

    // Development only: replace this mock session creation with a backend API
    // exchange. The backend must verify Google identity and issue the real app
    // session; the browser profile alone is not trusted authentication.
    saveMockSession(session);
    setUser(googleUser);
    setIsAuthenticated(true);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearMockSession();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        user,
        login,
        loginWithGoogleMock,
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
