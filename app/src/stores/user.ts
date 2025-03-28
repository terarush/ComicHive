import { writable, type Writable } from "svelte/store";
import { FetchApi } from "../utils/Fetch";
import Cookies from "js-cookie";

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  contact: {
    email: string;
    first_name: string;
    last_name: string;
  };
};

export const user: Writable<UserProfile | null> = writable(null);

export async function fetchUser() {
  if (Cookies.get("accessToken")) {
    try {
      const response = await FetchApi.get("/user");
      user.set(response.data.data);
    } catch (error) {
      user.set(null);
      Cookies.remove("accessToken");
    }
  } else {
    user.set(null);
  }
}
