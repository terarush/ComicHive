<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'

  injectSpeedInsights();
  injectAnalytics();
</script>

<main class="bg-[hsl(var(--background))]">
  <ModeWatcher />
  <Navbar />
  <slot />
  <Footer />
</main>
