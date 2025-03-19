import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
    slug: params.anime_slug
  }
}

export interface AnimeSlug{
  slug: string
}
