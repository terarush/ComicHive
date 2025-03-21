<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import LoadingElements from "../../components/elements/LoadingElements.svelte";

  interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }

  let contributors: Contributor[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await axios.get<Contributor[]>(
        "https://api.github.com/repos/tuxedo-labs/ComicHive/contributors",
      );
      contributors = response.data;
    } catch (err) {
      error = "Failed to fetch contributors.";
    } finally {
      loading = false;
    }
  });
</script>

<section
  class="max-w-5xl mx-auto px-6 py-20 text-center relative overflow-hidden py-28"
>
  <h1
    class="text-5xl font-extrabold text-[hsl(var(--foreground))] drop-shadow-lg"
  >
    About ComicHive
  </h1>
  <p
    class="mt-4 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
  >
    ComicHive adalah platform open-source terbaik untuk membaca manga, manhwa,
    dan menonton anime tanpa iklan. Bergabunglah dengan komunitas dan nikmati
    pengalaman membaca yang bebas gangguan! 🎉📖
  </p>

  <h2 class="text-4xl font-bold mt-16 text-[hsl(var(--foreground))]">
    Contributors
  </h2>

  {#if loading}
    <LoadingElements />
  {:else if error}
    <p class="mt-6 text-red-500 font-semibold">{error}</p>
  {:else}
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-8 mx-auto place-items-center"
    >
      {#each contributors as contributor}
        <a
          href={contributor.html_url}
          target="_blank"
          class="group w-full flex flex-col items-center p-4 bg-[hsl(var(--accent))] shadow-xl rounded-lg transition-all transform hover:bg-[hsl(var(--accent))] hover:shadow-2xl duration-300"
        >
          <img
            src={contributor.avatar_url}
            alt={contributor.login}
            class="w-20 h-20 rounded-full border-4 border-[hsl(var(--primary))] transition-all group-hover:border-[hsl(var(--ring))]"
          />
          <p
            class="mt-3 font-semibold text-lg text-[hsl(var(--background-foreground))] group-hover:text-[hsl(var(--primary))]"
          >
            {contributor.login}
          </p>
          <p class="text-sm text-[hsl(var(--muted-foreground))]">
            {contributor.contributions} contributions
          </p>
        </a>
      {/each}
    </div>
  {/if}
</section>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  section {
    animation: fadeIn 0.8s ease-out;
  }
</style>
