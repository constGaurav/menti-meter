export const config = {
  PORT: process.env.PORT || 3000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "secret",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "1d",
  AUTH_COOKIE_KEY: process.env.AUTH_COOKIE_KEY || "auth_token",
};
