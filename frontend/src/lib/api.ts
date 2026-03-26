/**
 * Base URL for the backend API. Set NEXT_PUBLIC_API_BASE_URL in .env.local or use default.
 */
export const API_BASE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE_URL) ||
  "http://localhost:5000/api";
