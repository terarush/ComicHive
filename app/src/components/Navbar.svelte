<script lang="ts">
  import { user } from "../stores/user";
  import ModeButton from "./elements/ModeButton.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let isMenuOpen = false;
  let isProfileMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleProfileMenu(event: Event) {
    event.stopPropagation();
    isProfileMenuOpen = !isProfileMenuOpen;
  }

  function closeProfileMenu() {
    isProfileMenuOpen = false;
  }

  onMount(() => {
    window.addEventListener("click", closeProfileMenu);
  });

  $: profile = $user;

  function getInitials(name: string | undefined) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  let links = [
    { name: "Home", link: "/" },
    { name: "Anime", link: "/anime" },
    { name: "Manga", link: "/manga" },
    { name: "Community", link: "/community" },
    { name: "About", link: "/about" },
  ];
</script>

<nav
  class="fixed inset-x-0 top-0 z-50 bg-[hsl(var(--background)/0.8)] backdrop-blur-lg shadow-sm"
>
  <div class="w-full max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16 items-center">
      <div class="flex gap-2 items-center">
        <button
          class="md:hidden p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
          on:click={toggleMenu}
        >
          {#if isMenuOpen}
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {:else}
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          {/if}
        </button>

        <a href="/" class="text-lg font-bold text-[hsl(var(--primary))]"
          >ComicHive</a
        >
      </div>

      <nav data-sveltekit-preload-data="false" class="hidden md:flex gap-6">
        {#each links as { name, link }}
          <a
            href={link}
            class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
            >{name}</a
          >
        {/each}
      </nav>

      <div class="flex items-center gap-4 relative">
        <ModeButton />

        {#if profile}
          <div class="relative">
            <button
              class="flex items-center gap-2"
              on:click|stopPropagation={toggleProfileMenu}
            >
              {#if profile.avatar}
                <img
                  src={profile.avatar}
                  alt="Profile"
                  class="w-8 h-8 rounded-full"
                />
              {:else}
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold bg-[hsl(var(--primary))]"
                >
                  {getInitials(profile.name)}
                </div>
              {/if}
            </button>

            {#if isProfileMenuOpen}
              <div
                data-sveltekit-preload-data="false"
                transition:fade
                class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50 dark:bg-[hsl(var(--background))] border border-[hsl(var(--primary))]"
              >
                <a
                  href="/profile"
                  class="block px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
                  >Profile</a
                >
                <a
                  href="/auth/logout"
                  class="block px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
                  >Logout</a
                >
              </div>
            {/if}
          </div>
        {:else}
          <a
            data-sveltekit-preload-data="tap"
            href="/auth/login"
            class="px-4 py-2 border rounded-md text-sm font-medium bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))]"
            >Sign in</a
          >
        {/if}
      </div>
    </div>

    {#if isMenuOpen}
      <div class="md:hidden py-2 space-y-2">
        {#each links as { name, link }}
          <a href={link} class="block px-4 py-2 text-sm font-medium">{name}</a>
        {/each}
      </div>
    {/if}
  </div>
</nav>
