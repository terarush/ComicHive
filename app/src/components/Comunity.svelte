<script lang="ts">
  import Link from "svelte-link";
</script>

<section
  class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden py-[250px]"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-30 blur-lg"
  ></div>

  <div class="relative max-w-5xl mx-auto px-4 text-center z-10">
    <h1 class="text-4xl font-extrabold text-[hsl(var(--background-foreground))] drop-shadow-lg">
      Welcome to the ComicHive Community
    </h1>
    <p class="mt-4 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
      ComicHive bukan hanya tempat membaca manga online, tetapi juga komunitas 
      penggemar yang aktif! Bergabunglah dengan kami untuk berdiskusi, berbagi rekomendasi,
      dan mendapatkan update terbaru tentang manga favoritmu.
    </p>

    <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/about"
        class="px-6 py-3 text-sm font-medium text-[hsl(var(--primary-foreground))] 
               bg-[hsl(var(--primary))] rounded-full focus:outline-none 
               focus:ring-2 focus:ring-[hsl(var(--ring))] transition-all 
               duration-300 shadow-lg hover:shadow-xl"
      >
        About Us
      </Link>
      <a
        href="https://chat.whatsapp.com/your-whatsapp-group-link"
        target="_blank"
        rel="noopener noreferrer"
        class="px-6 py-3 text-sm font-medium text-[hsl(var(--foreground))] 
               bg-[hsl(var(--muted))] hover:bg-[hsl(var(--accent))] 
               rounded-full focus:outline-none focus:ring-2 
               focus:ring-[hsl(var(--ring))] transition-all duration-300"
      >
        Join WhatsApp Group
      </a>
    </div>
  </div>

  <div
    class="absolute top-1/3 left-1/4 w-24 h-24 bg-[hsl(var(--primary))] 
           rounded-full opacity-30 blur-3xl animate-bounce-slow"
  ></div>
  <div
    class="absolute bottom-1/3 right-1/4 w-16 h-16 bg-[hsl(var(--secondary))] 
           rounded-full opacity-30 blur-2xl animate-float"
  ></div>
</section>

<style>
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-10px) translateX(10px);
    }
    50% {
      transform: translateY(10px) translateX(-10px);
    }
    75% {
      transform: translateY(-5px) translateX(5px);
    }
  }

  .animate-bounce-slow {
    animation: bounce-slow 5s infinite ease-in-out;
  }

  .animate-float {
    animation: float 8s infinite ease-in-out;
  }
</style>
