const mockUsers = [
  {
    email: "test@gmail.com",
  },
];

export const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        resolve({
          success: true,
        });
      } else {
        reject({
  success: false,
  title: "Email Not Found",
  message: "No account is associated with this email address.",
});
      }
    }, 800); // simulate API delay
  });
};