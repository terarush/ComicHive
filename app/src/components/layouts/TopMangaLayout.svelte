<script lang="ts">
  export let title: string = "Top Manga";
  export let mangaList: {
    id: number;
    title: string;
    image: string;
    upload_on: string;
    description: string;
  }[] = [];
</script>

<section class="py-12 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-[hsl(var(--foreground))]">{title}</h2>
      <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Explore thousands of manga titles and find your next adventure.
      </p>
    </div>

    <div class="flex flex-wrap gap-6 justify-center">
      {#each mangaList as manga}
        <div
          class="w-full sm:w-64 bg-[hsl(var(--card))] border rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div class="w-full aspect-[4/3] relative overflow-hidden">
            <img
              src={manga.image}
              alt={manga.title}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div class="p-4">
            <h3 class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-1 hover:text-blue-500 transition-colors">
              {manga.title}
            </h3>
            <div class="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
              Last post {manga.upload_on}
            </div>
            <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">
              {manga.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
