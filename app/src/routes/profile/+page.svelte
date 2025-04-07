<script lang="ts">
  import { onMount } from "svelte";
  import { user, fetchUser } from "../../stores/user";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";
  import LoadingElements from "../../components/elements/LoadingElements.svelte";
  import { User, BookOpen, Film, Edit, Mail, Shield } from "@lucide/svelte";
  import { FetchApi } from "../../utils/Fetch";
  import Button from "../../components/elements/Button.svelte";
  import ProfileForm from "../../components/fragments/ProfileForm.svelte";
  import Role from "../../components/elements/Role.svelte";

  let isLoading = writable(true);
  let isModalOpen = writable(false);
  let formData = writable({
    username: "",
    name: "",
    avatar: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  let error = writable("");
  let success = writable("");
  let avatarFile: File | null = null;
  let avatarPreview = writable<string | null>(null);

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  function openModal() {
    if ($user) {
      formData.set({
        username: $user.username || "",
        name: $user.name || "",
        avatar: $user.avatar || "",
        email: $user.contact?.email || "",
        first_name: $user.contact?.first_name || "",
        last_name: $user.contact?.last_name || "",
      });
      avatarFile = null;
      avatarPreview.set(null);
    }
    isModalOpen.set(true);
    error.set("");
    success.set("");
  }

  async function handleSubmit() {
    try {
      isLoading.set(true);
      error.set("");
      success.set("");

      let payload;

      if (avatarFile) {
        const formDataObj = new FormData();
        formDataObj.append("avatar", avatarFile);
        formDataObj.append("username", $formData.username);
        formDataObj.append("name", $formData.name);
        formDataObj.append("email", $formData.email);
        formDataObj.append("first_name", $formData.first_name);
        formDataObj.append("last_name", $formData.last_name);

        const response = await FetchApi.patch("/user", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          success.set("Profile updated successfully!");
          await fetchUser();
          setTimeout(() => isModalOpen.set(false), 1500);
        } else {
          error.set("Failed to update profile");
        }
      } else {
        payload = Object.fromEntries(
          Object.entries($formData).filter(([_, value]) => value !== ""),
        );

        const response = await FetchApi.patch("/user", payload);

        if (response.status === 200) {
          success.set("Profile updated successfully!");
          await fetchUser();
          setTimeout(() => isModalOpen.set(false), 1500);
        } else {
          error.set("Failed to update profile");
        }
      }
    } catch (err: any) {
      error.set(err.message || "An error occurred");
    } finally {
      isLoading.set(false);
    }
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.set(e.target?.result as string);
        $formData.avatar = "";
      };
      reader.readAsDataURL(avatarFile);
    }
  }

  function clearAvatar() {
    avatarFile = null;
    avatarPreview.set(null);
  }

  onMount(async () => {
    await fetchUser();
    isLoading.set(false);
  });
</script>

<div
  class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary)/5%)] to-[hsl(var(--secondary)/5%)] py-12 px-4 sm:px-6 lg:px-8 sm:mt-0 mt-5"
