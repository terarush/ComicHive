<script lang="ts">
  import Link from 'svelte-link';

  export let mangaList: {
    id?: number;
    title?: string;
    image?: string;
    upload_on?: string;
    description?: string;
    endpoint?: string;
  }[] = [];

  export let text: string = "Last post";
</script>

<section class="bg-[hsl(var(--background))] py-8 sm:py-12 text-[hsl(var(--foreground))]">
  <div class="max-w-6xl mx-auto px-4">
    <slot />
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each mangaList as manga}
        <Link href={`/manga/${manga.endpoint}`} class="flex">
          <div
            class="flex flex-col w-full bg-[hsl(var(--card))] border rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div class="w-full aspect-[4/3] relative overflow-hidden">
              <img
                src={manga.image}
                alt={manga.title}
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div class="p-4 space-y-2 flex-grow">
              <h3
                class="text-lg font-bold text-[hsl(var(--foreground))] line-clamp-1 hover:text-blue-500 transition-colors"
              >
                {manga.title}
              </h3>
              <div class="text-xs text-[hsl(var(--muted-foreground))]">
                {text} {manga.upload_on}
              </div>
              <p
                class="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2"
              >
                {manga.description}
              </p>
            </div>
          </div>
        </Link>
      {/each}
    </div>
  </div>
</section>
