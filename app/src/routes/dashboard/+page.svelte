<script lang="ts">
  import { onMount } from 'svelte';
  import Table from "../../components/fragments/Table.svelte";
  import { FetchApi } from "../../utils/Fetch";

  interface Contact {
    email: string;
    first_name: string;
    last_name: string;
  }

  interface User {
    id: string;
    name: string;
    username: string;
    role: string;
    contact: Contact;
    updated_at: string;
  }

  const headers = ["Nama", "Email", "Role"];
  let usersData: User[] = [];
  let tableRows: string[][] = [];
  let isLoading = true;
  let error: string | null = null;

  async function fetchUsers() {
    try {
      isLoading = true;
      error = null;
      const response = await FetchApi.get("/user");
      console.log(response.data.data)
      usersData = response.data.data || [];
      
      tableRows = usersData.map(user => [
        user.name || `${user.contact.first_name} ${user.contact.last_name}`,
        user.contact.email,
        user.role
      ]);
      
    } catch (err) {
      error = "Failed to load user data";
      console.error("Error fetching users:", err);
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    await fetchUsers();
  });
</script>

<div class="p-4">
  {#if isLoading}
    <div class="text-center py-8 text-[hsl(var(--muted-foreground))]">
      Loading user data...
    </div>
  {:else if error}
    <div class="text-center py-8 text-[hsl(var(--destructive))]">
      {error}
    </div>
  {:else}
    <Table 
      {headers} 
      rows={tableRows}
      striped 
      hoverEffect 
    />
  {/if}
</div>
