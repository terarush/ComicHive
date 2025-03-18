import axios from "axios";
import { ENV } from "../env";

export const Fetch = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

