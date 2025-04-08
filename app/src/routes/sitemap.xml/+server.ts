import { FetchAnimeApi, FetchMangaApi } from "../../utils/Fetch";
import { title } from "../../data"

export async function GET() {
  const [animeResponse, mangaResponse] = await Promise.all([
    FetchAnimeApi.get('/recent'),
    FetchMangaApi.get('/api/manga/popular/1')
  ]);

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
    { url: "/manga", title: `${title} - Read manga for free!`, priority: 0.8, changefreq: "daily" },
    { url: "/anime", title: `${title} - Watch anime for free without ads!`, priority: 0.8, changefreq: "daily" },
    { url: "/community", title: `${title} - Community`, priority: 0.7, changefreq: "daily" },
    { url: "/about", title: `${title} - About ${title} &amp; developer`, priority: 0.5, changefreq: "monthly" },
    { url: "/auth/login", title: `${title} - Login`, priority: 0.3, changefreq: "monthly" },
    { url: "/auth/register", title: `${title} - Register`, priority: 0.3, changefreq: "monthly" }
  ];

  const animePages = animeResponse.data?.animeList?.map((anime: any) => ({
    url: `/anime/${anime.animeId}`,
    title: `${title} - Watch ${escapeXml(anime.title)}`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: currentDate,
    poster: anime.poster
  })) || [];

  const mangaPages = mangaResponse.data?.manga_list?.map((manga: any) => ({
    url: `/manga/${manga.endpoint.replace(/\/$/, '')}`,
    title: `${title} - Read ${escapeXml(manga.title)}`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: currentDate,
    poster: manga.thumb
  })) || [];

  const allPages = [...staticPages, ...animePages, ...mangaPages];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
