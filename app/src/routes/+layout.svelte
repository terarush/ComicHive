<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import { fetchUser } from "../stores/user";
  let loading: boolean = true;

  onMount(async () => {
    await fetchUser();
    loading = false;
  });
</script>

<main class="bg-[hsl(var(--background))]">
  <ModeWatcher />
  <Navbar />
  <slot />
  <Footer />
</main>
