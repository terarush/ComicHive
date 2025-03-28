<script lang="ts">
  export let manga: {
    title: string;
    type: string;
    author: string;
    status: string;
    thumb: string;
    synopsis: string;
    genre_list: { genre_name: string }[];
    chapter: { chapter_title: string; chapter_endpoint: string }[];
  } | null;
</script>

<section class="bg-[hsl(var(--background))] py-12 text-[hsl(var(--foreground))]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if manga}
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div class="flex-shrink-0 w-full lg:w-auto flex justify-center lg:block">
          <div class="relative group w-full max-w-[240px] lg:max-w-[280px]">
            <img
              src={manga.thumb}
              alt={manga.title}
              class="w-full rounded-xl shadow-lg border-2 border-[hsl(var(--border))] transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {#if manga.status}
              <div class="absolute top-3 right-3 bg-[hsl(var(--primary))] text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {manga.status}
              </div>
            {/if}
          </div>
        </div>

        <div class="flex-1 space-y-5">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">{manga.title}</h1>
            {#if manga.author}
              <p class="text-lg text-[hsl(var(--muted-foreground))] mt-1">by {manga.author}</p>
            {/if}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div class="space-y-1">
              <p class="text-[hsl(var(--muted-foreground))]">Type</p>
              <p>{manga.type || 'Unknown'}</p>
            </div>
            <div class="space-y-1">
              <p class="text-[hsl(var(--muted-foreground))]">Status</p>
              <p>{manga.status || 'Unknown'}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-1">
            {#each manga.genre_list as genre}
              <a
                href={`/genres/${genre.genre_name.toLowerCase().replace(/\s+/g, "-")}`}
                data-sveltekit-preload-data="hover"
                class="px-3 py-1 text-xs font-medium bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] rounded-full hover:bg-[hsl(var(--primary)/0.2)] transition-colors"
              >
                {genre.genre_name}
              </a>
            {/each}
          </div>

          <div class="pt-4">
            <h2 class="text-xl font-bold mb-3">Synopsis</h2>
            <p class="text-[hsl(var(--foreground))] leading-relaxed whitespace-pre-line">
              {manga.synopsis}
            </p>
          </div>
        </div>
      </div>

      <!-- Chapters Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6 pb-2 border-b border-[hsl(var(--border))]">Chapters</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {#each manga.chapter as chapter}
            <a
              href={`/chapter${chapter.chapter_endpoint}`}
              data-sveltekit-preload-data="hover"
              class="block px-4 py-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.3)] hover:shadow-sm"
            >
              {chapter.chapter_title}
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Not Found State -->
      <div class="text-center py-20">
        <svg class="mx-auto h-16 w-16 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-[hsl(var(--foreground))]">Manga Not Found</h2>
        <p class="mt-2 text-[hsl(var(--muted-foreground))]">The manga you're looking for doesn't exist or may have been removed</p>
      </div>
    {/if}
  </div>
</section>
