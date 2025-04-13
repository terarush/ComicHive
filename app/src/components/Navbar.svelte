<script lang="ts">
  import { user, fetchUser } from "../stores/user";
  import ModeButton from "./elements/ModeButton.svelte";
  import { onMount } from "svelte";
  import { Bot, Home, Book, Users, Info, User } from "@lucide/svelte";
  import { title } from "../data";
  import ProfileMenu from "./fragments/ProfileMenu.svelte";
  import { fade } from "svelte/transition";

  let isProfileMenuOpen = false;
  let isLoadUser = true;
  let isMobile = false;

  function toggleProfileMenu(event: Event) {
    event.stopPropagation();
    isProfileMenuOpen = !isProfileMenuOpen;
  }

  function closeProfileMenu() {
    isProfileMenuOpen = false;
  }

  onMount(() => {
    let mounted = true;

    const loadData = async () => {
      await fetchUser();
      if (mounted) {
        isLoadUser = false;
      }
    };

    loadData();

    const checkMobile = () => {
      if (mounted) {
        isMobile = window.innerWidth < 768;
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("click", closeProfileMenu);

    return () => {
      mounted = false;
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("click", closeProfileMenu);
    };
  });

  $: profile = $user;

  function getInitials(name: string | undefined) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  const links = [
    { name: "Home", link: "/", icon: Home },
    { name: "Anime", link: "/anime", icon: Book },
    { name: "Manga", link: "/manga", icon: Book },
    { name: "Community", link: "/community", icon: Users },
    { name: "About", link: "/about", icon: Info },
  ];
</script>

<nav
  class="hidden md:block fixed inset-x-0 top-0 z-50 bg-[hsl(var(--background)/0.8)] backdrop-blur-lg shadow-sm"
>
  <div class="w-full max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16 items-center">
      <div class="flex gap-2 items-center">
        <a
          href="/"
          class="text-lg font-bold text-[hsl(var(--primary))] flex gap-2 items-center"
        >
          <Bot />
          {title}
        </a>
      </div>

      <nav data-sveltekit-preload-data="false" class="flex gap-6">
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

            {#if isProfileMenuOpen && !isMobile}
              <div class="absolute right-0 mt-2 z-50" transition:fade>
                <ProfileMenu
                  {profile}
                  isMobile={false}
                  onClose={closeProfileMenu}
                />
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
  </div>
</nav>

<div
  class="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]"
>
  <div class="flex justify-around items-center h-16">
    {#each links.slice(0, 3) as { name, link, icon: Icon }}
      <a
        href={link}
        class="flex flex-col items-center justify-center w-full h-full text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
      >
        <Icon class="w-5 h-5" />
        <span class="text-xs mt-1">{name}</span>
      </a>
    {/each}

    {#if isLoadUser}{:else if profile}
      <div
        class="relative flex flex-col items-center justify-center w-full h-full"
      >
        <button
          class="flex flex-col items-center justify-center w-full h-full"
          on:click|stopPropagation={toggleProfileMenu}
        >
          {#if profile.avatar}
            <img
              src={profile.avatar}
              alt="Profile"
              class="w-6 h-6 rounded-full"
            />
          {:else}
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold bg-[hsl(var(--primary))]"
            >
              {getInitials(profile.name)}
            </div>
          {/if}
          <span class="text-xs mt-1">Profile</span>
        </button>
      </div>
    {:else}
      <a
        data-sveltekit-preload-data="tap"
        href="/auth/login"
        class="flex flex-col items-center justify-center w-full h-full text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
      >
        <User class="w-5 h-5" />
        <span class="text-xs mt-1">Login</span>
      </a>
    {/if}
  </div>
</div>

{#if isProfileMenuOpen && profile && isMobile}
  <div transition:fade>
    <ProfileMenu {profile} isMobile={true} onClose={closeProfileMenu} />
  </div>
{/if}

