import { writable } from "svelte/store";

export const loadingStore = writable(true);

export function setLoading(isLoading: boolean) {
  loadingStore.set(isLoading);
}
