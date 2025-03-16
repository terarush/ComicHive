<script lang="ts">
  import ModeButton from "./elements/ModeButton.svelte";
  import Link from "svelte-link";
</script>

<nav
  class="fixed inset-x-0 top-0 z-50 bg-[hsl(var(--background))] shadow-sm dark:bg-[hsl(var(--background))]"
>
  <div class="w-full max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16 items-center">
      <div class="flex items-center gap-2" aria-label="ComicHive">
        <svg
          class="h-6 w-6 text-[hsl(var(--foreground))]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
        <span class="text-lg font-bold text-[hsl(var(--primary))]">ComicHive</span>
      </div>

      <nav class="hidden md:flex gap-6">
        <Link
          href="/"
          class="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] rounded-md"
        >
          Home
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
          href="/signin"
          class="inline-flex items-center justify-center px-4 py-2 border border-[hsl(var(--border))] rounded-md text-sm font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        >
          Sign in
        </Link>
      </div>
    </div>
  </div>
</nav>
