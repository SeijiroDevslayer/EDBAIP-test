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

  const resetSession = useCallback(() => {
    // This is intentionally empty for now
  }, []);

  const isSessionExpired = useCallback(() => {
    return false;
  }, []);

  const updatePassword = useCallback((newPassword) => {
    setMockUser((prev) => ({ ...prev, password: newPassword }));
  }, []);

  const login = useCallback(
    async (credentials, rememberMe = false) => {
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
              user: { email: credentials.email },
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

      // 🚩 Regular email/password login previously saved nothing to storage
      // in Saleem's version — this now persists it too, gated the same way
      // Google login already was. Confirm this is the intended behavior.
      if (isMockAuthEnabled) {
        const session = createMockSession(data.user, {
          rememberMe,
          provider: "mock-credentials",
        });
        saveMockSession(session);
      }

      return { success: true };
    },
    [mockUser]
  );

  const loginWithGoogleMock = useCallback((googleUser, rememberMe = true) => {
    // 🚩 Defaulted Google login to rememberMe=true (Google sign-in is
    // conventionally persistent) — confirm this matches the intended UX.
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

    const session = createMockSession(googleUser, {
      rememberMe,
      provider: "google",
    });

    saveMockSession(session);
    setUser(googleUser);
    setIsAuthenticated(true);
  }, []);

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