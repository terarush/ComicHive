<script lang="ts">
  import { onMount } from "svelte";
  import { fetchAuth } from "../stores/auth";

  onMount(() => {
    fetchAuth();
  });
</script>

<slot></slot>
