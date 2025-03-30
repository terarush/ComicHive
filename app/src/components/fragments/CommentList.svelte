<script lang="ts">
  import { onMount } from "svelte";
  import { FetchApi } from "../../utils/Fetch";
  import { writable } from "svelte/store";
  import { user } from "../../stores/user";
  import {
    MessageSquare,
    Mail,
    UserCircle,
    Reply,
    Send,
    X,
    MoreVertical,
    User
  } from "@lucide/svelte";

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
    replies?: Reply[];
    visibleReplies?: any;
  };

  type Reply = {
    id: string;
    content: string;
    created_at: string;
    user: User;
    comment_id: string;
  };

  let isLoading = writable(true);
  let comments = writable<Comment[]>([]);
  let replyingTo = writable<string | null>(null);
  let replyContent = writable("");
  let openMenuId = writable<string | null>(null);
  const userId = $user?.id || null;
  let isProcessing = writable(false);

  async function FetchComment() {
    try {
      const response = await FetchApi.get(`/comment/${animeId}`);
      const data = response.data.data;
      data.sort(
        (a: Comment, b: Comment) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      data.forEach((comment: any) => (comment.visibleReplies = 5));
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

  function startReply(commentId: string) {
    replyingTo.set(commentId);
    replyContent.set("");
    closeMenu();
  }

  function cancelReply() {
    replyingTo.set(null);
    replyContent.set("");
  }

  async function submitReply(commentId: string) {
    if ($isProcessing) return;
    isProcessing.set(true);
    try {
      const content = $replyContent.trim();
      if (!content) return;
      await FetchApi.post("/comment/reply", {
        comment_id: commentId,
        content: content,
      });
      refreshComments();
      cancelReply();
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      isProcessing.set(false);
    }
  }

  function toggleMenu(commentId: string) {
    openMenuId.set($openMenuId === commentId ? null : commentId);
  }

  function closeMenu() {
    openMenuId.set(null);
  }

  async function deleteComment(commentId: string) {
    if ($isProcessing) return;
    isProcessing.set(true);
    try {
      await FetchApi.delete(`/comment/${commentId}`);
      refreshComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      isProcessing.set(false);
      closeMenu();
    }
  }

  async function deleteReply(replyId: string) {
    if ($isProcessing) return;
    isProcessing.set(true);
    try {
      await FetchApi.delete(`/comment/reply/${replyId}`);
      refreshComments();
    } catch (error) {
      console.error("Error deleting reply:", error);
    } finally {
      isProcessing.set(false);
      closeMenu();
    }
  }

  function loadMoreReplies(commentId: string) {
    comments.update((comments) => {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId && comment.replies) {
          comment.visibleReplies += 5;
        }
        return comment;
      });
      return updatedComments;
    });
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
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<div class="space-y-6">
  <h3
    class="text-lg font-semibold flex items-center gap-2 text-[hsl(var(--foreground))]"
  >
    <Mail class="w-5 h-5 text-[hsl(var(--primary))]" />
    Community Discussion
  </h3>
  {#if $isLoading}
    <div class="space-y-4">
      {#each { length: 3 } as _}
        <div class="animate-pulse flex flex-col sm:flex-row gap-4 p-4">
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
      {#each $comments as comment (comment.id)}
        <div
          class="flex flex-col sm:flex-row gap-3 p-4 bg-[hsl(var(--card))] rounded-md border border-[hsl(var(--border))] shadow-sm relative"
        >
          <div class="flex-shrink-0">
            {#if comment.user.avatar}
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                class="w-10 h-10 rounded-full object-cover"
              />
            {:else}
              <div
                class="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center"
              >
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
            <p
              class="text-[hsl(var(--foreground))] text-sm whitespace-pre-line break-words"
            >
              {comment.content}
            </p>
            <div
              class="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto"
            >
              <button
                on:click={() => toggleMenu(`comment-${comment.id}`)}
                class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] p-1 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <MoreVertical class="w-4 h-4" />
              </button>
              {#if $openMenuId === `comment-${comment.id}`}
                <div
                  class="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-[hsl(var(--popover))] border border-[hsl(var(--border))] z-10"
                >
                  <div class="py-1">
                    <button
                      on:click={() => startReply(comment.id)}
                      class="flex items-center gap-2 w-full px-4 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                    >
                      <Reply class="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    {#if userId && userId === comment.user.id}
                      <button
                        on:click={() => deleteComment(comment.id)}
                        class="flex items-center gap-2 w-full px-4 py-2 text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--muted))]"
                        disabled={$isProcessing}
                      >
                        <X class="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
            {#if $replyingTo === comment.id}
              <div class="mt-3 space-y-2">
                <textarea
                  bind:value={$replyContent}
                  placeholder="Write your reply..."
                  rows="2"
                  class="w-full text-sm px-3 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.5)] focus:border-[hsl(var(--primary))] resize-none"
                />
                <div class="flex gap-2 justify-end">
                  <button
                    on:click={cancelReply}
                    class="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    <X class="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    on:click={() => submitReply(comment.id)}
                    class="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] transition-colors disabled:opacity-50"
                    disabled={$isProcessing || !$replyContent.trim()}
                  >
                    <Send class="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            {/if}
            {#if comment.replies && comment.replies.length > 0}
              <div
                class="mt-4 pl-4 border-l-2 border-[hsl(var(--muted))] space-y-2"
              >
                {#each comment.replies.slice(0, comment.visibleReplies) as reply}
                  <div class="flex gap-2 pt-2 relative">
                    <div class="flex-shrink-0">
                      {#if reply.user.avatar}
                        <img
                          src={reply.user.avatar}
                          alt={reply.user.username}
                          class="w-8 h-8 rounded-full object-cover"
                        />
                      {:else}
                        <div
                          class="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center"
                        >
                          <UserCircle
                            class="w-4 h-4 text-[hsl(var(--primary))]"
                          />
                        </div>
                      {/if}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <p
                          class="text-xs font-medium text-[hsl(var(--foreground))]"
                        >
                          @{reply.user.username}
                        </p>
                        <span
                          class="text-xs text-[hsl(var(--muted-foreground))]"
                          >•</span
                        >
                        <p class="text-xs text-[hsl(var(--muted-foreground))]">
                          {formatDate(reply.created_at)}
                        </p>
                      </div>
                      <p
                        class="text-[hsl(var(--foreground))] text-sm whitespace-pre-line break-words"
                      >
                        {reply.content}
                      </p>
                    </div>
                    <div class="absolute top-2 right-2">
                      <button
                        on:click={() => toggleMenu(`reply-${reply.id}`)}
                        class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] p-1 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                      >
                        <MoreVertical class="w-4 h-4" />
                      </button>
                      {#if $openMenuId === `reply-${reply.id}`}
                        <div
                          class="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-[hsl(var(--popover))] border border-[hsl(var(--border))] z-10"
                        >
                          <div class="py-1">
                            {#if userId && userId === reply.user.id}
                              <a
                                href={`/u/${reply.user.username}`}
                                data-sveltekit-preload-data="tap"
                                on:click={() => deleteReply(reply.id)}
                                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-[hsl(var(--background-foreground))] hover:bg-[hsl(var(--muted))]"
                              >
                                <User class="w-4 h-4" />
                                <span>Profile</span>
                              </a>
                              <button
                                on:click={() => deleteReply(reply.id)}
                                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--muted))]"
                                disabled={$isProcessing}
                              >
                                <X class="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                              {:else}
                              <a
                                href={`/u/${reply.user.username}`}
                                data-sveltekit-preload-data="tap"
                                on:click={() => deleteReply(reply.id)}
                                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-[hsl(var(--background-foreground))] hover:bg-[hsl(var(--muted))]"
                              >
                                <User class="w-4 h-4" />
                                <span>Profile</span>
                              </a>
                            {/if}
                          </div>
                        </div>
                      {/if}
                    </div>
                  </div>
                {/each}
                {#if comment.replies.length > comment.visibleReplies}
                  <button
                    on:click={() => loadMoreReplies(comment.id)}
                    class="text-sm text-[hsl(var(--primary))] hover:underline"
                  >
                    Load more replies...
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div
      class="text-center py-8 rounded-md bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
    >
      <MessageSquare
        class="mx-auto w-8 h-8 text-[hsl(var(--muted-foreground))]"
      />
      <h4 class="mt-3 text-base font-medium text-[hsl(var(--foreground))]">
        No comments yet
      </h4>
      <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Be the first to share your thoughts!
      </p>
    </div>
  {/if}
</div>
