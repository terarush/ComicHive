<script lang="ts">
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

<section
  class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-12"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <slot />
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
    >
      {#each animeList as anime}
        <a
          href={`/anime/${anime.animeId}`}
          class="group relative flex flex-col"
          data-sveltekit-preload-data="hover"
        >
          <div
            class="relative w-full aspect-[3/2] rounded-md overflow-hidden shadow-lg bg-[hsl(var(--muted))] transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
          >
            <img
              src={anime.poster}
              alt={anime.title}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div
              class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            >
              <div class="text-xs text-white/90 mb-1">
                {text}
                {anime.releasedOn}
              </div>
              <div class="text-xs text-white/70">
                {anime.episodes} episodes
              </div>
            </div>
          </div>

          <h3
            class="mt-3 text-sm font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2"
          >
            {anime.title}
          </h3>
        </a>
      {/each}
    </div>
  </div>
</section>
