<script lang="ts">
  import Loading from "../elements/Loading.svelte";
  export let mangaList: {
    title: string;
    thumb: string;
    type: string;
    endpoint: string;
    updated_on: string;
  }[] = [];

  let isLoading = true;

  setTimeout(() => {
    isLoading = false;
  }, 1000);
</script>

<div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-8">
  {#if isLoading}
    <div class="flex justify-center items-center h-48">
      <Loading />
    </div>
  {:else if mangaList.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {#each mangaList as manga}
        <div class="bg-[hsl(var(--card))] rounded-lg shadow-sm border border-[hsl(var(--border))] overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full">
          <img src={manga.thumb} alt={manga.title} class="w-full h-48 object-cover" />
          <div class="p-4 flex-1 min-h-[120px]">
            <h3 class="text-lg font-semibold text-[hsl(var(--foreground))] line-clamp-2 mb-3 hover:text-[hsl(var(--primary))] transition-colors">
              {manga.title}
            </h3>
            
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]">
                {manga.type}
              </span>
            </div>
          </div>

          <div class="p-4 border-t border-[hsl(var(--border))]">
            <div class="text-xs text-[hsl(var(--muted-foreground))] mb-3 h-6 flex items-center">
              <span class="whitespace-nowrap">Updated: {manga.updated_on}</span>
            </div>
            
            <a
              href={`/manga/${manga.endpoint}`}
              class="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] transition-colors whitespace-nowrap"
              data-sveltekit-preload-data="hover"
            >
              Read Now →
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
      <h3 class="mt-2 text-lg font-medium text-[hsl(var(--foreground))]">No manga found</h3>
      <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Try adjusting your search or filters</p>
    </div>
  {/if}
</div>
