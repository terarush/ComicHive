<script lang="ts">
  import { User, LogOut, LayoutDashboard } from "@lucide/svelte";
  
  export let profile: {
    name: string;
    username: string;
    avatar?: string;
    role?: string;
  };
  
  export let isMobile: boolean = false;
  export let onClose: () => void;
  
  const menuItems = [
    { name: "Profile", href: "/profile", icon: User, show: true },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: profile.role === "ADMIN" },
    { name: "Logout", href: "/auth/logout", icon: LogOut, show: true }
  ];
</script>

{#if isMobile}
<div class="fixed inset-0 z-40 bg-[hsl(var(--background)/0.9)] backdrop-blur-sm" on:click={onClose}>
  <div class="fixed bottom-16 inset-x-0 bg-[hsl(var(--background))] border-t border-[hsl(var(--border))] rounded-t-lg shadow-lg" on:click|stopPropagation>
    <div class="px-4 py-3 border-b border-[hsl(var(--border))]">
      <p class="text-sm font-medium text-[hsl(var(--foreground))]">{profile.name}</p>
      <p class="text-xs text-[hsl(var(--muted-foreground))] truncate">@{profile.username}</p>
    </div>
    <div class="py-1">
      {#each menuItems as item}
        {#if item.show}
          <a href={item.href} class="flex items-center gap-3 px-4 py-3 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/60 transition-all" data-sveltekit-preload-data={item.name === 'Dashboard' ? 'tap' : ''}>
            <item.icon class="w-5 h-5" />
            {item.name}
          </a>
        {/if}
      {/each}
    </div>
  </div>
</div>
{:else}
<div class="w-60 rounded-md bg-[hsl(var(--background))] shadow-xl border border-[hsl(var(--border))] overflow-hidden">
  <div class="px-4 py-3 border-b border-[hsl(var(--border))]">
    <p class="text-sm font-medium text-[hsl(var(--foreground))]">{profile.name}</p>
    <p class="text-xs text-[hsl(var(--muted-foreground))] truncate">@{profile.username}</p>
  </div>
  <div class="py-1">
    {#each menuItems as item}
      {#if item.show}
        <a href={item.href} class="flex items-center gap-2 px-4 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/60 rounded-md transition-all" data-sveltekit-preload-data={item.name === 'Dashboard' ? 'tap' : ''}>
          <item.icon class="w-5 h-5" />
          {item.name}
        </a>
      {/if}
    {/each}
  </div>
</div>
{/if}
