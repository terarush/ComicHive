<script lang="ts">
  import Link from 'svelte-link';

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

<section class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-[20px]">
  <div class="max-w-6xl mx-auto px-4">
    <slot />
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each animeList as anime}
        <Link href={`/anime/${anime.animeId}`} class="flex">
          <div
            class="flex flex-col w-full bg-[hsl(var(--card))] border rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div class="w-full aspect-[4/3] relative overflow-hidden">
              <img
                src={anime.poster}
                alt={anime.title}
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div class="p-4 space-y-2 flex-grow">
              <h3
                class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-1 hover:text-blue-500 transition-colors"
              >
                {anime.title}
              </h3>
              <div class="text-xs text-[hsl(var(--muted-foreground))]">
                {text} {anime.releasedOn} - {anime.episodes} episodes
              </div>
            </div>
          </div>
        </Link>
      {/each}
    </div>
  </div>
</section>
