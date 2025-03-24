<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Cookies from "js-cookie";

  onMount(() => {
    setTimeout(() => {
      Cookies.remove("accessToken");
      goto("/");
    }, 2000);
  });
</script>

<div
  class="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
>
  <div
    class="w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg border border-[hsl(var(--border))]"
  >
    <div class="text-green-500 text-sm mb-4">
      Please wait, processing logout...
    </div>
  </div>
</div>
