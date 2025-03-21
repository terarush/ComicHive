export interface EpisodeData {
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

export interface PrevNextEpisode {
  title: string;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

export interface Synopsis {
  paragraphs: string[];
  connections: any[];
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

export interface Server {
  qualities: Quality[];
}

export interface Quality {
  title: string;
  serverList: ServerItem[];
}

export interface ServerItem {
  title: string;
  serverId: string;
  href: string;
}

export interface DownloadUrl {
  formats: Format[];
}

export interface Format {
  title: string;
  qualities: QualityDownload[];
}

export interface QualityDownload {
  title: string;
  urls: DownloadUrlItem[];
}

export interface DownloadUrlItem {
  title: string;
  url: string;
}

export interface RecommendedEpisode {
  title: string;
  poster: string;
  releaseDate: string;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

export interface MovieSection {
  href: string;
  samehadakuUrl: string;
  animeList: Movie[];
}

export interface Movie {
  title: string;
  poster: string;
  releaseDate: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  genreList: Genre[];
}
