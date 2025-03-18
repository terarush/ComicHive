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

<section class="bg-[hsl(var(--background))] py-[100px] text-[hsl(var(--foreground))]">
  <div class="max-w-5xl mx-auto px-4">
    {#if manga}
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-64 flex justify-center">
          <img
            src={manga.thumb}
            alt={manga.title}
            class="w-48 md:w-64 rounded-lg shadow-lg object-cover"
          />
        </div>

        <div class="flex flex-col space-y-4 flex-1">
          <h1 class="text-3xl font-bold">{manga.title}</h1>
          <p class="text-sm text-[hsl(var(--muted-foreground))]">
            <strong>Author:</strong> {manga.author || "Unknown"}
          </p>
          <p class="text-sm text-[hsl(var(--muted-foreground))]">
            <strong>Status:</strong> {manga.status || "Unknown"}
          </p>

          <div class="flex flex-wrap gap-2">
            {#each manga.genre_list as genre}
              <span class="px-3 py-1 text-xs font-medium bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))]">
                {genre.genre_name}
              </span>
            {/each}
          </div>

          <div class="mt-4">
            <h2 class="text-lg font-semibold">Synopsis</h2>
            <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))] whitespace-pre-line">
              {manga.synopsis}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-xl font-bold">Chapters</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each manga.chapter as chapter}
            <a
              href={chapter.chapter_endpoint}
              class="block px-4 py-3 bg-[hsl(var(--muted))] rounded-lg text-sm font-medium transition-all duration-300 shadow-sm 
              hover:bg-[hsl(var(--muted-foreground))] hover:shadow-md"
            >
              {chapter.chapter_title}
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center text-center py-20">
        <p class="text-2xl font-bold">Manga Not Found</p>
        <p class="text-sm text-[hsl(var(--muted-foreground))] mt-2">
          Sorry, the manga you are looking for is not available.
        </p>
      </div>
    {/if}
  </div>
</section>

