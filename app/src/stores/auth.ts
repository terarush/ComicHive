import { writable } from "svelte/store";
import { FetchApi } from "../utils/Fetch";
import { goto } from "$app/navigation";
import Cookies from "js-cookie";
export interface User {
  id: string;
  username: string;
  email: string;
}

export const auth = writable<User | null>(null);

export const setAuth = (newUser: User | null) => {
  auth.set(newUser);
};

export const fetchAuth = async () => {
  try {
    const response = await FetchApi.get("/user");
    setAuth(response.data.data.user);
  } catch (error: any) {
    if (error.response?.status === 401) {
      goto("/auth/login");
    } else {
      setAuth(null);
      Cookies.remove("accessToken", { path: "/" });
    }
  }
};
