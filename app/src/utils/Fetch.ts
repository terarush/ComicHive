import axios from "axios";
import { ENV } from "../env";
import Cookies from "js-cookie"

export const FetchMangaApi = axios.create({
  baseURL: ENV.MANGA_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const FetchAnimeApi = axios.create({
  baseURL: `${ENV.ANIME_API_URL}/otakudesu`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const FetchApi = axios.create({
  baseURL: `${ENV.API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "x-token": `${Cookies.get("accessToken")}`,
  },
});
