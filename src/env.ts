import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 3000,
  IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID || null,
};
