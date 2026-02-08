import { getAllPosts, getPostPath } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Tips, guides, and insights for property maintenance from ${escapeXml(siteConfig.name)}.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteConfig.url}/logo.png</url>
      <title>${escapeXml(siteConfig.name)} Blog</title>
      <link>${siteConfig.url}/blog</link>
    </image>
    ${posts
      .slice(0, 20)
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}${getPostPath(post)}</link>
      <guid isPermaLink="true">${siteConfig.url}${getPostPath(post)}</guid>
      <pubDate>${new Date(post.publishedAt || '').toUTCString()}</pubDate>
      ${post.author ? `<dc:creator><![CDATA[${post.author.displayName}]]></dc:creator>` : ''}
      ${post.excerpt ? `<description><![CDATA[${post.excerpt}]]></description>` : ''}
      ${post.categories?.map((cat) => `<category><![CDATA[${cat.name}]]></category>`).join('\n      ') || ''}
      ${post.featuredImageUrl ? `<media:content url="${escapeXml(post.featuredImageVariants?.medium ?? post.featuredImageUrl)}" medium="image"${post.featuredImageAlt ? ` description="${escapeXml(post.featuredImageAlt)}"` : ''} />` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
