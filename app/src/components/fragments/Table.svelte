<script lang="ts">
  export let headers: string[] = [];
  export let rows: any[][] = [];
  export let striped: boolean = false;
  export let hoverEffect: boolean = true;
  export let compact: any = true;

  let currentPage = 1;
  const rowsPerPage = 10;

  let searchQuery = "";

  $: filteredRows = rows.filter((row) =>
    row.some((cell) =>
      String(cell).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  $: totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  $: paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

  function goToPage(page: number) {
    currentPage = Math.max(1, Math.min(page, totalPages));
  }
</script>

<div class="space-y-6">
  <div class="relative max-w-sm w-full">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search..."
      class="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-[hsl(var(--border))] bg-white dark:bg-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:border-[hsl(var(--primary))] transition"
    />
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        class="h-5 w-5 text-[hsl(var(--muted-foreground))]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>

  <div class="overflow-x-auto rounded-md border border-[hsl(var(--border))] shadow-sm">
    <table class="min-w-full text-sm table-auto">
      <thead class="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]">
        <tr>
          {#each headers as header, i (i)}
            <th
              class="px-4 py-3 font-semibold text-left whitespace-nowrap border-b border-[hsl(var(--border))] first:rounded-tl-md last:rounded-tr-md"
            >
              {header}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-[hsl(var(--border))]">
        {#each paginatedRows as row, i (i)}
          <tr
            class={`transition-colors duration-150 ${
              striped && i % 2 !== 0 ? 'bg-[hsl(var(--muted)/0.3)]' : ''
            } ${hoverEffect ? 'hover:bg-[hsl(var(--primary)/0.05)]' : ''}`}
          >
            {#each row as cell, j (j)}
              <td
                class="px-4 py-3 whitespace-nowrap text-[hsl(var(--muted-foreground))] font-normal
                {j === 0 ? 'text-[hsl(var(--foreground))] font-medium' : ''}"
              >
                {cell}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
    <div class="text-[hsl(var(--muted-foreground))]">
      Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredRows.length)} to
      {Math.min(currentPage * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries
    </div>

    <div class="flex flex-wrap items-center gap-1">
      <button
        on:click={() => goToPage(1)}
        disabled={currentPage === 1}
        class="px-3 py-1 rounded-md border border-[hsl(var(--border))] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &laquo;
      </button>
      <button
        on:click={prevPage}
        disabled={currentPage === 1}
        class="px-3 py-1 rounded-md border border-[hsl(var(--border))] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lsaquo;
      </button>

      {#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page =
          currentPage <= 3
            ? i + 1
            : currentPage >= totalPages - 2
            ? totalPages - 4 + i
            : currentPage - 2 + i;
        return page > 0 && page <= totalPages ? page : null;
      }) as page (page)}
        {#if page !== null}
          <button
            on:click={() => goToPage(page)}
            class={`px-3 py-1 rounded-md border border-[hsl(var(--border))] ${
              page === currentPage
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'hover:bg-[hsl(var(--primary)/0.05)] transition'
            }`}
          >
            {page}
          </button>
        {/if}
      {/each}

      <button
        on:click={nextPage}
        disabled={currentPage === totalPages}
        class="px-3 py-1 rounded-md border border-[hsl(var(--border))] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &rsaquo;
      </button>
      <button
        on:click={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        class="px-3 py-1 rounded-md border border-[hsl(var(--border))] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &raquo;
      </button>
    </div>
  </div>
</div>

