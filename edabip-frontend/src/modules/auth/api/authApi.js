import { mockSignup } from "./mockSignupService.js";

export const login = async (credentials) => {
  return Promise.resolve({ success: true });
};

export const signup = async (payload) => {
  return mockSignup(payload);
};
