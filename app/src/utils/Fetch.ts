import axios from "axios";
import { ENV } from "../env";

export const FetchMangaApi = axios.create({
  baseURL: ENV.MANGA_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const FetchAnimeApi = axios.create({
  baseURL: ENV.ANIME_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
