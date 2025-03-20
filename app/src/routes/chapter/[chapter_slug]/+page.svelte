<script lang="ts">
  import { onMount, tick } from "svelte";
  import Loading from "../../../components/elements/Loading.svelte";
  import ChapterLayout from "../../../components/layouts/ChapterLayout.svelte";
  import type { ChapterSlug } from "./proxy+page";
  import { FetchMangaApi } from "../../../utils/Fetch";

  export let data: ChapterSlug;

  let chapter: any = null;
  let isLoading = true;
  let notFound = false;
  let title: any;

  onMount(async () => {
    try {
      const response = await FetchMangaApi.get(`/api/chapter/${data.slug}`);

      if (response.data.status == false) {
        notFound = true;
      } else {
        chapter = response.data;
        title = response.data.chapter_name;
      }
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
      notFound = true;
    } finally {
      isLoading = false;
      await tick();
    }
  });
</script>

<svelte:head>
  <title>ComicHive - Chapter {title}</title>
</svelte:head>

{#if isLoading}
  <div
    class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[250px]"
  >
    <Loading />
  </div>
{:else if notFound}
  <div
    class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[250px]"
  >
    <div class="text-center text-red-500 py-[100px]">
      <h2 class="text-2xl font-bold">Chapter Tidak Ditemukan atau mungkin belum release.</h2>
      <p class="text-sm">Pastikan slug benar atau coba lagi nanti.</p>
    </div>
  </div>
{:else if chapter}
  <ChapterLayout {chapter} slug={data.slug} />
{/if}
