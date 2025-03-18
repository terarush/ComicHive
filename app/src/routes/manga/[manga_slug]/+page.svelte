<script lang="ts">
  import DetailMangaLayout from "../../../components/layouts/DetailMangaLayout.svelte";
  import Loading from "../../../components/elements/Loading.svelte";
  import { Fetch } from "../../../utils/Fetch";
  import { onMount } from "svelte";

  export let data: any;

  let manga: any = null;
  let isLoading = true;
  let isFound = false;

  onMount(async () => {
    try {
      const response = await Fetch.get(`/api/manga/detail/${data.slug}`);

      if (response.status === 200 && response.data.status !== false) {
        manga = response.data;
        isFound = true;
      } else {
        manga = {
          status: false,
          message: response.data.message || "Manga not found",
        };
        isFound = false;
      }
    } catch (error) {
      console.error("Error fetching manga details:", error);
      manga = { status: false, message: "Failed to fetch manga details" };
      isFound = false;
    } finally {
      isLoading = false;
    }
  });
</script>

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
