/**
 * Email/password login + login MFA adapter.
 *
 * Signup email verification is a separate concern and must not share
 * challenge state with this module.
 *
 * Mock OTP for local testing (mock auth only): 1234
 * While the backend is inactive and mock auth is enabled, every successful
 * credential login requires email MFA.
 */

import {
  LOGIN_RESULT_STATUS,
  MFA_METHOD,
} from "../utils/authConfig.js";
import {
  AUTH_ERROR_CODES,
  getSafeAuthErrorMessage,
} from "../utils/authErrors.js";
import {
  findMockUserByEmail,
  normalizeMockUserEmail,
  validateMockCredentials,
} from "../utils/mockUserRepository.js";
import { isMockAuthEnabled } from "../utils/mockSession.js";

/** @internal Development mock OTP — never render in production UI. */
export const MOCK_LOGIN_MFA_OTP = "1234";
export const MOCK_LOGIN_MFA_OTP_LENGTH = MOCK_LOGIN_MFA_OTP.length;
const MOCK_MAX_VERIFY_ATTEMPTS = 5;
const MOCK_CHALLENGE_TTL_MS = 5 * 60 * 1000;
const MOCK_RESEND_COOLDOWN_SECONDS = 120;

/** In-memory mock challenges keyed by challengeId (not persisted as auth). */
const mockChallenges = new Map();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toDestinationLabel(email) {
  return normalizeMockUserEmail(email) || "your email";
}

