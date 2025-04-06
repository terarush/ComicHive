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
    Download,
    X,
  } from "@lucide/svelte";
  import { FetchAnimeApi } from "../../utils/Fetch";
  import { user } from "../../stores/user";
  import CommentList from "../fragments/CommentList.svelte";
  import AddComment from "../fragments/AddComment.svelte";

  export let videoUrl: string;
  export let episode: EpisodeData;
  export let episodeId: string;

  let selectedQualityUrl: string | null = episode.defaultStreamingUrl;
  let commentList: CommentList;
  let showComments = true;
  let showVideoWarning = true;
  let hasAcceptedWarning = false;
  $: users = $user;

  let activeFormat: any = null;
  let showDownloadModal = false;

  function acceptWarning() {
    hasAcceptedWarning = true;
    showVideoWarning = false;
  }

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

  function openDownloadModal(format: any) {
    activeFormat = format;
    showDownloadModal = true;
  }

  function closeDownloadModal() {
    showDownloadModal = false;
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
        {#if showVideoWarning && !hasAcceptedWarning} 
          <div
            class="aspect-video w-full bg-black flex items-center justify-center flex-col p-8 text-center"
          >
            <div class="max-w-2xl mx-auto">
              <h3 class="text-xl font-bold text-white mb-4">
                ⚠️ Unofficial Content Warning
              </h3>
              <p class="text-gray-300 mb-4">
                This video is <span class="text-[hsl(var(--primary))] font-bold"
                  >NOT OFFICIAL</span
                > and is shared without proper authorization from the copyright holders.
              </p>
              <p class="text-gray-300 mb-2">
                By continuing, you acknowledge that
              </p>
              <div class="flex gap-4 justify-center">
                <button
                  on:click={acceptWarning}
                  class="px-6 py-2 bg-[hsl(var(--primary))] text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  I Understand - Continue
                </button>
                <a
                  href="/"
                  class="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Go Back to Safety
                </a>
              </div>
              <p class="text-gray-500 text-xs mt-6">
                We recommend supporting the anime industry through official
                platforms like Crunchyroll, Netflix, or local distributors.
              </p>
            </div>
          </div>

        {:else}
          <div class="aspect-video w-full">
            <iframe
              src={selectedQualityUrl}
              class="w-full h-full"
              allow="fullscreen"
              frameborder="0"
              allowfullscreen
              loading="eager"
              title={selectedQualityUrl}
            ></iframe>
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          ></div>
        {/if}
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
    <div class="space-y-8">
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

      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <Download class="w-5 h-5 text-[hsl(var(--primary))]" />
          Download Links
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each episode.downloadUrl.formats as format}
            <button
              on:click={() => openDownloadModal(format)}
              class="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--primary)/0.05)] transition-colors text-left"
            >
              <h3 class="font-medium flex items-center gap-2">
                {format.title.replace(/\[.*?\]/, "")}
                <ChevronRight class="w-4 h-4 text-[hsl(var(--primary))]" />
              </h3>
              <p class="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                {format.qualities.length} quality options available
              </p>
            </button>
          {/each}
        </div>
      </div>

      {#if showComments}
        <div class="space-y-6">
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

{#if showDownloadModal && activeFormat}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    on:click={closeDownloadModal}
  >
    <div
      class="relative bg-[hsl(var(--card))] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div
        class="sticky top-0 bg-[hsl(var(--card))] p-4 border-b border-[hsl(var(--border))] flex justify-between items-center"
      >
        <h3 class="text-lg font-semibold">{activeFormat.title} Downloads</h3>
        <button
          on:click={closeDownloadModal}
          class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6">
        {#each activeFormat.qualities as quality}
          <div class="mb-6">
            <h4 class="text-md font-medium mb-3">{quality.title}</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {#each quality.urls as link}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block px-4 py-2 text-sm text-center bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary)/0.1)] rounded-md transition-colors"
                >
                  {link.title}
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
