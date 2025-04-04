export async function GET() {
  const domain = "https://c.tuxedolabs.xyz";

  return new Response(
    `User-agent: *
Allow: /
Disallow: /auth/
Disallow: /api/
Disallow: /private/

Sitemap: ${domain}/sitemap.xml

Crawl-delay: 2

User-agent: Googlebot
Allow: /anime/
Allow: /manga/
Disallow: /community/

User-agent: Bingbot
Crawl-delay: 3
Disallow: /profile

User-agent: Yandex
Disallow: /auth/
Disallow: /user/`,
    {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400", 
      },
    },
  );
}
