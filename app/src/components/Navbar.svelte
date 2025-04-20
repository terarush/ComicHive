<script lang="ts">
  import { user, fetchUser } from "../stores/user";
  import ModeButton from "./elements/ModeButton.svelte";
  import { onMount } from "svelte";
  import { User, LogOut, Bot, LayoutDashboard } from "@lucide/svelte";
  import { fade } from "svelte/transition";
  import { title } from "../data";

  let isMenuOpen = false;
  let isProfileMenuOpen = false;
  let isLoadUser: boolean = true;

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

  onMount(async () => {
    await fetchUser();
    isLoadUser = false;
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
          class="md:hidden p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))/70] transition-all"
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

        <a
          href="/"
          class="text-lg font-bold text-[hsl(var(--primary))] flex gap-2 items-center"
        >
          <Bot />
          {title}
        </a>
      </div>

      <nav data-sveltekit-preload-data="false" class="hidden md:flex gap-6">
        {#each links as { name, link }}
          <a
            href={link}
            class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >{name}</a
          >
        {/each}
      </nav>

      <div class="flex items-center gap-4 relative">
        <ModeButton />

        {#if isLoadUser}{:else if profile}
          <div class="relative">
            <button
              class="flex items-center gap-2 cursor-pointer"
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
                transition:fade
                class="absolute right-0 mt-2 w-60 origin-top-right rounded-md bg-[hsl(var(--background))] shadow-xl border border-[hsl(var(--border))] ring-1 ring-black/5 overflow-hidden z-50"
              >
                <div class="px-4 py-3 border-b border-[hsl(var(--border))]">
                  <p class="text-sm font-medium text-[hsl(var(--foreground))]">
                    {profile.name}
                  </p>
                  <p
                    class="text-xs text-[hsl(var(--muted-foreground))] truncate"
                  >
                    @{profile.username}
                  </p>
                </div>
                <div class="py-1">
                  <a
                    href="/profile"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/60 rounded-md transition-all duration-200 ease-in-out"
                  >
                    <User class="w-5 h-5" />
                    Profile
                  </a>
                  {#if $user?.role === "ADMIN"}
                    <a
                      data-sveltekit-preload-data="tap"
                      href="/dashboard"
                      class="flex items-center gap-2 px-4 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/60 rounded-md transition-all duration-200 ease-in-out"
                    >
                      <LayoutDashboard class="w-5 h-5" />
                      Dashboard
                    </a>
                  {/if}
                  <a
                    href="/auth/logout"
                    class="flex items-center gap-2 px-4 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/60 rounded-md transition-all duration-200 ease-in-out"
                  >
                    <LogOut class="w-5 h-5" />
                    Logout
                  </a>
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <a
            data-sveltekit-preload-data="tap"
            href="/auth/login"
            class="px-4 py-2 rounded-md text-sm font-medium border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)] transition-colors"
          >
            Sign In
          </a>
        {/if}
      </div>
    </div>

    {#if isMenuOpen}
      <div
        transition:fade
        class="md:hidden mt-4 space-y-2 bg-[hsl(var(--background))] rounded-md p-4 shadow-md border border-[hsl(var(--border))] transition-all"
      >
        {#each links as { name, link }}
          <a
            href={link}
            class="block px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]/60 rounded-md transition-all"
            >{name}</a
          >
        {/each}
      </div>
    {/if}
  </div>
</nav>
