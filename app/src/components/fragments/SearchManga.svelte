<script lang="ts">
  import Input from "../elements/Input.svelte";
  import Button from "../elements/Button.svelte";

  let query = "";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleSearch() {
    if (query.trim()) {
      dispatch("search", query); 
    }
  }

  function handleInputChange(newValue: string) {
    query = newValue; 
  }
</script>

<div class="flex items-center space-x-2 w-full md:px-0 px-5 max-w-md">
  <Input
    type="text"
    value={query}
    placeholder="Cari manga..."
    classes="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    on:input={(e) => handleInputChange(e.detail)}
  />

  <Button
    variant="primary"
    classes="px-6 py-2 rounded-r-md"
    on:click={handleSearch}
  >
    Cari
  </Button>
</div>
