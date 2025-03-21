<script lang="ts">
  import type { EpisodeData } from "../../types/episodes";
  import { ArrowBigRight, ArrowBigLeft } from "@lucide/svelte";
  import { FetchAnimeApi } from "../../utils/Fetch";
  export let videoUrl: string | null = null;
  export let episode: EpisodeData;
  let selectedQualityUrl: string | null = episode.defaultStreamingUrl;

  async function fetchServerUrl(serverId: string) {
    try {
      const response = await FetchAnimeApi.get(`/server/${serverId}`);
      const result = response.data;

      if (result.ok && result.data.url) {
        return result.data.url;
      } else {
        console.error("Failed to fetch server URL:", result.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching server URL:", error);
      return null;
    }
  }

  async function updateVideoUrl(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const serverId = selectElement.value;
    const url = await fetchServerUrl(serverId);
    if (url) {
      selectedQualityUrl = url;
    }
  }
  console.log(episode);
</script>

<section
  class="bg-[hsl(var(--background))] py-10 text-[hsl(var(--foreground))] py-[100px]"
>
  <div class="max-w-5xl mx-auto px-4">
    <div class="w-full aspect-video bg-black rounded-md overflow-hidden">
      <iframe
        src={selectedQualityUrl}
        class="w-full h-full flex justify-center items-center"
        allowfullscreen
        frameborder="0"
      ></iframe>
    </div>

    <div class="mt-4">
      <label for="quality" class="block text-sm font-medium text-white"
        >Pilih Kualitas Streaming:</label
      >
      <select
        id="quality"
        class="mt-1 p-2 border border-[hsl(var(--primary))] bg-black text-white rounded-md"
        on:change={updateVideoUrl}
      >
        {#each episode.server.qualities as quality}
          {#each quality.serverList as serverItem}
            <option value={serverItem.serverId} class="text-black bg-white"
              >{quality.title} - {serverItem.title}</option
            >
          {/each}
        {/each}
      </select>
    </div>
    <div class="flex justify-between items-center mt-4">
      {#if episode.hasPrevEpisode}
        <a
          rel="external"
          href={`/anime/watch/${episode.prevEpisode?.episodeId}`}
          class="px-4 py-2 bg-[hsl(var(--muted))] rounded-md shadow-md text-sm hover:bg-[hsl(var(--muted-foreground))] flex items-center gap-2"
        >
          <ArrowBigLeft/> Episode {episode.prevEpisode?.title}
        </a>
      {/if}
      {#if episode.hasNextEpisode}
        <a
          rel="external"
          href={`/anime/watch/${episode.nextEpisode?.episodeId}`}
          class="px-4 py-2 bg-[hsl(var(--muted))] rounded-md shadow-md text-sm hover:bg-[hsl(var(--muted-foreground))] flex items-center gap-2"
        >
          Episode {episode.nextEpisode?.title} <ArrowBigRight/>
        </a>
      {/if}
    </div>
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Synopsis</h2>
      {#each episode.synopsis.paragraphs as paragraph}
        <p class="text-sm mb-2">{paragraph}</p>
      {/each}
    </div>
    <div class="flex flex-wrap gap-2 mt-4">
      {#each episode.genreList as genre}
        <a
          href={genre.href}
          class="px-3 py-1 text-xs font-medium bg-[hsl(var(--muted))] rounded-full"
          >{genre.title}</a
        >
      {/each}
    </div>
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Download Links</h2>
      {#each episode.downloadUrl.formats as format}
        <div class="mb-4">
          <h3 class="text-md font-medium">{format.title}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            {#each format.qualities as quality}
              <div>
                <h4 class="text-sm font-semibold">{quality.title}</h4>
                <div class="flex flex-wrap gap-2 mt-1">
                  {#each quality.urls as link}
                    <a
                      href={link.url}
                      class="px-3 py-1 text-xs bg-[hsl(var(--muted))] rounded-md shadow-md hover:bg-[hsl(var(--muted-foreground))]"
                    >
                      {link.title}
                    </a>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <!--
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Recommended Episodes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each episode.recommendedEpisodeList as recommended}
          <a
            rel="external"
            href={`/anime/watch/${recommended.episodeId}`}
            class="block bg-[hsl(var(--muted))] rounded-md shadow-md overflow-hidden hover:bg-[hsl(var(--muted-foreground))]"
          >
            <img
              src={recommended.poster}
              alt={recommended.title}
              class="w-full h-40 object-cover"
            />
            <div class="p-2">
              <h3 class="text-sm font-medium">{recommended.title}</h3>
              <p class="text-xs text-[hsl(var(--muted-foreground))]">
                {recommended.releaseDate}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </div>
    -->
  </div>
</section>
