<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchUser } from '../stores/auth';

  onMount(() => {
    fetchUser(); 
  });
</script>

<slot></slot>

