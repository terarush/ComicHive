<script lang="ts">
  import AnimeLayout from "../../components/layouts/AnimeLayout.svelte";
  import MenuHero from "../../components/MenuHero.svelte";
  import LoadingElements from "../../components/elements/LoadingElements.svelte";
  import { FetchAnimeApi } from "../../utils/Fetch";
  import { onMount } from "svelte";
    import SearchAnime from "../../components/SearchAnime.svelte";

  let animeList: any[] = [];
  let isLoading = true;
  let message = "";

  const MenuHeroData = {
    title: "Nonton Anime Terbaru",
    description: "Nikmati streaming anime favoritmu hanya di Comichive!",
    imageUrl: "/icon.jpg",
  };

  onMount(async () => {
    try {
      const response = await FetchAnimeApi.get("/recent");
      animeList = response.data.data.animeList;
    } catch (error) {
      console.error("Error fetching data:", error);
      isLoading = false;
      message = "Server error";
    } finally {
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <title>ComicHive - Tonton anime secara gratis tanpa iklan!</title>
</svelte:head>

<div>
  {#if isLoading}
    <LoadingElements/>
  {:else}
    <MenuHero {...MenuHeroData} />
    
    <h1 class="text-3xl font-bold text-[hsl(var(--foreground))] text-center mt-10 bg-[hsl(var(--background))]">
      Anime Release Terbaru
    </h1>
    <SearchAnime/>
    <AnimeLayout {animeList} />
  {/if}
</div>
