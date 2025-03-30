<script lang="ts">
  import type { EpisodeData } from "../../types/episodes";
  import {
    ArrowBigRight,
    ArrowBigLeft,
    MessageSquare,
    Info,
    Tag,
    ChevronDown,
    LogIn,
    ChevronRight,
  } from "@lucide/svelte";
  import { FetchAnimeApi } from "../../utils/Fetch";
  import { user } from "../../stores/user";

  import CommentList from "../fragments/CommentList.svelte";
  import AddComment from "../fragments/AddComment.svelte";

  export let videoUrl: string | null = null;
  export let episode: EpisodeData;
  export let episodeId: string;

  let selectedQualityUrl: string | null = episode.defaultStreamingUrl;
  let commentList: CommentList;
  let showComments = true;
  $: users = $user;

  async function fetchServerUrl(serverId: string) {
    try {
      const response = await FetchAnimeApi.get(`/server/${serverId}`);
      return response.data.ok ? response.data.data.url : null;
    } catch (error) {
      console.error("Error fetching server URL:", error);
      return null;
    }
  }

  async function updateVideoUrl(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const serverId = selectElement.value;
    const url = await fetchServerUrl(serverId);
    if (url) selectedQualityUrl = url;
  }
</script>

<section
  class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-8 pt-[100px]"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <div
        class="relative group rounded-md overflow-hidden shadow-2xl bg-black"
      >
        <div class="aspect-video w-full">
          <iframe
            src={selectedQualityUrl}
            class="w-full h-full"
            allow="fullscreen"
            frameborder="0"
            allowfullscreen
            loading="eager"
          ></iframe>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        ></div>
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold">Streaming Quality</h3>
          <button
            on:click={() => (showComments = !showComments)}
            class="flex items-center gap-2 text-sm text-[hsl(var(--primary))] hover:underline"
          >
            <MessageSquare class="w-4 h-4" />
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
        </div>

        <div class="relative">
          <select
            on:change={updateVideoUrl}
            class="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent appearance-none pr-8"
          >
            {#each episode.server.qualities as quality}
              {#each quality.serverList as serverItem}
                <option value={serverItem.serverId}>
                  {quality.title} - {serverItem.title}
                </option>
              {/each}
            {/each}
          </select>
          <ChevronDown
            class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))] pointer-events-none"
          />
        </div>
      </div>

      <div class="flex gap-4 mt-6">
        {#if episode.hasPrevEpisode}
          <a
            rel="external"
            href={`/anime/watch/${episode.prevEpisode?.episodeId}`}
            class="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md hover:bg-[hsl(var(--primary)/0.1)] transition-colors group"
            data-sveltekit-preload-data="hover"
          >
            <ArrowBigLeft
              class="w-5 h-5 text-[hsl(var(--primary))] group-hover:-translate-x-1 transition-transform"
            />
            <div class="text-left">
              <p class="font-medium line-clamp-1">
                {episode.prevEpisode?.title}
              </p>
            </div>
          </a>
        {/if}
        {#if episode.hasNextEpisode}
          <a
            rel="external"
            href={`/anime/watch/${episode.nextEpisode?.episodeId}`}
            class="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md hover:bg-[hsl(var(--primary)/0.1)] transition-colors group"
            data-sveltekit-preload-data="hover"
          >
            <div class="text-right">
              <p class="font-medium line-clamp-1">
                {episode.nextEpisode?.title}
              </p>
            </div>
            <ArrowBigRight
              class="w-5 h-5 text-[hsl(var(--primary))] group-hover:translate-x-1 transition-transform"
            />
          </a>
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-1 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <div
          class="bg-[hsl(var(--card))] p-6 rounded-md border border-[hsl(var(--border))] shadow-sm"
        >
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-8 h-8 rounded-md bg-[hsl(var(--primary)/0.2)] flex items-center justify-center"
            >
              <Info class="w-5 h-5 text-[hsl(var(--primary))]" />
            </div>
            <h2 class="text-xl font-bold">Episode Synopsis</h2>
          </div>
          <div class="prose prose-invert max-w-none">
            {#each episode.synopsis.paragraphs as paragraph}
              <p class="mb-4 last:mb-0 text-[hsl(var(--foreground))]">
                {paragraph}
              </p>
            {/each}
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Tag class="w-5 h-5 text-[hsl(var(--primary))]" />
            Genres
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each episode.genreList as genre}
              <a
                href={genre.href}
                class="px-4 py-2 text-sm font-medium bg-[hsl(var(--primary)/0.1)] hover:bg-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] rounded-full transition-colors flex items-center gap-2"
                data-sveltekit-preload-data="hover"
              >
                {genre.title}
                <ChevronRight class="w-4 h-4" />
              </a>
            {/each}
          </div>
        </div>
      </div>

      {#if showComments}
        <div class="lg:col-span-1 space-y-6">
          {#if users}
            <AddComment
              animeId={episodeId}
              on:refresh={() => commentList.refreshComments()}
            />
          {:else}
            <div
              class="bg-[hsl(var(--card))] p-6 rounded-md border border-[hsl(var(--border))] text-center"
            >
              <div class="p-3">
                <div
                  class="mx-auto w-12 h-12 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-3"
                >
                  <LogIn class="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <h3 class="text-lg font-medium">Join the Discussion</h3>
                <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <a
                    href={`/auth/login?from=/anime/watch/${episodeId}`}
                    class="text-[hsl(var(--primary))] font-medium hover:underline"
                    data-sveltekit-preload-data="tap"
                  >
                    Sign in
                  </a> to leave a comment
                </p>
              </div>
            </div>
          {/if}

          <CommentList animeId={episodeId} bind:this={commentList} />
        </div>
      {/if}
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
