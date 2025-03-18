<script lang="ts">
import { ArrowBigLeft, ArrowBigRight } from "@lucide/svelte";
  export let currentPage: number = 1;
  export let totalPages: number = Infinity;
  export let onPageChange: (page: number) => void;

  const PAGE_RANGE = 5;

  let startPage = 1;
  let endPage = PAGE_RANGE;

  const goToPage = (page: number) => {
    if (page < 1 || (totalPages !== Infinity && page > totalPages)) return;
    onPageChange(page);
    updateRange(page);
  };

  const updateRange = (newPage: number) => {
    if (newPage >= endPage) {
      startPage = newPage;
      endPage = newPage + PAGE_RANGE - 1;
    } else if (newPage < startPage) {
      endPage = newPage;
      startPage = newPage - PAGE_RANGE + 1;
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (totalPages === Infinity || currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
</script>

<div
  class="flex justify-center py-8 space-x-2 bg-[hsl(var(--background))] sm:px-0 px-[100px]"
>
  <button
    class="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))]"
    on:click={handlePrevious}
    disabled={currentPage === 1}
  >
    <ArrowBigLeft />
  </button>

  {#each Array(endPage - startPage + 1)
    .fill(0)
    .map((_, i) => startPage + i) as pageNumber}
    <button
      class={`px-4 py-2 rounded-md ${
        currentPage === pageNumber
          ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
      } cursor-pointer`}
      on:click={() => goToPage(pageNumber)}
    >
      {pageNumber}
    </button>
  {/each}

  <button
    class="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))]"
    on:click={handleNext}
    disabled={totalPages !== Infinity && currentPage === totalPages}
  >
  <ArrowBigRight/>
  </button>
</div>
