/**
 * Type-safe environment variables configuration
 */
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  APP_NAME: import.meta.env.VITE_APP_NAME || "Blitz",
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
