<script lang="ts">
  import Link from "svelte-link";
  import { Facebook, Twitter, Instagram, Send } from "@lucide/svelte";
</script>

<footer
  class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-20 blur-lg"
  ></div>

  <div class="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[hsl(var(--primary))]">
          About ComicHive
        </h3>
        <p class="text-sm text-[hsl(var(--muted-foreground))]">
          Your ultimate destination for reading manga online. Discover thousands
          of titles, connect with fellow fans, and enjoy seamless reading.
        </p>
      </div>

      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[hsl(var(--primary))]">
          Quick Links
        </h3>
        <ul class="space-y-2">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/explore">Explore Manga</Link></li>
          <li><Link href="/community">Community</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </div>

      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[hsl(var(--primary))]">Follow Us</h3>
        <div class="flex gap-4">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <Facebook class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <Twitter class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300" />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <Instagram class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300" />
          </Link>
          <Link href="https://discord.com" target="_blank" aria-label="Discord">
            <Send class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300" />
          </Link>
        </div>
      </div>
    </div>

    <div
      class="mt-12 border-t border-[hsl(var(--border))] pt-6 text-center text-sm text-[hsl(var(--muted-foreground))]"
    >
      &copy; {new Date().getFullYear()} ComicHive. All rights reserved.
    </div>
  </div>
</footer>

