<script lang="ts">
  import { title } from "../data/index";
  import {
    ArrowRight,
    BookmarkCheck,
    Sparkles,
    Book,
    Flame,
    Play,
    Users,
  } from "@lucide/svelte";
  import ModeButton from "./elements/ModeButton.svelte";
</script>

<div class="hidden md:block">
  <section
    class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden min-h-screen flex items-center"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.2)] via-[hsl(var(--secondary)/0.15)] to-[hsl(var(--tertiary)/0.1)] opacity-30 animate-gradient-shift"
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <div class="text-center md:text-left z-10 max-w-2xl">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent)/0.2)] rounded-full mb-6 border border-[hsl(var(--border)/0.3)]"
        >
          <span class="relative flex h-3 w-3">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-[hsl(var(--primary))]"
            ></span>
          </span>
          <span class="text-sm font-medium text-[hsl(var(--foreground))]"
            >New releases every day</span
          >
        </div>

        <h1
          class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-[hsl(var(--background-foreground))]"
        >
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]"
            >Welcome to {title}!</span
          ><br />
          <span class="text-[hsl(var(--foreground))]"
            >Read Manga & Watch Anime</span
          >
        </h1>

        <p
          class="mt-6 text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-lg leading-relaxed"
        >
          {title} is the best platform to read manga, manhwa, and watch anime for
          free. Discover thousands of titles, connect with the community, and enjoy
          a delightful reading experience!
        </p>

        <div
          class="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <a
            href="/manga"
            class="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
          >
            <span
              class="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary)/0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></span>
            <span class="relative z-10 flex items-center gap-2">
              Start Reading
              <ArrowRight class="w-5 h-5" />
            </span>
          </a>

          <a
            href="/anime"
            class="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[hsl(var(--foreground))] bg-transparent rounded-full border-2 border-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all duration-300 hover:-translate-y-1"
          >
            Explore Anime
          </a>
        </div>

        <div
          class="mt-12 flex items-center justify-center md:justify-start gap-4 text-sm text-[hsl(var(--muted-foreground))]"
        >
          <div class="flex items-center gap-2">
            <BookmarkCheck class="w-4 h-4" />
            <span>10,000+ Titles</span>
          </div>
          <div class="flex items-center gap-2">
            <Users class="w-4 h-4" />
            <span>1M+ Readers</span>
          </div>
        </div>
      </div>

      <div class="flex-shrink-0 z-10">
        <div class="relative group">
          <div
            class="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--primary)/0.4)] to-[hsl(var(--tertiary)/0.4)] rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
          ></div>
          <img
            src="https://i.pinimg.com/736x/03/8d/1b/038d1b556495a5504e08c11dcaaaf090.jpg"
            alt="ComicHive Hero Illustration"
            class="relative w-full h-auto max-w-md rounded-2xl border-2 border-[hsl(var(--border)/0.3)] shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  </section>
</div>

<div class="md:hidden relative bg-[hsl(var(--background))] pb-20">
  <header
    class="sticky top-0 z-50 bg-[hsl(var(--background)/0.95)] backdrop-blur-sm p-4 border-b border-[hsl(var(--border))] flex justify-between items-center"
  >
    <h1 class="text-xl font-bold flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"
      ></span>
      {title}
    </h1>
    <div class="flex items-center gap-4">
      <ModeButton />
    </div>
  </header>

  <div class="px-5 pt-6 pb-4">
    <div
      class="bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] rounded-md p-6 mb-6"
    >
      <div class="flex items-center gap-2 mb-3">
        <Sparkles class="w-5 h-5 text-[hsl(var(--primary))]" />
        <span class="text-sm font-medium">New releases daily</span>
      </div>
      <h2 class="text-2xl font-bold mb-2">Welcome to {title}!</h2>
      <p class="text-[hsl(var(--muted-foreground))] mb-5">
        Your favorite manga and anime in one app
      </p>
      <div class="flex gap-3">
        <a
          href="/manga"
          class="flex-1 bg-[hsl(var(--primary))] text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2"
        >
          <Book class="w-4 h-4" /> Read
        </a>
        <a
          href="/anime"
          class="flex-1 bg-[hsl(var(--secondary))] border border-[hsl(var(--primary))] text-[hsl(var(--foreground))] py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2"
        >
          <Play class="w-4 h-4" /> Watch
        </a>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-6">
      <div class="bg-[hsl(var(--muted))] p-4 rounded-md">
        <div class="flex items-center gap-2">
          <BookmarkCheck class="w-5 h-5 text-[hsl(var(--primary))]" />
          <span class="font-medium">10,000+</span>
        </div>
        <p class="text-xs text-[hsl(var(--muted-foreground))] mt-1">Titles</p>
      </div>

      <div class="bg-[hsl(var(--muted))] p-4 rounded-md">
        <div class="flex items-center gap-2">
          <Flame class="w-5 h-5 text-[hsl(var(--primary))]" />
          <span class="font-medium">50+</span>
        </div>
        <p class="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          Trending Now
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient-shift {
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
  }
</style>
