<script lang="ts">
interface EpisodeData {
  title: string;
  animeId: string;
  poster: string;
  releasedOn: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode?: PrevNextEpisode;
  hasNextEpisode: boolean;
  nextEpisode?: PrevNextEpisode; 
  synopsis: Synopsis;
  genreList: Genre[];
  server: Server;
  downloadUrl: DownloadUrl;
  recommendedEpisodeList: RecommendedEpisode[];
  movie: MovieSection;
}

interface PrevNextEpisode {
  title: string;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

interface Synopsis {
  paragraphs: string[];
  connections: any[]; 
}

interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

interface Server {
  qualities: Quality[];
}

interface Quality {
  title: string;
  serverList: ServerItem[];
}

interface ServerItem {
  title: string;
  serverId: string;
  href: string;
}

interface DownloadUrl {
  formats: Format[];
}

interface Format {
  title: string;
  qualities: QualityDownload[];
}

interface QualityDownload {
  title: string;
  urls: DownloadUrlItem[];
}

interface DownloadUrlItem {
  title: string;
  url: string;
}

interface RecommendedEpisode {
  title: string;
  poster: string;
  releaseDate: string;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

interface MovieSection {
  href: string;
  samehadakuUrl: string;
  animeList: Movie[];
}

interface Movie {
  title: string;
  poster: string;
  releaseDate: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  genreList: Genre[];
}
export let videoUrl: string | null = null;
export let episode: EpisodeData = {
  title: "",
  animeId: "",
  poster: "",
  releasedOn: "",
  defaultStreamingUrl: "",
  hasPrevEpisode: false,
  prevEpisode: {
    title: "",
    episodeId: "",
    href: "",
    samehadakuUrl: "",
  },
  hasNextEpisode: false,
  nextEpisode: {
    title: "",
    episodeId: "",
    href: "",
    samehadakuUrl: "",
  },
  synopsis: {
    paragraphs: [],
    connections: [],
  },
  genreList: [],
  server: {
    qualities: [],
  },
  downloadUrl: {
    formats: [],
  },
  recommendedEpisodeList: [],
  movie: {
    href: "",
    samehadakuUrl: "",
    animeList: [],
  },
};
</script>

<section class="bg-[hsl(var(--background))] py-10 text-[hsl(var(--foreground))] py-[100px]">
  <div class="max-w-5xl mx-auto px-4">
    <div class="w-full aspect-video bg-black rounded-md overflow-hidden">
      <iframe
        src={videoUrl}
        class="w-full h-full flex justify-center items-center"
        allowfullscreen
        frameborder="0"
      ></iframe>
    </div>

    <div class="flex justify-between items-center mt-4">
      {#if episode.hasPrevEpisode}
        <a href={episode.prevEpisode?.href} class="px-4 py-2 bg-[hsl(var(--muted))] rounded-md shadow-md text-sm hover:bg-[hsl(var(--muted-foreground))]">
          ⬅ Episode {episode.prevEpisode?.title}
        </a>
      {/if}
      {#if episode.hasNextEpisode}
        <a href={episode.nextEpisode?.href} class="px-4 py-2 bg-[hsl(var(--muted))] rounded-md shadow-md text-sm hover:bg-[hsl(var(--muted-foreground))]">
          Episode {episode.nextEpisode?.title} ➡
        </a>
      {/if}
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Synopsis</h2>
      {#each episode.synopsis.paragraphs as paragraph}
        <p class="text-sm mb-2">{paragraph}</p>
      {/each}
    </div>

    <div class="flex flex-wrap gap-2 mt-4">
      {#each episode.genreList as genre}
        <a href={genre.href} class="px-3 py-1 text-xs font-medium bg-[hsl(var(--muted))] rounded-full text-[hsl(var(--foreground))]">
          {genre.title}
        </a>
      {/each}
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Download Links</h2>
      {#each episode.downloadUrl.formats as format}
        <div class="mb-4">
          <h3 class="text-md font-medium">{format.title}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            {#each format.qualities as quality}
              <div>
                <h4 class="text-sm font-semibold">{quality.title}</h4>
                <div class="flex flex-wrap gap-2 mt-1">
                  {#each quality.urls as link}
                    <a href={link.url} class="px-3 py-1 text-xs bg-[hsl(var(--muted))] rounded-md shadow-md hover:bg-[hsl(var(--muted-foreground))]">
                      {link.title}
                    </a>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Recommended Episodes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each episode.recommendedEpisodeList as recommended}
          <a href={recommended.href} class="block bg-[hsl(var(--muted))] rounded-md shadow-md overflow-hidden hover:bg-[hsl(var(--muted-foreground))]">
            <img src={recommended.poster} alt={recommended.title} class="w-full h-40 object-cover" />
            <div class="p-2">
              <h3 class="text-sm font-medium">{recommended.title}</h3>
              <p class="text-xs text-[hsl(var(--muted-foreground))]">{recommended.releaseDate}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
