<script lang="ts">
  export let title: string = "Top Manga"; 
  export let mangaList: {
    id: number;
    title: string;
    image: string;
    rating: number;
    description: string;
  }[] = [];
</script>

<section class="py-12 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
        {title}
      </h2>
      <p class="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
        Explore thousands of manga titles and find your next adventure.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each mangaList as manga}
        <div class="bg-[hsl(var(--card))] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <div class="w-full aspect-[4/3] relative overflow-hidden rounded-t-lg">
            <img
              src={manga.image}
              alt={manga.title}
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div class="p-4">
            <h3 class="text-lg font-semibold text-[hsl(var(--foreground))] line-clamp-1">
              {manga.title}
            </h3>
            <div class="flex items-center mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>{manga.rating.toFixed(1)}</span>
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
