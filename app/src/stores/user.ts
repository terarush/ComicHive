import { writable, type Writable } from "svelte/store";
import { FetchApi } from "../utils/Fetch";
import Cookies from "js-cookie";

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  contacts: {
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
      console.log(response.data.data)
    } catch (error) {
      console.error("Failed to fetch user:", error);
      user.set(null);
    }
  } else {
    user.set(null);
  }
}
