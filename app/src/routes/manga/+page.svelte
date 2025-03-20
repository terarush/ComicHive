<script lang="ts">
  import { onMount } from "svelte";
  import SearchManga from "../../components/SearchManga.svelte";
  import MangaLayout from "../../components/layouts/MangaLayout.svelte";
  import LoadingElements from "../../components/elements/LoadingElements.svelte";
  import Pagination from "../../components/elements/Pagination.svelte";
  import MenuHero from "../../components/MenuHero.svelte";
  import { fetchMangaPage } from "../../hooks/MangaHooks";

  let mangaList: any[] = [];
  let currentPage = 1;
  let isLoading = false;
  let hasMorePages = true;

  const MenuHeroData = {
    title: "Baca Manga & Manhwa Terbaru",
    description:
      "Nikmati streaming Manga & Manhwa favoritmu hanya di Comichive!",
    imageUrl: "/icon.jpg",
  };

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

<svelte:head>
  <title>ComicHive - Baca manga secara gratis!</title>
</svelte:head>

<main>
  {#if mangaList.length === 0}
  <LoadingElements/>
  {:else}
    <MenuHero {...MenuHeroData} />
    <SearchManga />
    <MangaLayout {mangaList} text="update at " />
    <Pagination
      {currentPage}
      totalPages={Infinity}
      onPageChange={handlePageChange}
    />
  {/if}
</main>
