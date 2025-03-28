<script lang="ts">
  import { FetchApi } from "../../../utils/Fetch";

  let formData = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  };

  let errorMessages: string[] = [];
  let successMessage: string = "";
  let isSubmitting = false;

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    isSubmitting = true;

    try {
      const response = await FetchApi.post("/auth/register", formData);
      errorMessages = [];
      successMessage = "Registration successful! Please check your email for verification.";
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data.errors) {
        errorMessages = error.response.data.errors.map(
          (err: { message: string }) => err.message,
        );
      } else {
        errorMessages = ["An unexpected error occurred."];
      }
    } finally {
      isSubmitting = false;
    }
  };
</script>

<div
  class="relative flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-30 blur-lg"
    aria-hidden="true"
  ></div>

  <form
    class="relative w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg border border-[hsl(var(--border))] backdrop-blur-md"
    on:submit={handleSubmit}
    aria-labelledby="register-heading"
  >
    <h1 id="register-heading" class="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
      Create Account
    </h1>

    {#if successMessage}
      <div role="status" class="text-green-500 text-sm mb-4">
        <p>{successMessage}</p>
      </div>
    {/if}

    {#if errorMessages.length > 0}
      <div role="alert" class="text-red-500 text-sm mb-4">
        {#each errorMessages as error}
          <p>{error}</p>
        {/each}
      </div>
    {/if}

    <div class="space-y-4">
      <div>
        <label
          for="register-username"
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
        >
          Username
          <span class="text-red-500" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <input
          id="register-username"
          type="text"
          bind:value={formData.username}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
          aria-required="true"
          autocomplete="username"
        />
      </div>

      <div>
        <label
          for="register-email"
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
        >
          Email
          <span class="text-red-500" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <input
          id="register-email"
          type="email"
          bind:value={formData.email}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
          aria-required="true"
          autocomplete="email"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label
            for="register-firstname"
            class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
          >
            First Name
            <span class="text-red-500" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input
            id="register-firstname"
            type="text"
            bind:value={formData.first_name}
            class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
            required
            aria-required="true"
            autocomplete="given-name"
          />
        </div>

        <div>
          <label
            for="register-lastname"
            class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
          >
            Last Name
            <span class="text-red-500" aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input
            id="register-lastname"
            type="text"
            bind:value={formData.last_name}
            class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
            required
            aria-required="true"
            autocomplete="family-name"
          />
        </div>
      </div>

      <div>
        <label
          for="register-password"
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
        >
          Password
          <span class="text-red-500" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <input
          id="register-password"
          type="password"
          bind:value={formData.password}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
          aria-required="true"
          autocomplete="new-password"
          aria-describedby="password-requirements"
        />
        <p id="password-requirements" class="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          Use at least 8 characters with a mix of letters, numbers & symbols
        </p>
      </div>
    </div>

    <button
      type="submit"
      class="w-full mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
    >
      {#if isSubmitting}
        <span aria-hidden="true">Processing...</span>
        <span class="sr-only">Creating your account</span>
      {:else}
        Create Account
      {/if}
    </button>

    <p class="mt-4 text-center text-sm">
      Already have an account?{' '}
      <a
        href="/auth/login"
        class="text-[hsl(var(--primary))] hover:underline"
        aria-label="Go to login page"
      >
        Login here
      </a>
    </p>
  </form>
</div>
