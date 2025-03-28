<script lang="ts">
  import Loading from "../elements/Loading.svelte";

  export let animeList: {
    title: string;
    poster: string;
    type: string;
    score: string;
    status: string;
    animeId: string;
    href: string;
    genreList: { title: string; genreId: string; href: string }[];
  }[] = [];

  let isLoading = true;

  setTimeout(() => {
    isLoading = false;
  }, 1000);
</script>

<div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-8">
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <Loading />
    </div>
  {:else if animeList.length > 0}
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {#each animeList as anime}
        <div
          class="group relative bg-[hsl(var(--card))] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[hsl(var(--border))]"
        >
          <div class="w-full overflow-hidden">
            <img
              src={anime.poster}
              alt={anime.title}
              class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div
              class="absolute top-2 left-2 bg-[hsl(var(--primary))] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center"
            >
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              {anime.score}
            </div>
          </div>

          <div class="p-4">
            <h3
              class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-2 mb-2 group-hover:text-[hsl(var(--primary))] transition-colors"
            >
              {anime.title}
            </h3>

            <div class="flex flex-wrap gap-2 mb-3">
              <span class="text-xs px-2 py-1 bg-[hsl(var(--muted))] rounded-md">
                {anime.type}
              </span>
              <span class="text-xs px-2 py-1 bg-[hsl(var(--muted))] rounded-md">
                {anime.status}
              </span>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              {#each anime.genreList.slice(0, 3) as genre}
                <a
                  href={genre.href}
                  class="text-xs px-2 py-1 bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] rounded-md hover:bg-[hsl(var(--primary)/0.2)] transition-colors"
                  data-sveltekit-preload-data="hover"
                >
                  {genre.title}
                </a>
              {/each}
              {#if anime.genreList.length > 3}
                <span
                  class="text-xs px-2 py-1 bg-[hsl(var(--muted))] rounded-md"
                >
                  +{anime.genreList.length - 3}
                </span>
              {/if}
            </div>

            <a
              href={`/anime/${anime.animeId}`}
              class="w-full inline-flex items-center justify-center px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-md hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
              data-sveltekit-preload-data="hover"
            >
              Watch Now
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-16">
      <svg
        class="mx-auto h-12 w-12 text-[hsl(var(--muted-foreground))]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-[hsl(var(--foreground))]">
        No results found
      </h3>
      <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Try adjusting your search or filter
      </p>
    </div>
  {/if}
</div>
