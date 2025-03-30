<script lang="ts">
  import type { AnimeData } from "../../types/types";
  export let anime: AnimeData = {
    title: "",
    poster: "",
    score: { value: "", users: "" },
    japanese: "",
    synonyms: "",
    english: "",
    status: "",
    type: "",
    source: "",
    duration: "",
    episodes: 0,
    season: "",
    studios: "",
    producers: "",
    aired: "",
    trailer: "",
    synopsis: { paragraphs: [], connections: [] },
    genreList: [],
    batchList: [],
    episodeList: [],
  };
</script>

<section
  class="bg-[hsl(var(--background))] py-12 text-[hsl(var(--foreground))] mt-6"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div class="flex-shrink-0 w-full lg:w-auto flex justify-center lg:block">
        <div class="relative group w-full max-w-[280px] lg:max-w-[320px]">
          <img
            src={anime.poster}
            alt={anime.title}
            class="w-full rounded-xl shadow-lg border-2 border-[hsl(var(--border))] transition-transform duration-300"
          />
          {#if anime.score}
            <div
              class="absolute top-3 right-3 bg-[hsl(var(--primary))] text-white text-sm font-bold px-3 py-1 rounded-full flex items-center backdrop-blur-sm"
            >
              ★ {anime.score.value}
            </div>
          {/if}
        </div>
      </div>

      <div class="flex-1 space-y-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">
            {anime.title || anime.english}
          </h1>
          {#if anime.japanese}
            <p class="text-lg text-[hsl(var(--muted-foreground))] mt-1">
              {anime.japanese}
            </p>
          {/if}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="space-y-1">
            <p class="text-[hsl(var(--muted-foreground))]">Status</p>
            <p>{anime.status}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[hsl(var(--muted-foreground))]">Episodes</p>
            <p>{anime.episodes}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[hsl(var(--muted-foreground))]">Aired</p>
            <p>{anime.aired}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[hsl(var(--muted-foreground))]">Duration</p>
            <p>{anime.duration}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[hsl(var(--muted-foreground))]">Season</p>
            <p>{anime.season}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[hsl(var(--muted-foreground))]">Studios</p>
            <p>{anime.studios}</p>
          </div>
          {#if anime.synonyms}
            <div class="space-y-1 sm:col-span-2">
              <p class="text-[hsl(var(--muted-foreground))]">Synonyms</p>
              <p>{anime.synonyms}</p>
            </div>
          {/if}
        </div>

        <div class="flex flex-wrap gap-2 pt-2">
          {#each anime.genreList as genre}
            <a
              href={genre.href}
              data-sveltekit-preload-data="hover"
              class="px-3 py-1 text-xs font-medium bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] rounded-full hover:bg-[hsl(var(--primary)/0.2)] transition-colors"
            >
              {genre.title}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-12">
      <h2
        class="text-2xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]"
      >
        Synopsis
      </h2>
      <div class="prose max-w-none text-[hsl(var(--foreground))]">
        {#each anime.synopsis.paragraphs as paragraph}
          <p class="mb-4">{paragraph}</p>
        {/each}
      </div>
    </div>

    <div class="mt-12">
      <h2
        class="text-2xl font-bold mb-6 pb-2 border-b border-[hsl(var(--border))]"
      >
        Episodes
      </h2>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {#each anime.episodeList as episode}
          <a
            href={`/anime/watch/${episode.episodeId}`}
            data-sveltekit-preload-data="hover"
            class="block px-4 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.3)] hover:shadow-sm text-center"
          >
            Episode {episode.title}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
