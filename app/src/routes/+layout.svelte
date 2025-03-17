<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";
</script>

<main>
  <ModeWatcher />
  <Navbar />
  <slot />
  <Footer />
</main>
