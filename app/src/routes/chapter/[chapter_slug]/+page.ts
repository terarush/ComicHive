import type {PageLoad} from './$types'

export const load: PageLoad = ({params}) => {
  return {
    slug: params.chapter_slug
  }
}

export interface ChapterSlug {
  slug: string
}
