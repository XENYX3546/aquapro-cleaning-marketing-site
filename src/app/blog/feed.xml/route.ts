import { getAllPosts, getPostPath } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';

export async function GET() {
  const posts = await getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Tips, guides, and insights for property maintenance from ${siteConfig.name}.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .slice(0, 20)
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}${getPostPath(post)}</link>
      <guid isPermaLink="true">${siteConfig.url}${getPostPath(post)}</guid>
      <pubDate>${new Date(post.publishedAt || '').toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author.displayName}</author>` : ''}
      ${post.excerpt ? `<description><![CDATA[${post.excerpt}]]></description>` : ''}
      ${post.categories?.map((cat) => `<category>${cat.name}</category>`).join('') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
