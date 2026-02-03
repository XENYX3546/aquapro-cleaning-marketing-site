import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LandingLayout } from '@/components/layout';
import { Container, Section, Breadcrumbs } from '@/components/ui';
import {
  BlogPostContent,
  BlogAuthorCard,
  BlogCategoryList,
  BlogTagList,
  BlogShareButtons,
  BlogPostNavigation,
  BlogRelatedPosts,
  BlogSidebarCTA,
} from '@/features/blog/client';
import { formatDate, formatReadingTime } from '@/features/blog/shared';
import { getPost, listPosts, BlogApiError } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper to build OG images array without nested ternary
function getOgImages(ogImageUrl: string | null, featuredImageUrl: string | null) {
  if (ogImageUrl) {
    return [{ url: ogImageUrl, width: 1200, height: 630 }];
  }
  if (featuredImageUrl) {
    return [{ url: featuredImageUrl }];
  }
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const response = await listPosts({ limit: 50 });
    return response.data.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

// Generate metadata with enhanced article tags
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getPost(slug);
    const { post } = response.data;
    const { seo } = post;

    // Get primary category for article:section
    const primaryCategory = post.categories[0]?.name;
    // Tags are already strings
    const articleTags = post.tags;

    return {
      title: seo.metaTitle || post.title,
      description: seo.metaDescription || post.excerpt || undefined,
      keywords: seo.metaKeywords?.split(',').map((k) => k.trim()) || undefined,
      alternates: {
        canonical: seo.canonicalUrl || `${siteConfig.url}/blog/${slug}`,
      },
      openGraph: {
        title: seo.ogTitle || post.title,
        description: seo.ogDescription || post.excerpt || undefined,
        url: `${siteConfig.url}/blog/${slug}`,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.publishedAt,
        authors: [`${siteConfig.url}/blog/author/${post.author.slug}`],
        section: primaryCategory,
        tags: articleTags.length > 0 ? articleTags : undefined,
        images: getOgImages(seo.ogImageUrl, post.featuredImage.url),
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.ogTitle || post.title,
        description: seo.ogDescription || post.excerpt || undefined,
        images: seo.ogImageUrl || post.featuredImage.url || undefined,
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
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
      // eslint-disable-next-line react/no-danger -- JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof getPost>>['data']['post'] | null = null;
  try {
    const response = await getPost(slug);
    ({ post } = response.data);
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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  return (
    <LandingLayout>
      {/* BreadcrumbList Schema */}
      <BreadcrumbSchema title={post.title} slug={slug} />

      {/* JSON-LD Structured Data - enhanced with timeRequired */}
      {post.structuredData && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...post.structuredData,
              // Add timeRequired in ISO 8601 duration format (PTxM = x minutes)
              ...(post.readingTimeMinutes && {
                timeRequired: `PT${post.readingTimeMinutes}M`,
              }),
              // Add wordCount if available
              ...(post.wordCount && { wordCount: post.wordCount }),
            }),
          }}
        />
      )}

      {/* Article Header - Hero style with cover image */}
      {post.featuredImage.url ? (
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>

          {/* Content */}
          <Container className="relative z-10 py-12">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <Breadcrumbs items={breadcrumbs} className="mb-4 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_svg]:text-white/50" />

              {/* Categories */}
              {post.categories.length > 0 && (
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
                <BlogAuthorCard author={post.author} variant="inline" light />

                <span className="text-white/40">|</span>

                {/* Date */}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>

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
          </Container>

          {/* Image caption if present */}
          {post.featuredImage.caption && (
            <div className="absolute bottom-2 right-4 text-xs text-white/50">
              {post.featuredImage.caption}
            </div>
          )}
        </section>
      ) : (
        <Section className="bg-gradient-to-b from-blue-50/50 to-white pt-6 pb-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumbs */}
              <Breadcrumbs items={breadcrumbs} className="mb-4" />

              {/* Categories */}
              {post.categories.length > 0 && (
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
                <BlogAuthorCard author={post.author} variant="inline" />

                <span className="text-neutral-300">|</span>

                {/* Date */}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>

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
          </Container>
        </Section>
      )}

      {/* Article Content */}
      <Section className="!pt-12 !pb-12">
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:gap-16">
            {/* Main Content - optimal reading width */}
            <article className="max-w-prose">
              {/* Content */}
              <BlogPostContent content={post.content} />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <BlogTagList tags={post.tags} />
                </div>
              )}

              {/* Post Navigation */}
              <BlogPostNavigation
                previous={post.navigation.previous}
                next={post.navigation.next}
              />

              {/* Author Card (Full) */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
                  About the Author
                </h3>
                <BlogAuthorCard author={post.author} variant="full" showSocial />
              </div>
            </article>

            {/* Sidebar - Desktop only */}
            <aside className="hidden lg:block">
              <BlogSidebarCTA categories={post.categories} />
            </aside>
          </div>

          {/* Related Posts - Full width below */}
          <div className="mt-16 max-w-prose lg:max-w-none">
            <BlogRelatedPosts posts={post.relatedPosts} />
          </div>
        </Container>
      </Section>
    </LandingLayout>
  );
}
