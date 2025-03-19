import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
    episodeId: params.episode_id
  }
}

export interface EpisodeIdSlug{
  episodeId: string;
}
