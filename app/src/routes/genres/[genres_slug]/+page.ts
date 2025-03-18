import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    slug: params.genres_slug
  }
}

export interface GenreSlug{
  slug: string
}
