<script lang="ts">
  import Loading from "../elements/Loading.svelte";
  export let mangaList: {
    title: string;
    type: string;
    endpoint: string;
    updated_on: string;
  }[] = [];

  let isLoading = true;

  setTimeout(() => {
    isLoading = false;
  }, 1000);
</script>

<div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
  {#if isLoading}
    <Loading />
  {:else if mangaList.length > 0}
    <div class="flex flex-wrap justify-center gap-6 mx-5">
      {#each mangaList as manga}
        <div
          class="w-full sm:w-64 bg-[hsl(var(--card))] p-2 rounded-md transition-all duration-300 hover:shadow-lg"
        >
          <h3
            class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-1 transition-colors"
          >
            {manga.title}
          </h3>
          <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Type: {manga.type}
          </p>
          <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Updated: {manga.updated_on}
          </p>
          <a
          data-sveltekit-preload-data={false}
            href={`/manga/${manga.endpoint}`}
            class="mt-3 inline-block text-[hsl(var(--primary))] hover:text-[hsl(var(--background-foreground))] transition-colors duration-300"
          >
            Read More
          </a>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-[hsl(var(--muted-foreground))]">
      No results found.
    </p>
  {/if}
</div>
