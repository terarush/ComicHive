<script lang="ts">
  import { onMount } from "svelte";
  import Hero from "../components/Hero.svelte";
  import MangaLayout from "../components/layouts/MangaLayout.svelte";
  import LoadingElements from "../components/elements/LoadingElements.svelte";
  import SearchManga from "../components/SearchManga.svelte";
  import TopManga from "../components/TopManga.svelte";
  import { fetchPopularManga } from "../hooks/MangaHooks";

  let mangaList: {
    id: number;
    title: string;
    image: string;
    upload_on: string;
    description: string;
  }[] = [];

  let isLoading = true;

  onMount(async () => {
    try {
      mangaList = await fetchPopularManga();
    } catch (error) {
      console.error("Failed to fetch manga data:", error);
    } finally {
      isLoading = false;
    }
  });
</script>

<main>
  <Hero />
  <SearchManga />
  {#if isLoading}
    <LoadingElements />
  {:else}
    <MangaLayout {mangaList} text="Last post ">
      <TopManga />
    </MangaLayout>
  {/if}
</main>
