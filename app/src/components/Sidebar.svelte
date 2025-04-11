<script lang="ts">
  import {
    Home,
    Files,
    Settings,
    Bell,
    Search,
    ChevronDown,
    Menu,
    ChevronLeft,
    ChevronRight,
  } from "@lucide/svelte";
  import { title } from "../data";
  import { user } from "../stores/user";

  export let expanded = true;
  export let mobileOpen = false;

  function toggleSidebar() {
    expanded = !expanded;
  }

  function toggleMobile() {
    mobileOpen = !mobileOpen;
  }

  interface MenuItem {
    label: string;
    href: string;
    icon: any;
    badge?: string;
  }

  const menuList: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Projects", href: "/projects", icon: Files, badge: "3" },
    { label: "Settings", href: "/settings", icon: Settings },
  ];
  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
</script>

<div class="flex h-screen overflow-hidden">
  <aside
    class={`fixed lg:relative inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    class:min-w-64={expanded}
    class:w-20={!expanded}
    class:max-w-64={expanded}
  >
    <div
      class="flex flex-col h-full border-r border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-lg text-[hsl(var(--card-foreground))] overflow-hidden"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]"
      >
        <div class="flex items-center space-x-3">
          {#if expanded}
            <h1 class="text-xl font-bold text-[hsl(var(--foreground))]">
              {title}
            </h1>
          {/if}
        </div>
        <button
          on:click={toggleSidebar}
          class="hidden lg:flex p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-all"
          title={expanded ? "Collapse" : "Expand"}
        >
          {#if expanded}
            <ChevronLeft size={18} />
          {:else}
            <ChevronRight size={18} />
          {/if}
        </button>
      </div>

      {#if expanded}
        <div class="px-3 py-2">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search size={16} class="text-[hsl(var(--muted-foreground))]" />
            </div>
            <input
              type="text"
              class="w-full pl-10 pr-4 py-2 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.5)] focus:border-[hsl(var(--primary))] transition-all"
              placeholder="Search..."
            />
          </div>
        </div>
      {/if}

      <nav class="flex-1 overflow-y-auto px-2 py-4">
        <ul class="space-y-1">
          {#each menuList as item}
            <li>
              <a
                href={item.href}
                class="flex items-center p-3 rounded-lg hover:bg-[hsl(var(--muted)/0.5)] group transition-all"
                class:justify-center={!expanded}
              >
                <svelte:component this={item.icon} size={20} class="shrink-0" />
                {#if expanded}
                  <span class="ml-3 whitespace-nowrap">{item.label}</span>
                  {#if item.badge}
                    <span
                      class="ml-auto px-2 py-0.5 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-xs font-medium"
                      >{item.badge}</span
                    >
                  {/if}
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="p-2 border-t border-[hsl(var(--border))]">
        <div
          class="flex items-center p-2 rounded-lg hover:bg-[hsl(var(--muted)/0.5)] transition-all cursor-pointer"
        >
          <div class="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            {#if $user?.avatar}
              <img
                src={$user.avatar}
                alt="Profile picture of {$user.name}"
                class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
              />
            {:else}
              <div
                class="flex items-center justify-center h-full w-full text-sm font-bold text-white bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
              >
                {getInitials($user?.name)}
              </div>
            {/if}

            <div
              class="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(var(--accent))] rounded-full border-2 border-[hsl(var(--card))]"
            ></div>
          </div>
          {#if expanded}
            <div class="ml-3 overflow-hidden flex-1">
              <p class="text-sm font-medium truncate">{$user?.username}</p>
              <p class="text-xs text-[hsl(var(--muted-foreground))] truncate">
                {$user?.contact.email}
              </p>
            </div>
            <ChevronDown
              size={16}
              class="text-[hsl(var(--muted-foreground))] ml-2"
            />
          {/if}
        </div>
      </div>
    </div>
  </aside>

  <main class="flex-1 overflow-y-auto relative">
    <header
      class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[hsl(var(--card)/0.8)] backdrop-blur-sm border-b border-[hsl(var(--border))] z-30 flex items-center px-4 justify-between"
    >
      <button
        on:click={toggleMobile}
        class="p-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] mr-2"
      >
        <Menu size={24} />
      </button>

      <div class="flex items-center space-x-3">
        <button class="p-2 rounded-full hover:bg-[hsl(var(--muted)/0.5)]">
          <Bell size={20} class="text-[hsl(var(--foreground))]" />
        </button>

        <div
          class="relative w-10 h-10 rounded-full overflow-hidden shrink-0 group"
        >
          {#if $user?.avatar}
            <img
              src={$user.avatar}
              alt="Profile picture of {$user.name}"
              class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
            />
          {:else}
            <div
              class="flex items-center justify-center h-full w-full text-sm font-bold text-white bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
            >
              {getInitials($user?.name)}
            </div>
          {/if}
        </div>
      </div>
    </header>

    {#if mobileOpen}
      <div
        on:click={toggleMobile}
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
      ></div>
    {/if}

    <div class="flex-1 overflow-auto pt-16 lg:pt-0 bg-[hsl(var(--background))]">
      <div class="p-3">
        <slot />
      </div>
    </div>
  </main>
</div>
