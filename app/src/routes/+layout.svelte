<script lang="ts">
 import { ModeWatcher } from "mode-watcher";
 import Navbar from "../components/Navbar.svelte";
 let { children } = $props();
 import '../app.css'
</script>
 
<ModeWatcher />
  <Navbar />
{@render children?.()}
