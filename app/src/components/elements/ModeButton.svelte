<script lang="ts">
  import { setMode, mode } from "mode-watcher";
  import Sun from "@lucide/svelte/icons/sun";
  import Moon from "@lucide/svelte/icons/moon";

  function toggleMode() {
    if ($mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }
</script>

<button
  on:click={toggleMode}
  class="relative inline-flex items-center justify-center w-10 h-10 rounded-md bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] dark:bg-[hsl(var(--background))] dark:hover:bg-[hsl(var(--muted))] transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
>
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 text-[hsl(var(--foreground))]"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 text-[hsl(var(--foreground))]"
  />
  <span class="sr-only">Toggle theme</span>
</button>
