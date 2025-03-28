<script lang="ts">
  import { onMount } from "svelte";
  import { FetchApi } from "../../utils/Fetch";
  import { writable } from "svelte/store";

  export let animeId: string;

  type User = {
    id: string;
    username: string;
    avatar: string | null;
    created_at: string;
    updated_at: string | null;
  };

  type Comment = {
    id: string;
    content: string;
    created_at: string;
    user: User;
  };

  let isLoading = writable(true);
  let comments = writable<Comment[]>([]);


  async function FetchComment() {
    try {
      const response = await FetchApi.get(`/comment/${animeId}`);
      const data = response.data.data;
      comments.set(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      isLoading.set(false);
    }
  }

  export function refreshComments() {
    isLoading.set(true);
    FetchComment();
  }

  onMount(() => {
    FetchComment();
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }
</script>

<div class="mt-6 space-y-4">
  <h3 class="text-lg font-semibold text-[hsl(var(--foreground))]">Comments</h3>

  {#if $isLoading}
    <p class="text-[hsl(var(--muted-foreground))]">Loading comments...</p>
  {:else if $comments.length > 0}
    {#each $comments as comment}
      <div
        class="flex space-x-4 p-4 bg-[hsl(var(--muted))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--primary))] rounded-[var(--radius)] shadow-md"
      >
        <div
          class="w-12 h-12 rounded-full overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--foreground))] flex items-center justify-center font-bold"
        >
          {#if comment.user.avatar}
            <img
              src={comment.user.avatar}
              alt={comment.user.username}
              class="w-full h-full object-cover"
            />
          {:else}
            <span class="text-lg">{getInitials(comment.user.username)}</span>
          {/if}
        </div>
        <div class="flex-1">
          <p class="text-sm text-[hsl(var(--muted-foreground))]">
            @{comment.user.username} • {formatDate(comment.created_at)}
          </p>
          <p class="text-[hsl(var(--foreground))]">{comment.content}</p>
        </div>
      </div>
    {/each}
  {:else}
    <p class="text-[hsl(var(--muted-foreground))]">No comments yet.</p>
  {/if}
</div>
