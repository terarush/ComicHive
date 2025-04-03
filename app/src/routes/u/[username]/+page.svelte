<script lang="ts">
  import type { UsernameSlug } from "./proxy+page";
  export let data: UsernameSlug;
  import { FetchApi } from "../../../utils/Fetch";
  import { onMount } from "svelte";
  import { Film, BookOpen, Mail, User, Shield } from "@lucide/svelte";
  import LoadingElements from "../../../components/elements/LoadingElements.svelte";

  let user: any = null;
  let isLoading = true;
  let error: string | null = null;
  let isNotFound = false;

  onMount(async () => {
    try {
      const response = await FetchApi.get(`/user/${data.slug}`);
      user = response.data.data;
    } catch (err: any) {
      if (err.response?.status === 404) {
        isNotFound = true;
      } else {
        error = "User not found";
        console.error(err);
      }
    } finally {
      isLoading = false;
    }
  });

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }
</script>

{#if isLoading}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <LoadingElements />
  </div>
{:else if isNotFound}
  <div class="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
    <div class="text-center p-8 bg-[hsl(var(--primary))] text-[hsl(var(--background-foreground))] rounded-lg shadow-lg max-w-md w-full mx-4">
      <div class="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
        <User size={48} class="text-gray-500" />
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
      <p class="text-gray-600">The requested user doesn't exist</p>
    </div>
  </div>
{:else if user}
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary)/5%)] to-[hsl(var(--secondary)/5%)] py-12 px-4 sm:px-6 lg:px-8 sm:mt-0 mt-5">
    <div class="w-full max-w-5xl mx-auto">
      <div class="bg-[hsl(var(--card))] rounded-2xl shadow-xl overflow-hidden border border-[hsl(var(--border))]">
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 p-8 bg-gradient-to-b from-[hsl(var(--primary)/10%)] to-transparent flex flex-col items-center text-center">
            <div class="relative group mb-6">
              <div class="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-[hsl(var(--primary)/30%)] bg-white/50 backdrop-blur-sm flex items-center justify-center">
                {#if user.avatar}
                  <img
                    src={user.avatar}
                    alt="Profile picture of {user.name}"
                    class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                {:else}
                  <div class="flex items-center justify-center h-full w-full text-4xl font-bold text-white bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]">
                    {getInitials(user.name)}
                  </div>
                {/if}
              </div>
            </div>

            <h1 class="text-2xl font-bold tracking-tight">
              {user.name}
            </h1>
            <p class="text-[hsl(var(--muted-foreground))] mt-1 text-sm">
              @{user.username}
            </p>

            {#if user.contact}
              <div class="mt-6 w-full space-y-3 text-left">
                {#if user.contact.email}
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]">
                        <Mail size={12} />
                      </div>
                    </div>
                    <p class="ml-2 text-sm break-all">{user.contact.email}</p>
                  </div>
                {/if}

                {#if user.contact.first_name || user.contact.last_name}
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]">
                        <User size={12} />
                      </div>
                    </div>
                    <p class="ml-2 text-sm">
                      {user.contact.first_name}
                      {user.contact.last_name}
                    </p>
                  </div>
                {/if}

                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]">
                      {#if user.role === "ADMIN"}
                        <Shield size={12} />
                      {:else}
                        <User size={12} />
                      {/if}
                    </div>
                  </div>
                  <p class="ml-2 text-sm leading-none">
                    {user.role}
                  </p>
                </div>
              </div>
            {/if}
          </div>

          <div class="w-full md:w-2/3 p-8 bg-[hsl(var(--card))] border-t md:border-t-0 md:border-l border-[hsl(var(--border)/50%)]">
            <div class="mb-8">
              <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-[hsl(var(--border))]">
                Statistics
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-[hsl(var(--secondary)/20%)] p-4 rounded-xl border border-[hsl(var(--border)/30%)] hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]">
                  <div class="flex items-center">
                    <div class="p-2 rounded-lg bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))] mr-4">
                      <Film size={20} />
                    </div>
                    <div>
                      <p class="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                        Anime Watched
                      </p>
                      <p class="text-2xl font-bold mt-1">247</p>
                    </div>
                  </div>
                </div>
                <div class="bg-[hsl(var(--secondary)/20%)] p-4 rounded-xl border border-[hsl(var(--border)/30%)] hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]">
                  <div class="flex items-center">
                    <div class="p-2 rounded-lg bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))] mr-4">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p class="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                        Manga Read
                      </p>
                      <p class="text-2xl font-bold mt-1">189</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-[hsl(var(--border)/30%)]">
              <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-[hsl(var(--border))]">
                Activity
              </h2>
              <div class="text-[hsl(var(--muted-foreground))] text-center py-8">
                <p>No recent activity to show</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