>
  <div class="w-full max-w-5xl mx-auto">
    {#if $isLoading && !$isModalOpen}
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <LoadingElements />
      </div>
    {/if}

    <div
      class="bg-[hsl(var(--card))] rounded-2xl shadow-xl overflow-hidden border border-[hsl(var(--border))]"
    >
      <div class="flex flex-col md:flex-row">
        <div
          class="w-full md:w-1/3 p-8 bg-gradient-to-b from-[hsl(var(--primary)/10%)] to-transparent flex flex-col items-center text-center"
        >
          <div class="relative group mb-6">
            <div
              class="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-[hsl(var(--primary)/30%)] bg-white/50 backdrop-blur-sm flex items-center justify-center"
            >
              {#if $user}
                {#if $user.avatar}
                  <img
                    src={$user.avatar}
                    alt="Profile picture of {$user.name}"
                    class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                {:else}
                  <div
                    class="flex items-center justify-center h-full w-full text-4xl font-bold text-white bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
                  >
                    {getInitials($user.name)}
                  </div>
                {/if}
              {:else}
                <div
                  class="p-5 text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] rounded-full"
                >
                  <User size={40} />
                </div>
              {/if}
            </div>
          </div>

          <h1 class="text-2xl font-bold tracking-tight">
            {$user?.name || "Guest User"}
          </h1>
          <p class="text-[hsl(var(--muted-foreground))] mt-1 text-sm">
            @{$user?.username || "unknown"}
          </p>

          {#if $user?.contact}
            <div class="mt-6 w-full space-y-3 text-left">
              {#if $user.contact.email}
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-0.5">
                    <div
                      class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]"
                    >
                      <Mail size={12} />
                    </div>
                  </div>
                  <p class="ml-2 text-sm break-all">{$user.contact.email}</p>
                </div>
              {/if}

              {#if $user.contact.first_name || $user.contact.last_name}
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-0.5">
                    <div
                      class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]"
                    >
                      <User size={12} />
                    </div>
                  </div>
                  <p class="ml-2 text-sm">
                    {$user.contact.first_name}
                    {$user.contact.last_name}
                  </p>
                </div>
              {/if}

              <div class="flex items-center gap-2">
                <div class="flex-shrink-0">
                  <div
                    class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]"
                  >
                    <Shield size={12} />
                  </div>
                </div>
                <div>
                  {#if $user.role === "ADMIN"}
                    <Role variant="admin">{$user.role}</Role>
                  {:else}
                    <Role variant="member">{$user.role}</Role>
                  {/if}
                </div>
              </div>
            </div>

            <div class="mt-8 w-full">
              <Button
                on:click={openModal}
                variant="primary"
                classes="w-full group"
              >
                <span class="flex items-center justify-center">
                  <Edit size={16} class="mr-2" />
                  Edit Profile
                </span>
              </Button>
            </div>
          {/if}
        </div>

        <div
          class="w-full md:w-2/3 p-8 bg-[hsl(var(--card))] border-t md:border-t-0 md:border-l border-[hsl(var(--border)/50%)]"
        >
          <div class="mb-8">
            <h2
              class="text-xl font-semibold mb-6 pb-2 border-b border-[hsl(var(--border))]"
            >
              Your Statistics
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="bg-[hsl(var(--secondary)/20%)] p-4 rounded-xl border border-[hsl(var(--border)/30%)] hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 rounded-lg bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))] mr-4"
                  >
                    <Film size={20} />
                  </div>
                  <div>
                    <p
                      class="text-sm text-[hsl(var(--muted-foreground))] font-medium"
                    >
                      Anime Watched
                    </p>
                    <p class="text-2xl font-bold mt-1">247</p>
                  </div>
                </div>
              </div>
              <div
                class="bg-[hsl(var(--secondary)/20%)] p-4 rounded-xl border border-[hsl(var(--border)/30%)] hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 rounded-lg bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))] mr-4"
                  >
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p
                      class="text-sm text-[hsl(var(--muted-foreground))] font-medium"
                    >
                      Manga Read
                    </p>
                    <p class="text-2xl font-bold mt-1">189</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-[hsl(var(--border)/30%)]">
            <h2
              class="text-xl font-semibold mb-6 pb-2 border-b border-[hsl(var(--border))]"
            >
              Quick Actions
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                classes="w-full h-24 flex flex-col items-center justify-center"
              >
                <Film size={24} class="mb-2 text-[hsl(var(--primary))]" />
                <span>Add Anime</span>
              </Button>
              <Button
                variant="outline"
                classes="w-full h-24 flex flex-col items-center justify-center"
              >
                <BookOpen size={24} class="mb-2 text-[hsl(var(--primary))]" />
                <span>Add Manga</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if $isModalOpen}
  <div transition:fade>
    <ProfileForm
      bind:isModalOpen
      bind:formData
      bind:error
      bind:success
      bind:isLoading
      {handleSubmit}
      {handleFileChange}
      {clearAvatar}
      avatarPreview={$avatarPreview}
    />
  </div>
{/if}

{#if $isLoading && !$isModalOpen}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <LoadingElements />
  </div>
{/if}
