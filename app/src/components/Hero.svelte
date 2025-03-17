<section class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-30 blur-lg"></div>

  <div class="relative max-w-7xl mx-auto px-4 py-20 sm:py-32 flex flex-col md:flex-row items-center justify-between">
    <div class="text-center md:text-left mb-8 md:mb-0 z-10">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-[hsl(var(--foreground))] bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]">
        Welcome to <span class="text-[hsl(var(--primary))]">ComicHive</span>
      </h1>
      <p class="mt-4 text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-md">
        Your ultimate destination for reading manga online. Discover thousands of titles, connect with fellow fans, and enjoy seamless reading.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))] transition-all duration-300 shadow-lg hover:shadow-xl">
          Get Started
        </button>
        <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] hover:bg-[hsl(var(--accent))] cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))] transition-all duration-300">
          Explore Manga
        </button>
      </div>
    </div>

    <div class="flex-shrink-0 mt-8 md:mt-0 z-10">
      <img
        src="/icon.jpg"
        alt="ComicHive Hero Illustration"
        class="w-full h-auto max-w-md rounded-md shadow-2xl transform transition-transform duration-500"
      />
    </div>
  </div>

  <div class="absolute top-1/3 left-1/4 w-24 h-24 bg-[hsl(var(--primary))] rounded-full opacity-30 blur-3xl animate-bounce-slow"></div>
  <div class="absolute bottom-1/3 right-1/4 w-16 h-16 bg-[hsl(var(--secondary))] rounded-full opacity-30 blur-2xl animate-float"></div>
</section>

<style>
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-10px) translateX(10px); }
    50% { transform: translateY(10px) translateX(-10px); }
    75% { transform: translateY(-5px) translateX(5px); }
  }

  .animate-bounce-slow {
    animation: bounce-slow 5s infinite ease-in-out;
  }

  .animate-float {
    animation: float 8s infinite ease-in-out;
  }
</style>
