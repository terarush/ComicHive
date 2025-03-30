<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Send, MessageSquare, Smile, Loader2 } from "@lucide/svelte";
  import { FetchApi } from "../../utils/Fetch";

  export let animeId: string;
  let comment = "";
  let isLoading = false;
  const dispatch = createEventDispatcher();

  async function submitComment() {
    if (!comment.trim()) return;

    isLoading = true;
    try {
      await FetchApi.post(`/comment/${animeId}`, { content: comment });
      dispatch("refresh");
      comment = "";
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="bg-[hsl(var(--card))] rounded-md border border-[hsl(var(--border))] p-5 shadow">
  <div class="flex items-center gap-3 mb-4">
    <MessageSquare class="w-5 h-5 text-[hsl(var(--primary))]" />
    <h3 class="text-lg font-semibold">Add your comment</h3>
  </div>

  <textarea
    bind:value={comment}
    class="w-full min-h-[100px] bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] resize-none"
    placeholder="What are your thoughts on this episode?"
    disabled={isLoading}
  ></textarea>

  <div class="flex items-center justify-between mt-3">
    <button class="p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] rounded-full transition-colors">
      <Smile class="w-5 h-5" />
    </button>
    
    <button
      on:click={submitComment}
      class="flex items-center gap-1.5 px-3 py-1.5 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary)/0.9)] transition-colors disabled:opacity-50 text-sm"
      disabled={isLoading || !comment.trim()}
    >
      {#if isLoading}
        <Loader2 class="w-4 h-4 animate-spin" />
        <span>Posting...</span>
      {:else}
        <Send class="w-4 h-4" />
        <span>Post</span>
      {/if}
    </button>
  </div>
</div>
