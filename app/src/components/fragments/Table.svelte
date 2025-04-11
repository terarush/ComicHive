<script lang="ts">
  export let headers: string[] = [];
  export let rows: any[][] = [];
  export let striped: boolean = false;
  export let hoverEffect: boolean = true;
  export let compact: boolean = true;
</script>

<div
  class="overflow-x-auto rounded-md border border-[hsl(var(--border))] shadow-sm"
>
  <table class="w-full text-sm">
    <thead class="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]">
      <tr>
        {#each headers as header, i (i)}
          <th
            class="px-3 py-2.5 font-semibold border-b border-[hsl(var(--border))]
                   first:rounded-tl-md last:rounded-tr-md first:pl-4 last:pr-4
                   text-left whitespace-nowrap"
          >
            {header}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="divide-y divide-[hsl(var(--border))]">
      {#each rows as row, i (i)}
        <tr
          class="{striped && i % 2 !== 0 ? 'bg-[hsl(var(--muted))]' : ''}
                 {hoverEffect ? 'hover:bg-[hsl(var(--primary)/0.03)]' : ''}
                 transition-colors duration-150"
        >
          {#each row as cell, j (j)}
            <td
              class="px-3 py-2 first:pl-4 last:pr-4
                     {j === 0
                ? 'font-medium text-[hsl(var(--foreground))]'
                : 'text-[hsl(var(--muted-foreground))]'}
                     whitespace-nowrap"
            >
              {cell}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
