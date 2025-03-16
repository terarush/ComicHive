<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Navbar from "../components/Navbar.svelte";
  import Hero from "../components/Hero.svelte";
  import TopMangaLayout from "../components/layouts/TopMangaLayout.svelte";
  import LoadingElements from "../components/elements/LoadingElements.svelte";

  let mangaList: {
    id: number;
    title: string;
    image: string;
    upload_on: string;
    description: string;
  }[] = [];

  let isLoading = true;

  async function fetchMangaData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MANGA_API}/api/manga/popular/1`,
      );

      const apiData = response.data;
      if (apiData.status && apiData.manga_list) {
        mangaList = apiData.manga_list.map((item: any, index: number) => ({
          id: index + 1,
          title: item.title,
          image: item.thumb,
          upload_on: item.upload_on || "No upload info",
          description: item.sortDesc || "No description available.",
        }));
      }
    } catch (error) {
      console.error("Error fetching manga data:", error);
    } finally {
      isLoading = false; 
    }
  }

  onMount(() => {
    fetchMangaData();
  });
</script>

<main>
  <Navbar />
  <Hero />
  {#if isLoading}
    <LoadingElements />
  {:else}
    <TopMangaLayout mangaList={mangaList} />
  {/if}
</main>
