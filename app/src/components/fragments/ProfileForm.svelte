<script lang="ts">
  import { type Writable } from "svelte/store";
  import { Edit, X, Image } from "@lucide/svelte";
  import Button from "../elements/Button.svelte";

  export let isModalOpen: Writable<boolean>;
  export let formData: Writable<{
    username: string;
    name: string;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
  }>;
  export let error: Writable<string>;
  export let success: Writable<string>;
  export let isLoading: Writable<boolean>;
  export let handleSubmit: () => Promise<void>;
  export let handleFileChange: (event: Event) => void;
  export let clearAvatar: () => void;
  export let avatarPreview: string | null;
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

      <div>
        <label for="" class="block text-sm font-medium mb-2"
          >Profile Picture</label
        >

        {#if avatarPreview}
          <div class="flex flex-col items-center gap-3 mb-4">
            <div class="relative">
              <div
                class="w-20 h-20 rounded-full overflow-hidden border-2 border-[hsl(var(--border))] mx-auto"
              >
                <img
                  src={avatarPreview}
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
              </div>
              <button
                on:click={clearAvatar}
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
              >
                <X size={14} />
              </button>
            </div>
            <label
              class="text-sm text-[hsl(var(--primary))] underline cursor-pointer"
            >
              Change photo
              <input
                type="file"
                accept="image/*"
                on:change={handleFileChange}
                class="hidden"
              />
            </label>
          </div>
        {:else}
          <div class="flex flex-col items-center gap-3 mb-4">
            <div
              class="w-20 h-20 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mx-auto"
            >
              <Image size={32} class="text-[hsl(var(--muted-foreground))]" />
            </div>
            <label
              class="text-sm text-[hsl(var(--primary))] underline cursor-pointer"
            >
              Upload photo
              <input
                type="file"
                accept="image/*"
                on:change={handleFileChange}
                class="hidden"
              />
            </label>
          </div>
        {/if}

        <div class="relative flex items-center py-2">
          <div class="flex-grow border-t border-[hsl(var(--border))]"></div>
          <span
            class="flex-shrink mx-2 text-sm text-[hsl(var(--muted-foreground))]"
            >or</span
          >
          <div class="flex-grow border-t border-[hsl(var(--border))]"></div>
        </div>

        <input
          type="url"
          bind:value={$formData.avatar}
          class="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))] text-sm"
          placeholder="Paste image URL"
        />
      </div>

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
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
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
        <Edit size={16} class="mr-1" />
        Save Changes
      </Button>
    </div>
  </div>
</div>
