import {
  createMockUser,
  findMockUserByEmail,
  normalizeMockUserEmail,
} from "../utils/mockUserRepository.js";

const MOCK_SIGNUP_DELAY_MS = 850;

const wait = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

function createMockUserId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `mock-user-${Date.now()}`;
}

function toPublicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    mobileNumber: user.mobileNumber,
    createdAt: user.createdAt,
  };
}

export async function mockSignup(payload) {
  await wait(MOCK_SIGNUP_DELAY_MS);

  if (
    !payload ||
    typeof payload.fullName !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.mobileNumber !== "string" ||
    typeof payload.password !== "string"
  ) {
    return {
      success: false,
      status: 400,
      error: {
        code: "INVALID_SIGNUP_PAYLOAD",
        message: "The signup request is incomplete.",
      },
    };
  }

  const normalizedEmail = normalizeMockUserEmail(payload.email);

  if (findMockUserByEmail(normalizedEmail)) {
    return {
      success: false,
      status: 409,
      error: {
        code: "EMAIL_ALREADY_EXISTS",
        message: "An account with this email address already exists.",
        field: "email",
      },
    };
  }

  const user = createMockUser({
    id: createMockUserId(),
    fullName: payload.fullName.trim(),
    email: normalizedEmail,
    mobileNumber: payload.mobileNumber.trim(),
    password: payload.password,
    createdAt: new Date().toISOString(),
  });

  return {
    success: true,
    status: 201,
    message: "Account created successfully.",
    data: {
      user: toPublicUser(user),
    },
  };
}
