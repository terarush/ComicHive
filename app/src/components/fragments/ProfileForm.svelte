<script lang="ts">
  import { writable } from "svelte/store";
  import { Edit, X } from "@lucide/svelte";
  import Button from "../elements/Button.svelte"
  import LoadingElements from "../elements/LoadingElements.svelte";

  export let isModalOpen = writable(false);
  export let formData = writable({
    username: "",
    name: "",
    avatar: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  export let error = writable("");
  export let success = writable("");
  export let isLoading = writable(false);
  export let handleSubmit: () => Promise<void>;
</script>

<div
  class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
>
  <div
    class="bg-[hsl(var(--card))] rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-[hsl(var(--border))]"
  >
    <div
      class="flex justify-between items-center p-4 border-b border-[hsl(var(--border))]"
    >
      <h3 class="text-xl font-semibold">Edit Profile</h3>
      <button
        on:click={() => isModalOpen.set(false)}
        class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
      >
        <X size={20} />
      </button>
    </div>

    <div class="p-6 space-y-4">
      {#if $error}
        <div class="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {$error}
        </div>
      {/if}

      {#if $success}
        <div class="p-3 bg-green-100 text-green-700 rounded-md text-sm">
          {$success}
        </div>
      {/if}

      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium mb-1"
            >Username</label
          >
          <input
            id="username"
            type="text"
            bind:value={$formData.username}
            class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))]"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label for="name" class="block text-sm font-medium mb-1"
            >Display Name</label
          >
          <input
            id="name"
            type="text"
            bind:value={$formData.name}
            class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))]"
            placeholder="Enter display name"
          />
        </div>

        <div>
          <label for="avatar" class="block text-sm font-medium mb-1"
            >Avatar URL (must be an image link)</label
          >
          <input
            id="avatar"
            type="url"
            bind:value={$formData.avatar}
            class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))]"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium mb-1"
            >Email</label
          >
          <input
            id="email"
            type="email"
            bind:value={$formData.email}
            class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))]"
            placeholder="Enter email"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="first_name" class="block text-sm font-medium mb-1"
              >First Name</label
            >
            <input
              id="first_name"
              type="text"
              bind:value={$formData.first_name}
              class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))]"
              placeholder="First name"
            />
          </div>

          <div>
            <label for="last_name" class="block text-sm font-medium mb-1"
              >Last Name</label
            >
            <input
              id="last_name"
              type="text"
              bind:value={$formData.last_name}
              class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))]"
              placeholder="Last name"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="p-4 border-t border-[hsl(var(--border))] flex justify-end gap-2"
    >
      <Button
        on:click={() => isModalOpen.set(false)}
        disabled={$isLoading}
        variant="secondary"
      >
        Cancel
      </Button>
      <Button on:click={handleSubmit} disabled={$isLoading}>
        {#if $isLoading}
          <LoadingElements />
        {:else}
          <Edit size={16} />
        {/if}
        Save Changes
      </Button>
    </div>
  </div>
</div>
