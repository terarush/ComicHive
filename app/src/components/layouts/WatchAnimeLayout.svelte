<script lang="ts">
  import type { EpisodeData } from "../../types/episodes";
  import { ArrowBigRight, ArrowBigLeft } from "@lucide/svelte";
  import { FetchAnimeApi } from "../../utils/Fetch";
  import AddComment from "../fragments/AddComment.svelte";
  import { user } from "../../stores/user";
  import CommentList from "../fragments/CommentList.svelte";
  export let videoUrl: string | null = null;
  export let episode: EpisodeData;
  export let episodeId: string;
  let selectedQualityUrl: string | null = episode.defaultStreamingUrl;
  let commentList: CommentList;
  $: users = $user;

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
</script>

<section
  class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-8 sm:py-12"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative group">
      <div
        class="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
      >
        <iframe
          src={selectedQualityUrl}
          class="w-full h-full"
          allow="fullscreen"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      ></div>
    </div>

    <div class="mt-6 space-y-4">
      <div>
        <label
          for="quality"
          class="block text-sm font-medium mb-2 text-[hsl(var(--muted-foreground))]"
        >
          Video Quality
        </label>
        <div class="relative">
          <select
            id="quality"
            class="appearance-none w-full pl-4 pr-10 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
            on:change={updateVideoUrl}
          >
            {#each episode.server.qualities as quality}
              {#each quality.serverList as serverItem}
                <option value={serverItem.serverId}>
                  {quality.title} - {serverItem.title}
                </option>
              {/each}
            {/each}
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-[hsl(var(--muted-foreground))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex justify-between gap-3">
        {#if episode.hasPrevEpisode}
          <a
            rel="external"
            href={`/anime/watch/${episode.prevEpisode?.episodeId}`}
            data-sveltekit-preload-data="hover"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:bg-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.3)] transition-colors"
          >
            <ArrowBigLeft class="w-5 h-5" />
            <span class="font-medium">Previous Episode</span>
          </a>
        {/if}
        {#if episode.hasNextEpisode}
          <a
            rel="external"
            href={`/anime/watch/${episode.nextEpisode?.episodeId}`}
            data-sveltekit-preload-data="hover"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:bg-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.3)] transition-colors"
          >
            <span class="font-medium">Next Episode</span>
            <ArrowBigRight class="w-5 h-5" />
          </a>
        {/if}
      </div>
    </div>

    <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-[hsl(var(--card))] p-6 rounded-md border border-[hsl(var(--border))] shadow-sm"
        >
          <h2 class="text-2xl font-bold mb-5 flex items-center gap-2">
            <svg
              class="w-6 h-6 text-[hsl(var(--primary))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Synopsis
          </h2>
          <div
            class="prose prose-invert max-w-none text-[hsl(var(--foreground))]"
          >
            {#each episode.synopsis.paragraphs as paragraph}
              <p class="mb-4 last:mb-0">{paragraph}</p>
            {/each}
          </div>
        </div>

        <div>
          <h3
            class="text-lg font-semibold mb-3 text-[hsl(var(--muted-foreground))]"
          >
            Genres
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each episode.genreList as genre}
              <a
                href={genre.href}
                data-sveltekit-preload-data="hover"
                class="px-4 py-2 text-sm font-medium bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] rounded-full hover:bg-[hsl(var(--primary)/0.2)] transition-colors flex items-center gap-1"
              >
                {genre.title}
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            {/each}
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        {#if users}
          <AddComment
            animeId={episodeId}
            on:refresh={() => commentList.refreshComments()}
          />
        {:else}
          <div
            class="bg-[hsl(var(--card))] p-5 rounded-2xl border border-[hsl(var(--border))] mb-6 text-center"
          >
            <div class="p-3">
              <svg
                class="mx-auto h-8 w-8 text-[hsl(var(--primary))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 class="mt-2 text-lg font-medium">Join the Discussion</h3>
              <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                <a
                  href={`/auth/login?from=/anime/watch/${episodeId}`}
                  data-sveltekit-preload-data="tap"
                  class="text-[hsl(var(--primary))] font-medium hover:underline"
                  >Sign in</a
                > to leave a comment
              </p>
            </div>
          </div>
        {/if}

        <CommentList animeId={episodeId} bind:this={commentList} />
      </div>
    </div>
  </div>
</section>

<!--
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
                    data-sveltekit-preload-data={false}
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
    -->
