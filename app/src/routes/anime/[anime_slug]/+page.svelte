<script lang="ts">
  import { onMount } from "svelte";
  import { FetchAnimeApi } from "../../../utils/Fetch";
  import type { AnimeSlug } from "./proxy+page";
  import DetailAnimeLayout from "../../../components/layouts/DetailAnimeLayout.svelte";
  import LoadingElements from "../../../components/elements/LoadingElements.svelte";

  export let data: AnimeSlug;
  let animeData: any;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await FetchAnimeApi.get(`/anime/${data.slug}`);
      if (response.status === 404) {
        error = "Anime not found.";
        return;
      }
      animeData = response.data.data;
    } catch (err) {
      error = "Failed to fetch anime details.";
      console.error(err);
    }
  });
</script>

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
