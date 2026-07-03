// Mock registered mobile numbers.
// Replace this with a backend API later.

const mockMobileUsers = [
  { mobile: "9876543210" },
  { mobile: "9123456789" },
  { mobile: "9000000000" },
];


export const verifyMobile = (mobile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mobileExists = mockMobileUsers.some(
        (user) => user.mobile === mobile
      );

      if (mobileExists) {
        resolve({
          success: true,
          message: "Mobile number verified.",
        });
      } else {
        resolve({
          success: false,
          message: "No account is associated with this mobile number.",
        });
      }
    }, 800);
  });
};