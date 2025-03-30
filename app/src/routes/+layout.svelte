<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import { fetchUser } from "../stores/user";

  onMount( async () => {
    await fetchUser();
  });

</script>

<main class="bg-[hsl(var(--background))]">
  <ModeWatcher />
  <Navbar />
  <slot />
  <Footer />
</main>
