<script lang="ts">
  import Loading from "../elements/Loading.svelte";
  import Link from "svelte-link";

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

<div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
  {#if isLoading}
    <Loading />
  {:else if animeList.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6">
      {#each animeList as anime}
        <div
          class="bg-[hsl(var(--card))] p-3 rounded-lg transition-all duration-300 hover:shadow-lg flex flex-col h-full border border-[hsl(var(--primary))] lg:mx-0 mx-2"
        >
          <img
            src={anime.poster}
            alt={anime.title}
            class="w-full h-52 object-cover rounded-md"
          />
          <div class="flex-1">
            <h3
              class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-1 mt-2"
            >
              {anime.title}
            </h3>
            <p class="text-sm text-[hsl(var(--muted-foreground))]">
              Type: {anime.type}
            </p>
            <p class="text-sm text-[hsl(var(--muted-foreground))]">
              Score: {anime.score}
            </p>
            <p class="text-sm text-[hsl(var(--muted-foreground))]">
              Status: {anime.status}
            </p>
            <div class="text-sm text-[hsl(var(--muted-foreground))] mt-2">
              Genres:
              <div class="flex flex-wrap gap-2 mt-2">
                {#each anime.genreList as genre}
                  <span
                    class="inline-flex items-center px-3 py-1 text-xs font-medium bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))]"
                  >
                    <a class="hover:underline">{genre.title}</a>
                  </span>
                {/each}
              </div>
            </div>
          </div>
          <Link
            href={`/anime/${anime.animeId}`}
            class="mt-3 inline-block text-[hsl(var(--background-foregroudn))] text-center py-2 border-[hsl(var(--background-foreground))] border rounded-md"
          >
            Watch Now
          </Link>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-[hsl(var(--muted-foreground))]">
      No results found.
    </p>
  {/if}
</div>
