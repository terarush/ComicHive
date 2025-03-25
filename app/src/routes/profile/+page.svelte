<script lang="ts">
  import { onMount } from "svelte";
  import { user, fetchUser } from "../../stores/user";
  import { writable } from "svelte/store";
    import LoadingElements from "../../components/elements/LoadingElements.svelte";

  let isLoading = writable(true);

  $: profile = $user;

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  onMount(async () => {
    await fetchUser();
    setTimeout(() => {
      isLoading.set(false);
    }, 1000); 
  });
</script><div class="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6">
  <div class="w-full max-w-6xl bg-[hsl(var(--card))] rounded-xl shadow-xl border border-[hsl(var(--border))] overflow-hidden flex flex-col md:flex-row">
    <div class="w-full md:w-1/2 flex flex-col items-center p-8 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
      <div class="relative w-32 h-32 rounded-full overflow-hidden bg-[hsl(var(--card))] shadow-lg">
        {#if profile}
          {#if profile.avatar}
            <img src={profile.avatar || "/placeholder.svg"} alt="Avatar" class="w-full h-full object-cover" />
          {:else}
            <div class="flex items-center justify-center h-full text-3xl font-bold text-white bg-[hsl(var(--primary))]">
              {getInitials(profile.name)}
            </div>
          {/if}
        {/if}
      </div>
      <h2 class="mt-4 text-2xl font-semibold">{profile?.name || "Guest"}</h2>
      <p class="text-sm text-[hsl(var(--muted-foreground))]">@{profile?.username || "Unknown"}</p>

      {#if profile}
        <div class="mt-4 space-y-2 text-center">
          <p class="text-sm"><span class="font-medium">Email:</span> {profile.contacts.email}</p>
          <p class="text-sm"><span class="font-medium">Name:</span> {profile.contacts.first_name} {profile.contacts.last_name}</p>
          <p class="text-sm"><span class="font-medium">Member since:</span> January 2023</p>
        </div>
      {:else}
        <div class="mt-4 text-center">
          <p class="text-red-500">You are not logged in.</p>
          <a href="/auth/login" class="text-blue-500">Login here</a>
          <button class="mt-4 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md shadow-md transition hover:bg-[hsl(var(--primary)/80%)]" on:click={loadUserData}>
            Load Sample Data
          </button>
        </div>
      {/if}
    </div>

    <div class="w-full md:w-1/2 p-8 flex flex-col justify-between">
      <h3 class="text-xl font-medium mb-4">Statistics</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-[hsl(var(--secondary))] p-4 rounded-lg text-center shadow-md">
          <p class="text-sm text-[hsl(var(--muted-foreground))]">Anime Watched</p>
          <p class="text-2xl font-bold">247</p>
        </div>
        <div class="bg-[hsl(var(--secondary))] p-4 rounded-lg text-center shadow-md">
          <p class="text-sm text-[hsl(var(--muted-foreground))]">Manga Read</p>
          <p class="text-2xl font-bold">189</p>
        </div>
      </div>
    </div>
  </div>
</div>
{#if isLoading}
  <LoadingElements/>
{/if}
