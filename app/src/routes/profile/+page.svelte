<script lang="ts">
  import { user, fetchUser } from "../../stores/user";

  $: profile = $user;

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  function loadUserData() {
    fetchUser();
  }
</script>

<div
  class="h-screen w-full flex flex-col items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-[100px]"
>
  <div
    class="w-full max-w-7xl h-full bg-[hsl(var(--card))] rounded-lg shadow-lg border border-[hsl(var(--border))] flex flex-col md:flex-row overflow-hidden"
  >
    <div
      class="w-full md:w-1/2 p-8 flex flex-col items-center justify-start bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
    >
      <div
        class="w-full h-48 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/80%] rounded-t-lg mb-6 flex items-center justify-center"
      >
        <div
          class="relative w-40 h-40 rounded-full bg-[hsl(var(--card))] shadow-lg flex items-center justify-center"
        >
          {#if profile}
            {#if profile.avatar}
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt="Avatar"
                class="w-full h-full rounded-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            {:else}
              <div
                class="w-full h-full flex items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white text-4xl font-bold shadow-md"
              >
                {getInitials(profile.name)}
              </div>
            {/if}
            <button
              class="absolute bottom-0 right-0 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full p-2 shadow-md hover:bg-[hsl(var(--primary)/80%)] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </button>
          {/if}
        </div>
      </div>

      <div class="text-center md:text-left">
        {#if profile}
          <p class="text-4xl font-bold">{profile.name}</p>
          <p class="text-base text-[hsl(var(--muted-foreground))] mt-2">
            @{profile.username}
          </p>

          <div class="mt-6 space-y-2">
            <p class="text-base">
              <span class="font-medium">Email:</span>
              {profile.contacts.email}
            </p>
            <p class="text-base">
              <span class="font-medium">Name:</span>
              {profile.contacts.first_name}
              {profile.contacts.last_name}
            </p>
            <p class="text-base">
              <span class="font-medium">Member since:</span> January 2023
            </p>
          </div>

          <div class="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <span
              class="px-4 py-2 bg-[hsl(var(--primary))/20%] text-[hsl(var(--primary))] rounded-full text-sm font-medium"
            >
              Otaku Level 42
            </span>
            <span
              class="px-4 py-2 bg-[hsl(var(--accent))/20%] text-[hsl(var(--accent-foreground))] rounded-full text-sm font-medium"
            >
              Premium
            </span>
          </div>
        {:else}
          <div class="text-center">
            <p class="text-red-500">You are not logged in.</p>
            <a href="/auth/login" class="block mt-2 text-blue-500">Login here</a
            >
            <button
              class="mt-6 px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md text-lg font-medium"
              on:click={loadUserData}
            >
              Load Sample Data
            </button>
          </div>
        {/if}
      </div>
    </div>

    <div
      class="w-full md:w-1/2 p-8 flex flex-col justify-between bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]"
    >
      <div class="mt-8">
        <h3 class="text-xl font-medium mb-4">Stats</h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-[hsl(var(--secondary))] p-4 rounded-md">
            <p class="text-base text-[hsl(var(--muted-foreground))]">
              Anime Watched
            </p>
            <p class="text-2xl font-bold">247</p>
          </div>
          <div class="bg-[hsl(var(--secondary))] p-4 rounded-md">
            <p class="text-base text-[hsl(var(--muted-foreground))]">
              Manga Read
            </p>
            <p class="text-2xl font-bold">189</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
