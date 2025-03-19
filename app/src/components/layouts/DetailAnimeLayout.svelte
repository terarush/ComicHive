<script lang="ts">
  import Link from "svelte-link";

  interface AnimeData {
    title: string;
    poster: string;
    score: Score;
    japanese: string;
    synonyms: string;
    english: string;
    status: string;
    type: string;
    source: string;
    duration: string;
    episodes: number;
    season: string;
    studios: string;
    producers: string;
    aired: string;
    trailer: string;
    synopsis: Synopsis;
    genreList: Genre[];
    batchList: any[];
    episodeList: Episode[];
  }

  interface Score {
    value: string;
    users: string;
  }

  interface Synopsis {
    paragraphs: string[];
    connections: any[];
  }

  interface Genre {
    title: string;
    genreId: string;
    href: string;
    samehadakuUrl: string;
  }

  interface Episode {
    title: number;
    episodeId: string;
    href: string;
    samehadakuUrl: string;
  }

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
  class="bg-[hsl(var(--background))] py-[100px] text-[hsl(var(--foreground))] py-5"
>
  <div class="max-w-5xl mx-auto px-4">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex justify-center items-center sm:block">
        <img
          src={anime.poster}
          alt={anime.title}
          class="w-full max-w-[250px] md:max-w-[300px] rounded-md shadow-md"
        />
      </div>
      <div class="space-y-2">
        <h1 class="text-2xl font-bold">{anime.title || anime.english}</h1>
        <p class="text-sm text-[hsl(var(--muted-foreground))]">
          Japanese: {anime.japanese}
        </p>
        <p class="text-sm text-[hsl(var(--muted-foreground))]">
          Synonyms: {anime.synonyms}
        </p>
        <p class="text-sm">Status: {anime.status}</p>
        <p class="text-sm">Episodes: {anime.episodes}</p>
        <p class="text-sm">Season: {anime.season}</p>
        <p class="text-sm">Studios: {anime.studios}</p>
        <p class="text-sm">Source: {anime.source}</p>
        <p class="text-sm">Duration: {anime.duration}</p>
        <p class="text-sm">Aired: {anime.aired}</p>
        <p class="text-sm">
          Score: {anime.score.value} ({anime.score.users} users)
        </p>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each anime.genreList as genre}
            <Link href={genre.href}>
              <span
                class="px-3 py-1 text-xs font-medium bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))]"
              >
                {genre.title}
              </span>
            </Link>
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Synopsis</h2>
      {#each anime.synopsis.paragraphs as paragraph}
        <p class="text-sm mb-2">{paragraph}</p>
      {/each}
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Episodes</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        {#each anime.episodeList as episode}
          <Link
            href={`/anime/watch/${episode.episodeId}`}
            class="block px-4 py-3 bg-[hsl(var(--muted))] rounded-lg text-sm font-medium transition-all duration-300 shadow-sm 
              hover:bg-[hsl(var(--muted-foreground))] text-center hover:shadow-md"
          >
            Episode {episode.title}
          </Link>
        {/each}
      </div>
    </div>
  </div>
</section>
