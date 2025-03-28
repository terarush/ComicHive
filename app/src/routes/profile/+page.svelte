<script lang="ts">
  import { onMount } from "svelte";
  import { user, fetchUser } from "../../stores/user";
  import { writable } from "svelte/store";
  import LoadingElements from "../../components/elements/LoadingElements.svelte";

  let isLoading = writable(true);

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  onMount(async () => {
    await fetchUser();
    isLoading.set(false);
  });
</script>

<div
  class="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6"
>
  <div
    class="w-full max-w-6xl bg-[hsl(var(--card))] rounded-xl shadow-xl border border-[hsl(var(--border))] overflow-hidden flex flex-col md:flex-row"
  >
    <div
      class="w-full md:w-1/2 flex flex-col items-center p-8 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
    >
      <div
        class="relative w-32 h-32 rounded-full overflow-hidden bg-[hsl(var(--card))] shadow-lg"
      >
        {#if $user}
          {#if $user.avatar}
            <img
              src={$user.avatar}
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          {:else}
            <div
              class="flex items-center justify-center h-full text-3xl font-bold text-white bg-[hsl(var(--primary))]"
            >
              {getInitials($user.name)}
            </div>
          {/if}
        {/if}
      </div>
      <h2 class="mt-4 text-2xl font-semibold">{$user?.name || "Guest"}</h2>
      <p class="text-sm text-[hsl(var(--muted-foreground))]">
        @{$user?.username || "Unknown"}
      </p>

      {#if $user?.contact}
        <div class="mt-4 space-y-2 text-center">
          <p class="text-sm">
            <span class="font-medium">Email:</span> {$user.contact.email}
          </p>
          <p class="text-sm">
            <span class="font-medium">Name:</span>
            {$user.contact.first_name} {$user.contact.last_name}
          </p>
          <p class="text-sm">
            <span class="font-medium">Member since:</span> January 2023
          </p>
        </div>
      {:else}
        <div class="mt-4 text-center">
          <p class="text-red-500">You are not logged in.</p>
          <a href="/auth/login" class="text-blue-500">Login here</a>
        </div>
      {/if}
    </div>

    <div class="w-full md:w-1/2 p-8 flex flex-col justify-between">
      <h3 class="text-xl font-medium mb-4">Statistics</h3>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-[hsl(var(--secondary))] p-4 rounded-lg text-center shadow-md"
        >
          <p class="text-sm text-[hsl(var(--muted-foreground))]">
            Anime Watched
          </p>
          <p class="text-2xl font-bold">247</p>
        </div>
        <div
          class="bg-[hsl(var(--secondary))] p-4 rounded-lg text-center shadow-md"
        >
          <p class="text-sm text-[hsl(var(--muted-foreground))]">Manga Read</p>
          <p class="text-2xl font-bold">189</p>
        </div>
      </div>
    </div>
  </div>
</div>

{#if $isLoading}
  <LoadingElements />
{/if}
