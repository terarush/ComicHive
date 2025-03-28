<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { FetchApi } from "../../utils/Fetch";

  export let animeId: string;
  let comment = "";
  let isLoading: boolean = false;
  const dispatch = createEventDispatcher();

  async function submitComment() {
    if (comment.trim() === "") return;

    isLoading = true;

    try {
      await FetchApi.post(`/comment/${animeId}`, {
        content: comment,
      });

      dispatch("refresh"); 

      comment = "";
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div
  class={`comment-box border border-[hsl(var(--border))] rounded-[var(--radius)] p-4 bg-[hsl(var(--card))]`}
>
  <textarea
    bind:value={comment}
    class="w-full bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md p-2 focus:outline-none focus:ring-[hsl(var(--ring))]"
    placeholder="Tambahkan komentar..."
    disabled={isLoading}
  ></textarea>
  <button
    on:click={submitComment}
    class="mt-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--muted))] transition"
    disabled={isLoading}
  >
    {isLoading ? "Mengirim..." : "Kirim"}
  </button>
</div>
