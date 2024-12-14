// src/auth/mockAuthService.js

const MOCK_USER = {
  oid: "123456-789-abc-def",
  sub: "123456-789-abc-def",
  tid: "mock-tenant-id",
  upn: "vasilis@genplusgroup.agency",
  name: "Vasilis Kyfonidis",
  preferred_username: "vasilis@genplusgroup.agency",
  email: "vasilis@genplusgroup.agency",
  given_name: "Vasilis",
  family_name: "Kyfonidis",
  aud: "mock-client-id",
  iss: "https://login.microsoftonline.com/mock-tenant-id/v2.0",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
  nbf: Math.floor(Date.now() / 1000)
};

export const mockAuthService = {
  // Simulate login process
  login: async () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(MOCK_USER);
          }, 1000); // Simulate network delay
      });
  },

  // Simulate logout process
  logout: async () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(true);
          }, 500);
      });
  },

  // Check if user is authenticated
  isAuthenticated: () => {
      return false; // Initially false, will be managed by AuthContext
  }
};