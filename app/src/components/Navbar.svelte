<script lang="ts">
  import ModeButton from "./elements/ModeButton.svelte";
  import Link from "svelte-link";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav
  class="fixed inset-x-0 top-0 z-50 bg-[hsl(var(--background)/0.8)] backdrop-blur-lg shadow-sm dark:bg-[hsl(var(--background)/0.8)]"
>
  <div class="w-full max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16 items-center">
      <div class="flex gap-2 items-center">
        <button
          class="md:hidden p-2 rounded-md text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          on:click={toggleMenu}
        >
          {#if isMenuOpen}
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
              xmlns="http://www.w3.org/2000/svg"
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

        <div class="flex items-center gap-2" aria-label="ComicHive">
          <svg
            class="h-6 w-6 text-[hsl(var(--primary))] fill-[hsl(var(--primary))]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
          <a href="/" class="text-lg font-bold text-[hsl(var(--primary))]"
            >ComicHive</a
          >
        </div>
      </div>
      <nav class="hidden md:flex gap-6">
        <Link
          href="/"
          class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Home
        </Link>
        <Link
          href="/anime"
          class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Anime
        </Link>
        <Link
          href="/manga"
          class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Manga
        </Link>
        <Link
          href="/community"
          class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Community
        </Link>
        <Link
          href="/about"
          class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          About
        </Link>
      </nav>

      <div class="flex items-center gap-4">
        <ModeButton />
        <Link
          href="/auth/login"
          class="inline-flex items-center justify-center px-4 py-2 border border-[hsl(var(--border))] rounded-md text-sm font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        >
          Sign in
        </Link>
      </div>
    </div>

    {#if isMenuOpen}
      <div class="md:hidden py-2 space-y-2">
        <Link
          href="/"
          class="block px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Home
        </Link>
        <Link
          href="/anime"
          class="block px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Anime
        </Link>
        <Link
          href="/manga"
          class="block px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Manga
        </Link>
        <Link
          href="/community"
          class="block px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Community
        </Link>
        <Link
          href="/about"
          class="block px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          About
        </Link>
      </div>
    {/if}
  </div>
</nav>

