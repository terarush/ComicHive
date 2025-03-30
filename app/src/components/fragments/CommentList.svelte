<script lang="ts">
  import { onMount } from "svelte";
  import { FetchApi } from "../../utils/Fetch";
  import { writable } from "svelte/store";
  import { MessageSquare, Mail, UserCircle } from "@lucide/svelte";

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
      data.sort(
        (a: Comment, b: Comment) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
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
      month: "short",
      day: "numeric",
    });
  }

</script>

<div class="space-y-6">
  <h3 class="text-lg font-semibold flex items-center gap-2">
    <Mail class="w-5 h-5 text-[hsl(var(--primary))]" />
    Community Discussion
  </h3>

  {#if $isLoading}
    <div class="space-y-4">
      {#each { length: 3 } as _}
        <div class="animate-pulse flex gap-4 p-4">
          <div class="w-10 h-10 rounded-full bg-[hsl(var(--muted))]"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-[hsl(var(--muted))] rounded w-1/4"></div>
            <div class="h-4 bg-[hsl(var(--muted))] rounded"></div>
            <div class="h-4 bg-[hsl(var(--muted))] rounded w-3/4"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if $comments.length > 0}
    <div class="space-y-4">
      {#each $comments as comment}
        <div class="flex gap-3 p-4 bg-[hsl(var(--card))] rounded-md border border-[hsl(var(--border))] shadow-sm">
          <div class="flex-shrink-0">
            {#if comment.user.avatar}
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                class="w-10 h-10 rounded-full object-cover"
              />
            {:else}
              <div class="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                <UserCircle class="w-5 h-5 text-[hsl(var(--primary))]" />
              </div>
            {/if}
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <p class="text-sm font-medium text-[hsl(var(--foreground))]">
                @{comment.user.username}
              </p>
              <span class="text-xs text-[hsl(var(--muted-foreground))]">•</span>
              <p class="text-xs text-[hsl(var(--muted-foreground))]">
                {formatDate(comment.created_at)}
              </p>
            </div>
            <p class="text-[hsl(var(--foreground))] text-sm whitespace-pre-line">
              {comment.content}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-6 rounded-md bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
      <MessageSquare class="mx-auto w-8 h-8 text-[hsl(var(--muted-foreground))]" />
      <h4 class="mt-2 text-base font-medium">No comments yet</h4>
      <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Be the first to share your thoughts!
      </p>
    </div>
  {/if}
</div>
