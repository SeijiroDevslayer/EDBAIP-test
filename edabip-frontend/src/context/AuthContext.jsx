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
import { signup as requestSignup } from "../modules/auth/api/authApi.js";
import {
  DEFAULT_MOCK_USER_EMAIL,
  updateMockUserPassword,
  validateMockCredentials,
} from "../modules/auth/utils/mockUserRepository.js";

const AuthContext = createContext(null);

// ---- MOCK BACKEND ----
let mockAttemptsUsed = 0;
const MAX_ATTEMPTS = 5;

export function AuthProvider({ children }) {
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
    updateMockUserPassword(DEFAULT_MOCK_USER_EMAIL, newPassword);
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

          const authenticatedUser = validateMockCredentials(
            credentials.email,
            credentials.password
          );

          if (authenticatedUser) {
            mockAttemptsUsed = 0;
            resolve({
              success: true,
              user: authenticatedUser,
              token: "mock-token-123",
            });
          } else {
            mockAttemptsUsed++;
            resolve({
              success: false,
              locked: mockAttemptsUsed >= MAX_ATTEMPTS,
              attemptsRemaining: MAX_ATTEMPTS - mockAttemptsUsed,
              message: "Invalid email or password",
              error: { message: "Invalid email or password." },
            });
          }
        }, 600);
      });

      if (!data.success) {
        return data;
      }

      setUser(data.user);
      setIsAuthenticated(true);


      if (isMockAuthEnabled) {
        const session = createMockSession(data.user, {
          rememberMe,
          provider: "mock-credentials",
        });
        saveMockSession(session);
      }

      return {
        success: true,
        data: { user: data.user },
      };
    },
    []
  );

  const loginWithGoogleMock = useCallback((googleUser, rememberMe = true) => {

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

  const signup = useCallback(async (payload) => {
    return requestSignup(payload);
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
        signup,
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
