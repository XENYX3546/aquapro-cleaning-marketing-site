import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  getPost,
  getRelatedPosts,
  getAllPosts,
  formatPostDate,
  formatReadingTime,
  BlogApiError,
} from '@/lib/blog';
import {
  BlogPostContent,
  BlogAuthorCard,
  BlogCategoryList,
  BlogTagList,
  BlogShareButtons,
  BlogRelatedPosts,
  BlogSidebarCTA,
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch post and related posts in parallel
  let post;
  let relatedPosts: Awaited<ReturnType<typeof getRelatedPosts>>['data'] = [];

  try {
    const [postResponse, relatedResponse] = await Promise.all([
      getPost(slug),
      getRelatedPosts(slug, 3).catch(() => ({ data: [] })),
    ]);

    post = postResponse.data;
    relatedPosts = Array.isArray(relatedResponse?.data) ? relatedResponse.data : [];
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

      {/* JSON-LD Structured Data */}
      {post.structuredData && (
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
      )}

      {/* Article Header - Hero style with cover image */}
      {post.featuredImageUrl ? (
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt || post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              loading="eager"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-4">
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
                <div className="mb-4">
                  <BlogCategoryList categories={post.categories} variant="light" />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-4 text-xl text-white/80">{post.excerpt}</p>
              )}

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                {/* Author */}
                {post.author && (
                  <BlogAuthorCard author={post.author} variant="inline" light />
                )}

                <span className="text-white/40">|</span>

                {/* Date */}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                )}

                {/* Reading Time */}
                {post.readingTimeMinutes && (
                  <>
                    <span className="text-white/40">|</span>
                    <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="mt-6">
                <BlogShareButtons title={post.title} slug={post.slug} light />
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
        <section className="bg-gradient-to-b from-primary-50/50 to-white pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-4">
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-3 text-xl text-neutral-600">{post.excerpt}</p>
              )}

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                {/* Author */}
                {post.author && (
                  <BlogAuthorCard author={post.author} variant="inline" />
                )}

                <span className="text-neutral-300">|</span>

                {/* Date */}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                )}

                {/* Reading Time */}
                {post.readingTimeMinutes && (
                  <>
                    <span className="text-neutral-300">|</span>
                    <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="mt-4">
                <BlogShareButtons title={post.title} slug={post.slug} />
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
              <BlogPostContent content={post.content} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <BlogTagList tags={post.tags} />
                </div>
              )}

              {/* Post Navigation - Note: API doesn't provide prev/next, would need to implement */}
              {/* <BlogPostNavigation previous={null} next={null} /> */}

              {/* Author Card (Full) */}
              {post.author && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
                    About the Author
                  </h2>
                  <BlogAuthorCard author={post.author} variant="full" showSocial />
                </div>
              )}
            </article>

            {/* Sidebar - Desktop only */}
            <aside className="hidden lg:block">
              <BlogSidebarCTA categories={post.categories} />
            </aside>
          </div>

          {/* Related Posts - Full width below */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 max-w-prose lg:max-w-none">
              <BlogRelatedPosts posts={relatedPosts} />
            </div>
          )}
        </div>
      </section>

      {/* Full-width CTA */}
      <ContactSection />
    </LandingLayout>
  );
}
