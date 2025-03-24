<script lang="ts">
  import { FetchApi } from "../../../utils/Fetch";
  import Link from "svelte-link";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";

  let formData = {
    username: "",
    password: "",
  };

  let errorMessages: string[] = [];
  let message: string = "";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
      const response = await FetchApi.post("/auth/login", formData);
      const token = response.data.data.token;
      setTimeout(() => {
        Cookies.set("accessToken", token, { expires: 7, path: "" });
      }, 2000);
      message = "Login success, selamat datang kembali";
      errorMessages = [];
      goto("/");
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data.errors) {
        errorMessages = error.response.data.errors.map(
          (err: { message: string }) => err.message,
        );
      } else {
        errorMessages = ["An unexpected error occurred."];
      }
    }
  };
</script>

<div
  class="relative flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-30 blur-lg"
  ></div>

  <form
    class="relative w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg border border-[hsl(var(--border))] z-10"
    on:submit={handleSubmit}
  >
    <h2 class="text-2xl font-bold text-[hsl(var(--primary))] mb-4">Login</h2>

    {#if message}
      <div class="text-green-500 text-sm mb-4">
        <p>{message}</p>
      </div>
    {/if}
    {#if errorMessages.length > 0}
      <div class="text-red-500 text-sm mb-4">
        {#each errorMessages as error}
          <p>{error}</p>
        {/each}
      </div>
    {/if}

    <div class="space-y-4">
      <div>
        <label
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
          >Username</label
        >
        <input
          type="text"
          bind:value={formData.username}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
          >Password</label
        >
        <input
          type="password"
          bind:value={formData.password}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      class="w-full mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md hover:bg-opacity-90 transition"
    >
      Login
    </button>
    <p class="mt-4 text-center text-sm">
      Don't have an account? Create your account <Link
        href="/auth/register"
        class="text-[hsl(var(--primary))] hover:underline">Register here</Link
      >
    </p>
  </form>
</div>
