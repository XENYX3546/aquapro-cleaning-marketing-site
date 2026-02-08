import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  getPost,
  getRelatedPosts,
  getPostPath,
  getAllPosts,
  formatPostDate,
  formatReadingTime,
  BlogApiError,
} from '@/lib/blog';
import type { BlogPostSummary } from '@/lib/blog';
import {
  BlogPostContent,
  BlogAuthorCard,
  BlogCategoryList,
  BlogTagList,
  BlogShareButtons,
  BlogRelatedPosts,
  BlogPostNavigation,
  BlogSidebarCTA,
  BlogSidebarTOC,
} from '@/features/blog';
import { ContactSection } from '@/features/home/client';
import { LandingLayout } from '@/components/layout';
import { siteConfig } from '@/lib/constants';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Helper to build OG images array
function getOgImages(ogImageUrl: string | null, featuredImageUrl: string | null) {
  if (ogImageUrl) {
    return [{ url: ogImageUrl, width: 1200, height: 630 }];
  }
  if (featuredImageUrl) {
    return [{ url: featuredImageUrl }];
  }
  return undefined;
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const postResponse = await getPost(slug);
    const post = postResponse.data;

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || '';
    const ogImage = post.ogImageUrl || post.featuredImageUrl;

    return {
      title,
      description,
      keywords: post.metaKeywords || post.tags?.join(', ') || '',
      authors: post.author ? [{ name: post.author.displayName }] : undefined,
      openGraph: {
        title: post.ogTitle || title,
        description: post.ogDescription || description,
        type: 'article',
        url: `${siteConfig.url}/blog/${post.slug}`,
        images: getOgImages(ogImage, post.featuredImageUrl),
        publishedTime: post.publishedAt || undefined,
        modifiedTime: post.updatedAt || undefined,
        authors: post.author ? [post.author.displayName] : undefined,
        tags: post.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.ogTitle || title,
        description: post.ogDescription || description,
        images: ogImage ? [ogImage] : undefined,
      },
      alternates: {
        canonical: post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`,
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

// Check if post was meaningfully updated (more than 24 hours after publish)
function wasUpdated(publishedAt: string | null, updatedAt: string): boolean {
  if (!publishedAt) return false;
  const published = new Date(publishedAt).getTime();
  const updated = new Date(updatedAt).getTime();
  return updated - published > 24 * 60 * 60 * 1000;
}

// Fallback Article schema when CMS structuredData is null
function ArticleSchema({ post }: { post: import('@/lib/blog').BlogPost }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    url: `${siteConfig.url}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.displayName,
          url: `${siteConfig.url}/blog/author/${post.author.slug}`,
          ...(post.author.avatarUrl && { image: post.author.avatarUrl }),
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    ...(post.featuredImageUrl && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImageVariants?.large ?? post.featuredImageUrl,
        ...(post.featuredImageAlt && { caption: post.featuredImageAlt }),
      },
    }),
    ...(post.wordCount && { wordCount: post.wordCount }),
    ...(post.readingTimeMinutes && {
      timeRequired: `PT${post.readingTimeMinutes}M`,
    }),
    ...(post.excerpt && { description: post.excerpt }),
    ...(post.categories &&
      post.categories.length > 0 && {
        articleSection: post.categories[0].name,
      }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(', ') }),
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteConfig.url}/blog`,
      name: `${siteConfig.name} Blog`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList schema for blog posts
function BreadcrumbSchema({ title, slug }: { title: string; slug: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteConfig.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Server-side heading extraction for sidebar TOC
type TocHeading = { id: string; text: string; level: number };

function extractHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const usedIds = new Set<string>();
  const regex = /<(h[23])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    let baseId = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60);

    let id = baseId;
    let counter = 1;
    while (usedIds.has(id)) {
      id = `${baseId}-${counter++}`;
    }
    usedIds.add(id);

    headings.push({ id, text, level: match[1].toLowerCase() === 'h2' ? 2 : 3 });
  }

  return headings;
}

// Find chronologically adjacent posts for prev/next navigation
function findAdjacentPosts(
  allPosts: BlogPostSummary[],
  currentSlug: string
): { previous: BlogPostSummary | null; next: BlogPostSummary | null } {
  const index = allPosts.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { previous: null, next: null };

  // Posts are in reverse-chronological order (newest first)
  // "Next" = newer post (lower index), "Previous" = older post (higher index)
  return {
    next: index > 0 ? allPosts[index - 1] : null,
    previous: index < allPosts.length - 1 ? allPosts[index + 1] : null,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch post, related posts, and all posts for prev/next in parallel
  let post;
  let relatedPosts: Awaited<ReturnType<typeof getRelatedPosts>>['data'] = [];
  let allPosts: BlogPostSummary[] = [];

  try {
    const [postResponse, relatedResponse, allPostsResult] = await Promise.all([
      getPost(slug),
      getRelatedPosts(slug, 3).catch(() => ({ data: [] })),
      getAllPosts().catch(() => []),
    ]);

    post = postResponse.data;
    relatedPosts = Array.isArray(relatedResponse?.data) ? relatedResponse.data : [];
    allPosts = allPostsResult;
  } catch (error) {
    if (error instanceof BlogApiError && (error.code === 'BLOG_POST_NOT_FOUND' || error.code === 'BLOG_POST_NOT_PUBLISHED')) {
      notFound();
    }
    // For any other error, show 404 instead of crashing
    console.error('Failed to fetch blog post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const { previous: prevPost, next: nextPost } = findAdjacentPosts(allPosts, slug);
  const headings = extractHeadings(post.content);
  const showSidebarToc = headings.length >= 3;

  const primaryCategory = post.categories?.[0];
  const breadcrumbs = primaryCategory
    ? [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: primaryCategory.name, href: `/blog/category/${primaryCategory.slug}` },
        { label: post.title },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title },
      ];

  return (
    <LandingLayout>
      {/* BreadcrumbList Schema */}
      <BreadcrumbSchema title={post.title} slug={slug} />

      {/* JSON-LD Structured Data — CMS override or template fallback */}
      {post.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...post.structuredData,
              ...(post.readingTimeMinutes && {
                timeRequired: `PT${post.readingTimeMinutes}M`,
              }),
              ...(post.wordCount && { wordCount: post.wordCount }),
            }),
          }}
        />
      ) : (
        <ArticleSchema post={post} />
      )}

      {/* Article Header - Hero style with cover image */}
      {post.featuredImageUrl ? (
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.featuredImageVariants?.large ?? post.featuredImageUrl}
              alt={post.featuredImageAlt || post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-3">
                <ol className="flex items-center gap-1 text-sm">
                  {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-white/50" />
                      )}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-white/50 truncate max-w-[200px]">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-3">
                  <BlogCategoryList categories={post.categories} variant="light" />
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {post.title}
              </h1>


              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
                {/* Author */}
                {post.author && (
                  <BlogAuthorCard author={post.author} variant="inline" light />
                )}

                <span className="text-white/40">|</span>

                {/* Date */}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                )}

                {/* Updated date */}
                {wasUpdated(post.publishedAt, post.updatedAt) && (
                  <>
                    <span className="text-white/40">|</span>
                    <span>Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time></span>
                  </>
                )}

                {/* Reading Time */}
                {post.readingTimeMinutes && (
                  <>
                    <span className="text-white/40">|</span>
                    <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                  </>
                )}
              </div>

            </div>
          </div>

          {/* Image caption if present */}
          {post.featuredImageCaption && (
            <div className="absolute bottom-2 right-4 text-xs text-white/50">
              {post.featuredImageCaption}
            </div>
          )}
        </section>
      ) : (
        <section className="bg-gradient-to-b from-primary-50/50 to-white pt-6 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-3">
                <ol className="flex items-center gap-1 text-sm">
                  {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-neutral-400" />
                      )}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-neutral-900 font-medium truncate max-w-[200px]">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-3">
                  <BlogCategoryList categories={post.categories} />
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                {post.title}
              </h1>


              {/* Meta */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                {/* Author */}
                {post.author && (
                  <BlogAuthorCard author={post.author} variant="inline" />
                )}

                <span className="text-neutral-300">|</span>

                {/* Date */}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                )}

                {/* Updated date */}
                {wasUpdated(post.publishedAt, post.updatedAt) && (
                  <>
                    <span className="text-neutral-300">|</span>
                    <span>Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time></span>
                  </>
                )}

                {/* Reading Time */}
                {post.readingTimeMinutes && (
                  <>
                    <span className="text-neutral-300">|</span>
                    <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                  </>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:gap-16">
            {/* Main Content - optimal reading width */}
            <article className="max-w-prose">
              {/* Content */}
              <BlogPostContent content={post.content} excerpt={post.excerpt} />

              {/* Read Next — inline CTA for session chaining, placed high for visibility */}
              {relatedPosts.length > 0 && (
                <div className="mt-10 p-5 bg-primary-50 rounded-xl border border-primary-100">
                  <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-2">Read next</p>
                  <Link
                    href={getPostPath(relatedPosts[0])}
                    className="group flex items-center justify-between gap-3"
                  >
                    <span className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                      {relatedPosts[0].title}
                    </span>
                    <ChevronRight className="w-5 h-5 text-primary-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                  {relatedPosts[0].readingTimeMinutes && (
                    <p className="text-sm text-neutral-500 mt-1">{formatReadingTime(relatedPosts[0].readingTimeMinutes)}</p>
                  )}
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <BlogTagList tags={post.tags} />
                </div>
              )}

              {/* Author Card (Full) */}
              {post.author && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
                    About the Author
                  </h2>
                  <BlogAuthorCard author={post.author} variant="full" showSocial />
                </div>
              )}

              {/* Share */}
              <div className="mt-10 pt-8 border-t border-neutral-200">
                <BlogShareButtons title={post.title} slug={post.slug} />
              </div>

              {/* Previous / Next Navigation */}
              <BlogPostNavigation previous={prevPost} next={nextPost} />
            </article>

            {/* Sidebar - Desktop only: TOC + CTA on long posts, CTA-only on short */}
            <aside className="hidden lg:block">
              {showSidebarToc ? (
                <BlogSidebarTOC headings={headings} categories={post.categories} />
              ) : (
                <BlogSidebarCTA categories={post.categories} />
              )}
            </aside>
          </div>

          {/* Related Posts - Full width below with contextual title */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 max-w-prose lg:max-w-none">
              <BlogRelatedPosts
                posts={relatedPosts}
                title={primaryCategory ? `More About ${primaryCategory.name}` : undefined}
              />
            </div>
          )}
        </div>
      </section>

      {/* Full-width CTA — wrapped in aside to reduce commercial chunk weight on informational content */}
      <aside>
        <ContactSection />
      </aside>
    </LandingLayout>
  );
}
