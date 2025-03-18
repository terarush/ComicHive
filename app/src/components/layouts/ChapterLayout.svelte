<script lang="ts">
  export let chapter: {
    chapter_endpoint: string;
    chapter_name: string;
    title: string;
    chapter_pages: number;
    chapter_image: { chapter_image_link: string; image_number: number }[];
  };
</script>

<section class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-6 sm:py-10">
  <div class="max-w-4xl mx-auto px-4 py-[100px]">
    <div class="text-center mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold">{chapter.title}</h1>
      <p class="text-sm text-[hsl(var(--muted-foreground))]">{chapter.chapter_name}</p>
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
  </div>
</section>

