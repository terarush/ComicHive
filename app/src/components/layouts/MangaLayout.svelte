<script lang="ts">
  export let mangaList: {
    id?: number;
    title?: string;
    image?: string;
    upload_on?: string;
    description?: string;
    endpoint?: string;
  }[] = [];

  export let text: string = "Last post";
</script>

<section class="bg-[hsl(var(--background))] py-10 sm:py-14 text-[hsl(var(--foreground))]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <slot />
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {#each mangaList as manga}
        <a 
          href={`/manga/${manga.endpoint}`} 
          class="group relative flex flex-col rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          data-sveltekit-preload-data="hover"
          rel="noopener noreferrer"
        >
          <div class="relative w-full aspect-[3/4] bg-[hsl(var(--muted))]">
            <img
              src={manga.image}
              alt={manga.title}
              class="w-full h-full object-cover"
              loading="lazy"
            />
            
            <div class="absolute top-2 right-2 bg-[hsl(var(--primary))] text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {manga.upload_on}
            </div>
          </div>

          <div class="p-3 flex-1 flex flex-col">
            <h3 class="text-sm font-semibold text-[hsl(var(--foreground))] line-clamp-2 mb-1.5 group-hover:text-[hsl(var(--primary))] transition-colors">
              {manga.title}
            </h3>
            
            <p class="text-xs text-[hsl(var(--muted-foreground))] line-clamp-3 mb-3">
              {manga.description}
            </p>
            
            <div class="mt-auto text-xs text-[hsl(var(--primary))] font-medium">
              {text} {manga.upload_on}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
