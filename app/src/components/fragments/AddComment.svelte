<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let comment = "";
  const dispatch = createEventDispatcher();

  function submitComment() {
    if (comment.trim() === "") return;
    dispatch("submit", { comment });
    comment = "";
  }
</script>

<div class="comment-box border border-[hsl(var(--border))] rounded-[var(--radius)] p-4 bg-[hsl(var(--card))]">
  <textarea
    bind:value={comment}
    class="w-full bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md p-2 focus:outline-none focus:ring-[hsl(var(--ring))]"
    placeholder="Tambahkan komentar..."
  ></textarea>
  <button
    on:click={submitComment}
    class="mt-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary),0.9)] transition"
  >
    Kirim
  </button>
</div>
