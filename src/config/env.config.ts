export const env = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  },
  AUTH: {
    SECRET: process.env.AUTH_SECRET,
  },
};
