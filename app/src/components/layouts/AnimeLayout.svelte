<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";

  export let animeList: {
    title?: string;
    poster?: string;
    episodes?: string;
    releasedOn?: string;
    animeId?: string;
    href?: string;
    samehadakuUrl?: string;
  }[] = [];

  export let text: string = "Last episode";
</script>

<section class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if animeList.length > 0}
      <slot />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each animeList as anime}
          <div
            class="group relative bg-[hsl(var(--card))] rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[hsl(var(--border))] flex flex-col h-full"
          >
            <a href={`/anime/${anime.animeId}`} class="block flex-shrink-0" data-sveltekit-preload-data="hover">
              <div class="w-full overflow-hidden relative aspect-video">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div class="text-xs text-white/90 mb-1">
                    {text} {anime.releasedOn}
                  </div>
                  <div class="text-xs text-white/70">{anime.episodes} episodes</div>
                </div>
              </div>
            </a>
            <div class="p-4 flex flex-col flex-grow">
              <div class="flex-grow">
                <h3 class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-2 mb-3 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {anime.title}
                </h3>
              </div>
              <a
                href={`/anime/${anime.animeId}`}
                class="mt-auto w-full inline-flex items-center justify-center px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-md hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
                data-sveltekit-preload-data="hover"
              >
                Watch Now
                <ArrowRight class="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <svg class="mx-auto h-12 w-12 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-[hsl(var(--foreground))]">No anime found</h3>
        <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Try adjusting your search or filter</p>
      </div>
    {/if}
  </div>
</section>

