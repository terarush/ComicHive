<script lang="ts">
</script>

<section class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] opacity-20"></div>

  <div class="relative max-w-7xl mx-auto px-4 py-20 sm:py-32 flex flex-col md:flex-row items-center justify-between">
    <div class="text-center md:text-left mb-8 md:mb-0">
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-[hsl(var(--foreground))]">
        Welcome to <span class="text-[hsl(var(--primary))]">ComicHive</span>
      </h1>
      <p class="mt-4 text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-md">
        Your ultimate destination for reading manga online. Discover thousands of titles, connect with fellow fans, and enjoy seamless reading.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium hover:text-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))]">
          Get Started
        </button>
        <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] hover:bg-[hsl(var(--accent))] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))]">
          Explore Manga
        </button>
      </div>
    </div>

    <div class="flex-shrink-0 mt-8 md:mt-0">
      <img
        src="/icon.jpg"
        alt="ComicHive Hero Illustration"
        class="w-full h-auto max-w-md rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>
