<script lang="ts">
  import { FetchMangaApi } from "../utils/Fetch";
  import Search from "./fragments/Search.svelte";
  import ResultSearchLayout from "./layouts/ResultSearchLayout.svelte";

  let searchResults: {
    title: string;
    type: string;
    endpoint: string;
    updated_on: string;
    thumb: string;
    sortDesc: string;
  }[] = [];

  let hasInteracted = false;

  async function handleSearch(query: string) {
    hasInteracted = true;

    try {
      const response = await FetchMangaApi.get(`api/search?q=${query}`);
      if (response.status && response.data.manga_list) {
        searchResults = response.data.manga_list;
      } else {
        searchResults = [];
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      searchResults = [];
    }
  }
</script>

<div class="bg-[hsl(var(--background))]">
  <div class="flex justify-center items-center pt-20">
    <Search placeholder="Search manga..." on:search={(e) => handleSearch(e.detail)} />
  </div>

  {#if hasInteracted}
    <div class="mt-8 mx-auto">
      <ResultSearchLayout mangaList={searchResults} />
    </div>
  {/if}
</div>
