<script>
  import { page } from "$app/stores";
</script>

<div
  class="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-[250px] px-4"
>
  <div class="text-center space-y-6 max-w-md mx-auto">
    <h1 class="text-5xl font-black text-[hsl(var(--primary))] tracking-tight sm:text-6xl">
      Oops! Something went wrong 😢
    </h1>

    <p class="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
      We encountered an error while processing your request. Please try again
      later or contact support.
    </p>

    {#if $page?.error}
      <div
        class="mt-8 p-6 space-y-4"
      >
        {#if $page?.status}
          <p class="text-[hsl(var(--background-foreground))] font-semibold text-lg">
            Page status: <span class="font-bold">{$page?.status}</span>
          </p>
        {/if}

        {#if $page?.error?.message}
          <p class="text-[hsl(var(--muted-foreground))] text-base">
            Error message: <span class="font-semibold">{$page?.error?.message}</span>
          </p>
        {/if}
      </div>
    {/if}
  </div>
</div>
