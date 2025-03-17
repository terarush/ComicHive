<script lang="ts">
 import { ModeWatcher } from "mode-watcher";
 import Navbar from "../components/Navbar.svelte";
 let { children } = $props();
</script>
 
<ModeWatcher />
  <Navbar />
{@render children?.()}
