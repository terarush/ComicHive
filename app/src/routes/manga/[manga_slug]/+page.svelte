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
  let title: string = "ComicHive";
  let description: string = "Platform baca manga & nonton anime";
  let genres: string = "";

  onMount(async () => {
    isLoading = true;
    const result = await fetchMangaDetail(data.slug);
    manga = result.manga;
    isFound = result.isFound;
    
    if (isFound) {
      title = manga.title || "ComicHive";
      description = manga.synopsis ? manga.synopsis.substring(0, 160) + "..." : "Baca manga " + title + " di ComicHive";
      genres = manga.genre_list?.map((g: any) => g.genre_name).join(", ") || "";
    }
    
    isLoading = false;
  });
</script>

<svelte:head>
  <title>ComicHive - {title}</title>
  <meta name="title" content={`ComicHive - ${title}`} />
  <meta name="description" content={description} />
  {#if genres}
    <meta name="keywords" content={`${title}, ${genres}, manga, komik, baca manga`} />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://c.tuxedolabs.xyz/manga/${data.slug}`} />
  <meta property="og:title" content={`ComicHive - ${title}`} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={manga?.thumb || "https://c.tuxedolabs.xyz/icon.jpg"} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={`https://c.tuxedolabs.xyz/manga/${data.slug}`} />
  <meta property="twitter:title" content={`ComicHive - ${title}`} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={manga?.thumb || "https://c.tuxedolabs.xyz/icon.jpg"} />
</svelte:head>

<main>
  {#if isLoading}
    <div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[300px]">
      <Loading />
    </div>
  {:else if isFound}
    <DetailMangaLayout {manga} />
  {:else}
    <div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-screen py-[300px]">
      <div class="flex flex-col items-center text-center py-20">
        <p class="text-2xl font-bold">Manga Not Found</p>
        <p class="text-sm text-[hsl(var(--muted-foreground))] mt-2">
          {manga.message}
        </p>
      </div>
    </div>
  {/if}
</main>
