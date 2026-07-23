import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import {
  AUTH_STATUS,
  LOGIN_RESULT_STATUS,
} from "../modules/auth/utils/authConfig.js";
import {
  AUTH_ERROR_CODES,
  getSafeAuthErrorMessage,
} from "../modules/auth/utils/authErrors.js";
import {
  clearPendingMfaChallenge,
  readPendingMfaChallenge,
  savePendingMfaChallenge,
} from "../modules/auth/utils/pendingMfaChallenge.js";
import { signup as requestSignup } from "../modules/auth/api/authApi.js";
import {
  DEFAULT_MOCK_USER_EMAIL,
  updateMockUserPassword,
} from "../modules/auth/utils/mockUserRepository.js";
import {
  cancelLoginMfa,
  loginWithEmail,
  resendLoginMfa,
  restoreMockLoginMfaChallenge,
  verifyLoginMfa,
} from "../modules/auth/services/loginMfaService.js";

const AuthContext = createContext(null);

// ---- MOCK BACKEND lockout tracking for non-MFA credential failures ----
let mockAttemptsUsed = 0;
const MAX_ATTEMPTS = 5;

function establishSession(user, { rememberMe = false, provider }) {
  if (isMockAuthEnabled) {
    const session = createMockSession(user, { rememberMe, provider });
    saveMockSession(session);
  }
}

