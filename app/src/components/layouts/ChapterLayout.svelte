<script lang="ts">
  import { onMount } from "svelte";

  export let chapter: {
    chapter_endpoint: string;
    chapter_name: string;
    title: string;
    chapter_pages: number;
    chapter_image: { chapter_image_link: string; image_number: number }[];
  };
  export let slug: string;

  let prevChapter: string | null = null;
  let nextChapter: string | null = null;
  let nextExists = true;

  onMount(() => {
    const currentNumber = getChapterNumber(chapter.chapter_endpoint);
    if (currentNumber !== null) {
      const prevNumber = (currentNumber - 1).toString().padStart(2, "0");
      const nextNumber = (currentNumber + 1).toString().padStart(2, "0");

      const baseSlug = slug.replace(/-chapter-\d+$/, "");

      prevChapter =
        currentNumber > 1
          ? `/chapter/${baseSlug}-chapter-${prevNumber}/`
          : null;
      nextChapter = `/chapter/${baseSlug}-chapter-${nextNumber}/`;

      checkNextChapterExists(nextChapter);
    }
  });

  function getChapterNumber(endpoint: string): number | null {
    const match = endpoint.match(/chapter-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  async function checkNextChapterExists(url: string) {
    try {
      const response = await fetch(url);
      nextExists = response.ok;
    } catch (error) {
      nextExists = false;
    }
  }
</script>

<section
  class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-6 sm:py-10"
>
  <div class="max-w-4xl mx-auto px-4 py-[100px]">
    <div class="text-center mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold">{chapter.title}</h1>
      <p class="text-sm text-[hsl(var(--muted-foreground))]">
        {chapter.chapter_name}
      </p>
    </div>

    <div class="-mt-1">
      {#each chapter.chapter_image as image}
        <img
          src={image.chapter_image_link}
          alt="Page {image.image_number}"
          loading="lazy"
          decoding="async"
          class="w-full h-auto object-contain"
        />
      {/each}
    </div>

    <div class="flex justify-between mt-6">
      {#if prevChapter}
        <a
          href={prevChapter}
          rel="external"
          data-sveltekit-preload-data={false}
          class="px-4 py-2 rounded-lg bg-[hsl(var(--background))] text-[hsl(var(--background-foreground))] hover:bg-[hsl(var(--background)/0.8)] transition-colors"
        >
          ← Sebelumnya
        </a>
      {/if}

      {#if nextExists}
        <a
          href={nextChapter}
          rel="external"
          data-sveltekit-preload-data={false}
          class="px-4 py-2 rounded-lg bg-[hsl(var(--background))] text-[hsl(var(--background-foreground))] hover:bg-[hsl(var(--background)/0.8)] transition-colors"
        >
          Selanjutnya →
        </a>
      {/if}
    </div>
  </div>
</section>
