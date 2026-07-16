export const MOCK_AUTH_STORAGE_KEY = "edabip_mock_auth";
export const MOCK_AUTH_UNAVAILABLE_MESSAGE =
  "Authentication service is not available yet.";

const MOCK_SESSION_DURATION_MS = 60 * 60 * 1000;

export const isMockAuthEnabled =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK_AUTH === "true";

export function createMockSession(user) {
  const authenticatedAt = Date.now();

  return {
    user,
    provider: "google",
    isMock: true,
    authenticatedAt,
    expiresAt: authenticatedAt + MOCK_SESSION_DURATION_MS,
  };
}

export function isValidMockSession(session) {
  return Boolean(
    session &&
      typeof session === "object" &&
      session.user &&
      typeof session.user === "object" &&
      typeof session.user.email === "string" &&
      session.user.email.trim() !== "" &&
      session.isMock === true &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now()
  );
}

export function readMockSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedSession = window.sessionStorage.getItem(MOCK_AUTH_STORAGE_KEY);

    if (!storedSession) {
      return null;
    }

    const session = JSON.parse(storedSession);

    if (!isValidMockSession(session)) {
      clearMockSession();
      return null;
    }

    return session;
  } catch {
    clearMockSession();
    return null;
  }
}

export function saveMockSession(session) {
  if (typeof window === "undefined") {
    throw new Error("Browser session storage is unavailable.");
  }

  window.sessionStorage.setItem(
    MOCK_AUTH_STORAGE_KEY,
    JSON.stringify(session)
  );
}

export function clearMockSession() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
  } catch {
    // Storage may be unavailable; React authentication state is still cleared.
  }
}
