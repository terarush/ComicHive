<script lang="ts">
  import { FetchAnimeApi } from "../utils/Fetch";
  import Search from "./fragments/Search.svelte";
  import ResultSearchAnime from "./layouts/ResultSearchAnime.svelte";
  
  let searchResults: any;

  let hasInteracted = false;
  let isLoading = false;

  async function handleSearch(query: string) {
    hasInteracted = true;
    isLoading = true;

    try {
      const response = await FetchAnimeApi.get(`/search?q=${query}`);
      if (response.status && response.data.data.animeList) {
        searchResults = response.data.data.animeList;
      } else {
        searchResults = [];
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      searchResults = [];
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="bg-[hsl(var(--background))]">
  <div class="flex justify-center items-center pt-20">
    <Search placeholder="Cari anime..." on:search={(e) => handleSearch(e.detail)} />
  </div>

  {#if hasInteracted}
    <div class="mt-8 mx-auto">
      {#if isLoading}
        <p class="text-center text-[hsl(var(--muted-foreground))]"></p>
      {:else}
        <ResultSearchAnime animeList={searchResults} />
      {/if}
    </div>
  {/if}
</div>

