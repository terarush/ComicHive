import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
    slug: params.username,
  };
};

export interface UsernameSlug {
  slug: string;
}
