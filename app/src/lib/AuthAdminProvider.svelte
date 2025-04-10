<script lang="ts">
  import { user } from "../stores/user";
  import { page } from '$app/stores';
</script>

{#if $user?.role === "ADMIN"}
  <slot />
{:else}
  <div class="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6">
    <div class="max-w-md w-full space-y-6 text-center">
      <div class="space-y-2">
        <div class="mx-auto h-24 w-24 rounded-full bg-[hsl(var(--destructive)/0.2)] p-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--destructive))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        </div>
        <h1 class="text-5xl font-bold tracking-tight text-[hsl(var(--destructive))]">403</h1>
        <h2 class="text-2xl font-semibold">Access Forbidden</h2>
        <p class="text-[hsl(var(--muted-foreground))]">
          You don't have permission to access this page.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/"
          class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
        >
          Go to Homepage
        </a>
        <a
          href="/auth/login"
          class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.9)] transition-colors"
        >
          Switch Account
        </a>
      </div>

      <div class="pt-6 border-t border-[hsl(var(--border))]">
        <p class="text-sm text-[hsl(var(--muted-foreground))]">
          Need help? Contact support at <span class="text-[hsl(var(--accent))]">me@tuxedolabs.xyz</span>
        </p>
      </div>
    </div>
  </div>
{/if}
