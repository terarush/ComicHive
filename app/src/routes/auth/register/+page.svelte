<script lang="ts">
  import { FetchApi } from "../../../utils/Fetch";

  let formData = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: ""
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    
    try {
      const response = await FetchApi.post("/auth/register", formData);
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
  <form
    class="w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg border border-[hsl(var(--border))]"
    on:submit={handleSubmit}
  >
    <h2 class="text-2xl font-bold text-[hsl(var(--primary))] mb-4">Register</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-[hsl(var(--muted-foreground))]">Username</label>
        <input
          type="text"
          bind:value={formData.username}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-[hsl(var(--muted-foreground))]">Email</label>
        <input
          type="email"
          bind:value={formData.email}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-[hsl(var(--muted-foreground))]">First Name</label>
        <input
          type="text"
          bind:value={formData.first_name}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-[hsl(var(--muted-foreground))]">Last Name</label>
        <input
          type="text"
          bind:value={formData.last_name}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-[hsl(var(--muted-foreground))]">Password</label>
        <input
          type="password"
          bind:value={formData.password}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      class="w-full mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md hover:bg-opacity-90 transition"
    >
      Register
    </button>
  </form>
</div>

