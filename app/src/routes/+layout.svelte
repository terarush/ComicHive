<script lang="ts">
 import { ModeWatcher } from "mode-watcher";
 let { children } = $props();
</script>
 
<ModeWatcher defaultMode={"light"} />
{@render children?.()}
