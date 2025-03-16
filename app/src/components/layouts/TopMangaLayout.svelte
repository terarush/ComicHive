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
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
        {title}
      </h2>
      <p class="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
        Explore thousands of manga titles and find your next adventure.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each mangaList as manga}
        <div
          class="group border border-[hsl-(var(--background-foreground))] border-1 bg-[hsl(var(--card))] rounded-md shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <div class="w-full aspect-[4/3] relative overflow-hidden">
            <img
              src={manga.image}
              alt={manga.title}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-[hsl(var(--foreground))] line-clamp-1 group-hover:text-blue-400 transition-colors">
              {manga.title}
            </h3>
            <div class="flex items-center mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              <span>{manga.upload_on}</span>
            </div>
            <p class="mt-4 text-sm text-[hsl(var(--muted-foreground))] line-clamp-3">
              {manga.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
