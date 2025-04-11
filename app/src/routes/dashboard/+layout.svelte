<script lang="ts">
  import AuthAdminProvider from "$lib/AuthAdminProvider.svelte";
  import AuthProvider from "$lib/AuthProvider.svelte";
  import { onMount } from "svelte";
  import Sidebar from "../../components/Sidebar.svelte";
  import { fetchUser } from "../../stores/user";
  import LoadingElements from "../../components/elements/LoadingElements.svelte";

  let isLoading = true;

  onMount(async () => {
    await fetchUser();
    isLoading = false;
  });
</script>

<div>
  {#if isLoading}
    <LoadingElements />
  {:else}
    <AuthProvider>
      <AuthAdminProvider>
        <Sidebar>
          <slot />
        </Sidebar>
      </AuthAdminProvider>
    </AuthProvider>
  {/if}
</div>
