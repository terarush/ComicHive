<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Cookies from "js-cookie";
  import { user } from "../../../stores/user";
  import { tick } from "svelte";

  let showMessage = false;

  onMount(async () => {
    await tick();
    showMessage = true;

    setTimeout(() => {
      Cookies.remove("accessToken");
      user.set(null);
      goto("/");
    }, 2500);
  });
</script>

<div
  class="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
>
  <div
    class="w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg border border-[hsl(var(--border))] transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in"
  >
    <div class="flex flex-col items-center justify-center space-y-4">
      <div
        class="w-8 h-8 border-4 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin"
      ></div>
      {#if showMessage}
        <p class="text-center text-[hsl(var(--primary))] font-semibold">
          Logging out... Please wait
        </p>
      {/if}
    </div>
  </div>
</div>

<style>
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fade-in {
    animation: fadeInScale 0.3s ease-out forwards;
  }
</style>
