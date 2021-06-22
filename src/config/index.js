export const NEXT_API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3010/api"
    : "https://quest-next-js.vercel.app/api";
