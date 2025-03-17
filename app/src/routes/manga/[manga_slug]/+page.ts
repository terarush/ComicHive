import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return {
        slug: params.manga_slug
    }
}

export interface MangaSlug{
    slug: string
}
