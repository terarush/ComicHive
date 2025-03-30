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
    title: "Watch Latest Anime",
    description: "Enjoy streaming your favorite anime only on ComicHive!",
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
  <title>ComicHive - Watch anime for free without ads!</title>
</svelte:head>

<div>
  {#if isLoading}
    <LoadingElements />
  {:else}
    <MenuHero {...MenuHeroData} />
    <h1
      class="text-3xl font-bold text-[hsl(var(--foreground))] text-center mt-10 bg-[hsl(var(--background))]"
    >
      Latest Anime Releases
    </h1>
    <SearchAnime />
    <AnimeLayout {animeList} />
  {/if}
</div>
