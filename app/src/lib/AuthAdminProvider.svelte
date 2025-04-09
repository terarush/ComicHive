<script lang="ts">
  import { user } from "../stores/user";
</script>

{#if $user?.role === "ADMIN"}
  <slot></slot>
{:else}
  <h1>403</h1>
{/if}
