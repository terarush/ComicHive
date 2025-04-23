<script lang="ts">
  import { User, LogOut, LayoutDashboard } from "@lucide/svelte";
  
  export let profile: {
    name: string;
    username: string;
    avatar?: string;
    role?: string;
  };
  
  const menuItems = [
    { name: "Profile", href: "/profile", icon: User, show: true },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: profile.role === "ADMIN" },
    { name: "Logout", href: "/auth/logout", icon: LogOut, show: true }
  ];
</script>

<div class="absolute right-0 mt-2 w-60 origin-top-right rounded-md bg-[hsl(var(--background))] shadow-xl border border-[hsl(var(--border))] overflow-hidden z-50">
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
