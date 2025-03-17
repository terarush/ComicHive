<script lang="ts">
  import { onMount } from "svelte";
  import SearchManga from "../../components/SearchManga.svelte";
  import MangaLayout from "../../components/layouts/MangaLayout.svelte";
  import Loading from "../../components/elements/Loading.svelte";
  import Pagination from "../../components/elements/Pagination.svelte";
  import { fetchMangaPage } from "../../hooks/ManggaHooks";

  let mangaList: any[] = [];
  let currentPage = 1;
  let isLoading = false;
  let hasMorePages = true;

  const loadMangaPage = async (page: number) => {
    if (!hasMorePages) return;

    try {
      isLoading = true;
      const newMangaList = await fetchMangaPage(page);

      if (newMangaList.length > 0) {
        mangaList = newMangaList; 
      } else {
        hasMorePages = false; 
      }
    } catch (err) {
      console.error("Failed to load manga data:", err);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    loadMangaPage(currentPage);
  });

  const handlePageChange = (page: number) => {
    currentPage = page;
    loadMangaPage(page); 
  };
</script>

<main>
  <SearchManga />
  {#if mangaList.length === 0}
    <div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[250px]">
      <Loading />
    </div>
  {:else}
    <MangaLayout {mangaList} text="update at "/>
    <Pagination
      {currentPage}
      totalPages={Infinity}
      onPageChange={handlePageChange}
    />
  {/if}
</main>
