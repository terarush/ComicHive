<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import { fetchUser } from "../stores/user";
  import { page } from "$app/stores";

  let loading: boolean = true;

  const hiddenPaths = ['/dashboard'];

  $: currentPath = $page.url.pathname;
  $: isHidden = hiddenPaths.some(path => currentPath.startsWith(path));

  onMount(async () => {
    await fetchUser();
    loading = false;
  });
</script>

<main class="bg-[hsl(var(--background))]">
  <ModeWatcher />
  {#if !isHidden}
    <Navbar />
  {/if}

  <slot />

  {#if !isHidden}
    <Footer />
  {/if}
</main>

