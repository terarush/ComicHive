<script lang="ts">
  import { onMount } from "svelte";
  import { FetchAnimeApi } from "../../../utils/Fetch";
  import type { AnimeSlug } from "./proxy+page";
  import DetailAnimeLayout from "../../../components/layouts/DetailAnimeLayout.svelte";
  import LoadingElements from "../../../components/elements/LoadingElements.svelte";

  export let data: AnimeSlug;
  let animeData: any;
  let error: string | null = null;
  let title: string = "ComicHive";
  let description: string = "Platform baca manga & nonton anime";

  onMount(async () => {
    try {
      const response = await FetchAnimeApi.get(`/anime/${data.slug}`);
      if (response.status === 404) {
        error = "Anime not found.";
        return;
      }
      animeData = response.data.data;
      title = animeData.english || animeData.japanese || "ComicHive";
      description = `Watch ${title} - ${animeData.type} | Status: ${animeData.status} | Rating: ${animeData.score?.value || 'N/A'}`;
    } catch (err) {
      error = "Failed to fetch anime details.";
      console.error(err);
    }
  });
</script>

<svelte:head>
  <title>ComicHive - {title}</title>
  <meta name="title" content={`ComicHive - ${title}`} />
  <meta name="description" content={description} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://c.tuxedolabs.xyz/anime/${data.slug}`} />
  <meta property="og:title" content={`ComicHive - ${title}`} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={animeData?.poster || "https://c.tuxedolabs.xyz/icon.jpg"} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={`https://c.tuxedolabs.xyz/anime/${data.slug}`} />
  <meta property="twitter:title" content={`ComicHive - ${title}`} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={animeData?.poster || "https://c.tuxedolabs.xyz/icon.jpg"} />
</svelte:head>

{#if error}
  <div class="min-h-screen flex justify-center items-center">
    <h1 class="text-[hsl(var(--background-foreground))] font-bold text-1xl">
      Maaf, terjadi kesalahan: AnimeId not found.
    </h1>
  </div>
{:else if !animeData}
  <LoadingElements />
{:else}
  <DetailAnimeLayout anime={animeData} />
{/if}
