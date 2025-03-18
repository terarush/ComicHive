<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "../../../components/elements/Loading.svelte";
  import { Fetch } from "../../../utils/Fetch";
  import ChapterLayout from "../../../components/layouts/ChapterLayout.svelte";
  import type { ChapterSlug } from "./proxy+page";

  export let data: ChapterSlug;
  let chapter: any = null;

  onMount(async () => {
    try {
      const response = await Fetch.get(`/api/chapter/${data.slug}`);
      chapter = response.data;
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
    }
  });
  console.log(data.slug);
</script>

{#if chapter}
  <ChapterLayout {chapter} />
{:else}
  <div
    class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[250px]"
  >
    <Loading />
  </div>
{/if}
