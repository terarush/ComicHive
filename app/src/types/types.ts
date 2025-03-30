export interface AnimeData {
  title: string;
  poster: string;
  score: Score;
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: number;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  trailer: string;
  synopsis: Synopsis;
  genreList: Genre[];
  batchList: any[];
  episodeList: Episode[];
}

export interface Score {
  value: string;
  users: string;
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

export interface Episode {
  title: number;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}