function createChallengeId() {
  return `login-mfa-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getActiveChallenge(challengeId) {
  const challenge = mockChallenges.get(challengeId);

  if (!challenge) {
    return null;
  }

  if (challenge.expiresAt <= Date.now()) {
    mockChallenges.delete(challengeId);
    return null;
  }

  return challenge;
}

function toPublicChallenge(challenge) {
  const now = Date.now();
  return {
    status: LOGIN_RESULT_STATUS.MFA_REQUIRED,
    challengeId: challenge.challengeId,
    method: challenge.method,
    maskedDestination: challenge.maskedDestination,
    expiresInSeconds: Math.max(0, Math.ceil((challenge.expiresAt - now) / 1000)),
    resendAvailableInSeconds: Math.max(
      0,
      Math.ceil((challenge.resendAvailableAt - now) / 1000)
    ),
    expiresAt: challenge.expiresAt,
    resendAvailableAt: challenge.resendAvailableAt,
    // Safe profile fields only — never include password or OTP.
    userSnapshot: challenge.user
      ? {
          id: challenge.user.id,
          email: challenge.user.email,
          fullName: challenge.user.fullName || "",
          mobileNumber: challenge.user.mobileNumber || "",
          createdAt: challenge.user.createdAt || "",
        }
      : undefined,
  };
}

/**
 * Recreate an in-memory mock challenge after a page reload.
 * OTP is never read from storage; the mock OTP constant is reapplied.
 */
export function restoreMockLoginMfaChallenge(pending) {
  if (!pending?.challengeId || !pending?.userSnapshot) {
    return false;
  }

  if (mockChallenges.has(pending.challengeId)) {
    return true;
  }

  if (pending.expiresAt <= Date.now()) {
    return false;
  }

  mockChallenges.set(pending.challengeId, {
    challengeId: pending.challengeId,
    method: pending.method || MFA_METHOD.EMAIL_OTP,
    maskedDestination: pending.maskedDestination,
    email: pending.userSnapshot.email,
    user: pending.userSnapshot,
    otp: MOCK_LOGIN_MFA_OTP,
    expiresAt: pending.expiresAt,
    resendAvailableAt: pending.resendAvailableAt || Date.now(),
    attempts: 0,
    createdAt: Date.now(),
  });

  return true;
}

/**
 * Production-ready shape: later call backend POST /api/auth/login.
 *
 * Until that API exists, credentials are validated against the local mock
 * repository (same behavior as the previous AuthContext login).
 * Session persistence remains gated by isMockAuthEnabled in AuthContext.
 */
export async function loginWithEmail(credentials = {}) {
  const email = credentials.email;
  const password = credentials.password;

  // Real backend wiring point:
  // if (!isMockAuthEnabled && !import.meta.env.DEV) {
  //   const response = await apiClient.post('/auth/login', { email, password });
  //   return mapBackendLoginResponse(response.data);
  // }

  await delay(600);

  const authenticatedUser = validateMockCredentials(email, password);

  if (!authenticatedUser) {
    return {
      status: LOGIN_RESULT_STATUS.REJECTED,
      success: false,
      message: "Invalid email or password",
      error: { message: "Invalid email or password." },
    };
  }

  const repositoryUser = findMockUserByEmail(email);
  // Mock auth (backend inactive): always challenge with email OTP after valid credentials.
  // When real APIs land, gate this on repositoryUser.mfaEnabled / backend MFA_REQUIRED.
  const requireEmailMfa =
    isMockAuthEnabled || Boolean(repositoryUser?.mfaEnabled);

  if (requireEmailMfa) {
    const challengeId = createChallengeId();
    const now = Date.now();
    const challenge = {
      challengeId,
      method: MFA_METHOD.EMAIL_OTP,
      maskedDestination: toDestinationLabel(authenticatedUser.email),
      email: authenticatedUser.email,
      user: authenticatedUser,
      otp: MOCK_LOGIN_MFA_OTP,
      expiresAt: now + MOCK_CHALLENGE_TTL_MS,
      resendAvailableAt: now + MOCK_RESEND_COOLDOWN_SECONDS * 1000,
      attempts: 0,
      createdAt: now,
    };

    mockChallenges.set(challengeId, challenge);

    if (import.meta.env.DEV && isMockAuthEnabled) {
      console.info(
        `[Mock login MFA] OTP sent to ${challenge.maskedDestination}: ${MOCK_LOGIN_MFA_OTP}`
      );
    }

    return toPublicChallenge(challenge);
  }

  return {
    status: LOGIN_RESULT_STATUS.AUTHENTICATED,
    success: true,
    user: authenticatedUser,
    session: {
      provider: "mock-credentials",
    },
  };
}

export async function verifyLoginMfa({ challengeId, code } = {}) {
  const normalizedCode = String(code || "").replace(/\D/g, "");

  // Real backend: POST /api/auth/login/mfa/verify
  await delay(500);

  const challenge = getActiveChallenge(challengeId);

  if (!challenge) {
    return {
      status: LOGIN_RESULT_STATUS.REJECTED,
      success: false,
      code: AUTH_ERROR_CODES.MFA_EXPIRED,
      message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_EXPIRED),
    };
  }

  if (challenge.attempts >= MOCK_MAX_VERIFY_ATTEMPTS) {
    mockChallenges.delete(challengeId);
    return {
      status: LOGIN_RESULT_STATUS.REJECTED,
      success: false,
      code: AUTH_ERROR_CODES.MFA_TOO_MANY_ATTEMPTS,
      message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_TOO_MANY_ATTEMPTS),
    };
  }

  challenge.attempts += 1;

  if (normalizedCode !== challenge.otp) {
    const remaining = MOCK_MAX_VERIFY_ATTEMPTS - challenge.attempts;

    if (remaining <= 0) {
      mockChallenges.delete(challengeId);
      return {
        status: LOGIN_RESULT_STATUS.REJECTED,
        success: false,
        code: AUTH_ERROR_CODES.MFA_TOO_MANY_ATTEMPTS,
        message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_TOO_MANY_ATTEMPTS),
      };
    }

    return {
      status: LOGIN_RESULT_STATUS.REJECTED,
      success: false,
      code: AUTH_ERROR_CODES.MFA_INVALID_CODE,
      message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_INVALID_CODE),
    };
  }

  const user = challenge.user;
  mockChallenges.delete(challengeId);

  return {
    status: LOGIN_RESULT_STATUS.AUTHENTICATED,
    success: true,
    user,
    session: {
      provider: "mock-credentials",
    },
  };
}

export async function resendLoginMfa({ challengeId } = {}) {
  // Real backend: POST /api/auth/login/mfa/resend
  await delay(400);

  const challenge = getActiveChallenge(challengeId);

  if (!challenge) {
    return {
      success: false,
      code: AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING,
      message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_CHALLENGE_MISSING),
    };
  }

  const now = Date.now();

  if (challenge.resendAvailableAt > now) {
    return {
      success: false,
      code: AUTH_ERROR_CODES.MFA_RESEND_COOLDOWN,
      message: getSafeAuthErrorMessage(AUTH_ERROR_CODES.MFA_RESEND_COOLDOWN),
      resendAvailableInSeconds: Math.ceil(
        (challenge.resendAvailableAt - now) / 1000
      ),
    };
  }

  challenge.otp = MOCK_LOGIN_MFA_OTP;
  challenge.expiresAt = now + MOCK_CHALLENGE_TTL_MS;
  challenge.resendAvailableAt = now + MOCK_RESEND_COOLDOWN_SECONDS * 1000;
  challenge.attempts = 0;
  mockChallenges.set(challengeId, challenge);

  if (import.meta.env.DEV && isMockAuthEnabled) {
    console.info(
      `[Mock login MFA] OTP resent to ${challenge.maskedDestination}: ${MOCK_LOGIN_MFA_OTP}`
    );
  }

  return {
    success: true,
    ...toPublicChallenge(challenge),
  };
}

export async function cancelLoginMfa({ challengeId } = {}) {
  if (challengeId) {
    mockChallenges.delete(challengeId);
  }

  return { success: true };
}
