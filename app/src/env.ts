import Cookies from "js-cookie";

export const ENV = {
  MANGA_API_URL: import.meta.env.VITE_MANGA_API_URL,
  ANIME_API_URL: import.meta.env.VITE_ANIME_API_URL,
  API_URL: import.meta.env.VITE_API_URL,
  ACCESS_TOKEN: Cookies.get("accessToken") || null,
};
