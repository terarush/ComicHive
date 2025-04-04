import { FetchAnimeApi, FetchMangaApi } from "../../utils/Fetch";

export async function GET() {
  const animeResponse = await FetchAnimeApi.get(`/recent`);
  const mangaResponse = await FetchMangaApi.get('/api/manga/popular/1');
  const domain = "https://c.tuxedolabs.xyz";
  const currentDate = new Date().toISOString().split("T")[0];

  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case '"': return "&quot;";
        default: return c;
      }
    });
  };

  const staticPages = [
    {
      url: "/manga",
      title: "ComicHive - Read manga for free!",
      priority: 0.8,
      changefreq: "daily",
    },
    {
      url: "/anime",
      title: "ComicHive - Watch anime for free without ads!",
      priority: 0.8,
      changefreq: "daily",
    },
    {
      url: "/community",
      title: "ComicHive - Community",
      priority: 0.7,
      changefreq: "daily",
    },
    {
      url: "/about",
      title: "ComicHive - About ComicHive &amp; developer",
      priority: 0.5,
      changefreq: "monthly",
    },
    {
      url: "/auth/login",
      title: "ComicHive - Login",
      priority: 0.3,
      changefreq: "monthly",
    },
    {
      url: "/auth/register",
      title: "ComicHive - Register",
      priority: 0.3,
      changefreq: "monthly",
    },
  ];

  const animePages = animeResponse.data.data?.animeList?.map((anime: any) => ({
    url: `/anime/${anime.animeId}`,
    title: `ComicHive - Watch ${escapeXml(anime.title)}`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: currentDate,
    poster: anime.poster
  })) || [];

  const mangaPages = mangaResponse.data?.manga_list?.map((manga: any) => ({
    url: `/manga/${manga.endpoint.replace(/\/$/, '')}`, 
    title: `ComicHive - Read ${escapeXml(manga.title)}`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: currentDate,
    poster: manga.thumb
  })) || [];

  const allPages = [...staticPages, ...animePages, ...mangaPages];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" 
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">
      ${allPages.map((page) => `
        <url>
          <loc>${domain}${page.url}</loc>
          <xhtml:link rel="alternate" hreflang="id" href="${domain}${page.url}" title="${escapeXml(page.title)}"/>
          <lastmod>${page.lastmod || currentDate}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
          ${page.poster ? `
          <image:image>
            <image:loc>${escapeXml(page.poster)}</image:loc>
            <image:title>${escapeXml(page.title)}</image:title>
          </image:image>
          ` : ''}
        </url>
      `).join("")}
    </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