export function AuthProvider({ children }) {
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.UNAUTHENTICATED);
  const [user, setUser] = useState(null);
  const [pendingChallenge, setPendingChallenge] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = authStatus === AUTH_STATUS.AUTHENTICATED;

  useEffect(() => {
    const session = isMockAuthEnabled ? readMockSession() : null;

    if (!isMockAuthEnabled) {
      clearMockSession();
      clearPendingMfaChallenge();
    }

    if (session) {
      clearPendingMfaChallenge();
      setUser(session.user);
      setPendingChallenge(null);
      setAuthStatus(AUTH_STATUS.AUTHENTICATED);
      setIsInitializing(false);
      return;
    }

    const pending = isMockAuthEnabled ? readPendingMfaChallenge() : null;

    if (pending && restoreMockLoginMfaChallenge(pending)) {
      setUser(null);
      setPendingChallenge(pending);
      setAuthStatus(AUTH_STATUS.MFA_PENDING);
    } else {
      if (pending) {
        clearPendingMfaChallenge();
      }
      setUser(null);
      setPendingChallenge(null);
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
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

  const clearPendingAuthentication = useCallback(async () => {
    const challengeId = pendingChallenge?.challengeId;

    if (challengeId) {
      try {
        await cancelLoginMfa({ challengeId });
      } catch {
        // Best-effort cancel; local state is still cleared below.
      }
    }

    clearPendingMfaChallenge();
    setPendingChallenge(null);

    if (authStatus === AUTH_STATUS.MFA_PENDING) {
      setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
    }
  }, [authStatus, pendingChallenge]);

  const completeAuthentication = useCallback(
    (authenticatedUser, { rememberMe = false, provider }) => {
      clearPendingMfaChallenge();
      setPendingChallenge(null);
      setUser(authenticatedUser);
      setAuthStatus(AUTH_STATUS.AUTHENTICATED);
      establishSession(authenticatedUser, { rememberMe, provider });
    },
    []
  );

  const login = useCallback(
    async (credentials, rememberMe = false) => {
      if (mockAttemptsUsed >= MAX_ATTEMPTS) {
        return {
          success: false,
          locked: true,
          message: "Account temporarily locked",
        };
      }

      await clearPendingAuthentication();

      try {
        const result = await loginWithEmail(credentials);

        if (result.status === LOGIN_RESULT_STATUS.MFA_REQUIRED) {
          mockAttemptsUsed = 0;

          const challenge = savePendingMfaChallenge({
            ...result,
            rememberMe,
          });

          setUser(null);
          setPendingChallenge(challenge);
          setAuthStatus(AUTH_STATUS.MFA_PENDING);

          return {
            success: false,
            mfaRequired: true,
            challenge,
          };
        }

        if (result.status === LOGIN_RESULT_STATUS.AUTHENTICATED && result.user) {
          mockAttemptsUsed = 0;
          completeAuthentication(result.user, {
            rememberMe,
            provider: result.session?.provider || "mock-credentials",
          });

          return {
            success: true,
            data: { user: result.user },
          };
        }

        mockAttemptsUsed += 1;

        return {
          success: false,
          locked: mockAttemptsUsed >= MAX_ATTEMPTS,
          attemptsRemaining: Math.max(0, MAX_ATTEMPTS - mockAttemptsUsed),
          message: result.message || "Invalid email or password",
          error: result.error || { message: "Invalid email or password." },
        };
      } catch (error) {
        return {
          success: false,
          message: getSafeAuthErrorMessage(
            error?.code,
            "Unable to sign in. Please try again."
          ),
          error: {
            message: getSafeAuthErrorMessage(
              error?.code,
              "Unable to sign in. Please try again."
            ),
          },
        };
      }
    },
    [clearPendingAuthentication, completeAuthentication]
  );

  const verifyMfa = useCallback(
    async (code) => {
      if (!pendingChallenge?.challengeId) {
        return {
          success: false,
          code: AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING,
          message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING),
        };
      }

      try {
        const result = await verifyLoginMfa({
          challengeId: pendingChallenge.challengeId,
          code,
        });

        if (result.status === LOGIN_RESULT_STATUS.AUTHENTICATED && result.user) {
          completeAuthentication(result.user, {
            rememberMe: Boolean(pendingChallenge.rememberMe),
            provider: result.session?.provider || "mock-credentials",
          });

          return {
            success: true,
            data: { user: result.user },
          };
        }

        if (
          result.code === AUTH_ERROR_CODES.MFA_EXPIRED ||
          result.code === AUTH_ERROR_CODES.MFA_TOO_MANY_ATTEMPTS ||
          result.code === AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING
        ) {
          clearPendingMfaChallenge();
          setPendingChallenge(null);
          setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
        }

        return {
          success: false,
          code: result.code,
          message:
            result.message ||
            getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_INVALID_CODE),
        };
      } catch (error) {
        return {
          success: false,
          code: error?.code || AUTH_ERROR_CODES.UNKNOWN,
          message: getSafeAuthErrorMessage(
            error?.code,
            "Unable to verify the code. Please try again."
          ),
        };
      }
    },
    [completeAuthentication, pendingChallenge]
  );

  const resendMfa = useCallback(async () => {
    if (!pendingChallenge?.challengeId) {
      return {
        success: false,
        code: AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING,
        message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING),
      };
    }

    try {
      const result = await resendLoginMfa({
        challengeId: pendingChallenge.challengeId,
      });

      if (!result.success) {
        return result;
      }

      const updated = savePendingMfaChallenge({
        ...pendingChallenge,
        ...result,
        rememberMe: pendingChallenge.rememberMe,
      });

      setPendingChallenge(updated);

      return {
        success: true,
        resendAvailableInSeconds: result.resendAvailableInSeconds,
        challenge: updated,
      };
    } catch (error) {
      return {
        success: false,
        code: error?.code || AUTH_ERROR_CODES.UNKNOWN,
        message: getSafeAuthErrorMessage(
          error?.code,
          "Unable to resend the code. Please try again."
        ),
      };
    }
  }, [pendingChallenge]);

  const loginWithGoogleMock = useCallback(
    (googleUser, rememberMe = true) => {
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

      clearPendingMfaChallenge();
      setPendingChallenge(null);
      completeAuthentication(googleUser, {
        rememberMe,
        provider: "google",
      });
    },
    [completeAuthentication]
  );

  const loginWithMicrosoftIdentity = useCallback(
    (microsoftUser, { rememberMe = true, isMock = false } = {}) => {
      if (isMock && !isMockAuthEnabled) {
        throw new Error(MOCK_AUTH_UNAVAILABLE_MESSAGE);
      }

      if (!isMock && !isMockAuthEnabled) {
        // Production Microsoft identity must be exchanged via backend before this runs.
        throw new Error(
          getSafeAuthErrorMessage(AUTH_ERROR_CODES.MICROSOFT_EXCHANGE_FAILED)
        );
      }

      if (
        !microsoftUser ||
        typeof microsoftUser !== "object" ||
        typeof microsoftUser.id !== "string" ||
        typeof microsoftUser.email !== "string" ||
        microsoftUser.provider !== "microsoft"
      ) {
        throw new Error("Microsoft returned an incomplete user profile.");
      }

      clearPendingMfaChallenge();
      setPendingChallenge(null);
      completeAuthentication(microsoftUser, {
        rememberMe,
        provider: "microsoft",
      });
    },
    [completeAuthentication]
  );

  const signup = useCallback(async (payload) => {
    return requestSignup(payload);
  }, []);

  const logout = useCallback(() => {
    clearMockSession();
    clearPendingMfaChallenge();
    setUser(null);
    setPendingChallenge(null);
    setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
  }, []);

  const value = useMemo(
    () => ({
      authStatus,
      isAuthenticated,
      isInitializing,
      user,
      pendingChallenge,
      login,
      verifyMfa,
      resendMfa,
      clearPendingAuthentication,
      signup,
      loginWithGoogleMock,
      loginWithMicrosoftIdentity,
      logout,
      updatePassword,
      resetSession,
      isSessionExpired,
    }),
    [
      authStatus,
      isAuthenticated,
      isInitializing,
      user,
      pendingChallenge,
      login,
      verifyMfa,
      resendMfa,
      clearPendingAuthentication,
      signup,
      loginWithGoogleMock,
      loginWithMicrosoftIdentity,
      logout,
      updatePassword,
      resetSession,
      isSessionExpired,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
