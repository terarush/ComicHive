import { writable } from 'svelte/store';
import { FetchApi } from '../utils/Fetch';
import { goto } from '$app/navigation';

export interface User {
  id: string;
  username: string;
  email: string;
}

export const user = writable<User | null>(null);

export const setUser = (newUser: User | null) => {
  user.set(newUser);
};

export const fetchUser = async () => {
  try {
    const response = await FetchApi.get('/user'); 
    setUser(response.data.data.user);
  } catch (error: any) {
    if (error.response?.status === 401) {
      goto('/auth/login');
    } else {
      setUser(null); 
    }
  }
};

