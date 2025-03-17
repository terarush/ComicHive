<script lang="ts">
  import { onMount } from "svelte";
  import Hero from "../components/Hero.svelte";
  import TopMangaLayout from "../components/layouts/TopMangaLayout.svelte";
  import LoadingElements from "../components/elements/LoadingElements.svelte";
  import { fetchPopularManga } from "../hooks/PopularMangaHooks";

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

  {#if isLoading}
    <LoadingElements />
  {:else}
    <TopMangaLayout {mangaList} />
  {/if}
</main>
