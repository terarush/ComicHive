<script lang="ts">
  import { onMount } from "svelte";
  import { FetchApi } from "../../utils/Fetch";

  export let animeId: string;
  let isLoading = true;

  async function FetchComment() {
    try {
      const response = await FetchApi.get(`/comment/${animeId}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    FetchComment();
  });
</script>

<div></div>
