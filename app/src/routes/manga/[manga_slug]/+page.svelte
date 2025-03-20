<script lang="ts">
  import DetailMangaLayout from "../../../components/layouts/DetailMangaLayout.svelte";
  import Loading from "../../../components/elements/Loading.svelte";
  import { fetchMangaDetail } from "../../../hooks/MangaHooks";
  import { onMount } from "svelte";
  import type { MangaSlug } from "./proxy+page";

  export let data: MangaSlug;

  let manga: any;
  let isLoading = true;
  let isFound = false;
  let title: string;

  onMount(async () => {
    isLoading = true;
    const result = await fetchMangaDetail(data.slug);
    manga = result.manga;
    title = manga.title;
    isFound = result.isFound;
    isLoading = false;
  });
</script>

<svelte:head>
  <title>ComicHive - {title}</title>
</svelte:head>

<main>
  {#if isLoading}
    <div
      class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[300px]"
    >
      <Loading />
    </div>
  {:else if isFound}
    <DetailMangaLayout {manga} />
  {:else}
    <div
      class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-screen py-[300px]"
    >
      <div class="flex flex-col items-center text-center py-20">
        <p class="text-2xl font-bold">Manga Not Found</p>
        <p class="text-sm text-[hsl(var(--muted-foreground))] mt-2">
          {manga.message}
        </p>
      </div>
    </div>
  {/if}
</main>
