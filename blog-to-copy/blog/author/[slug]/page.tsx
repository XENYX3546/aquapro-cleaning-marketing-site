import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LandingLayout } from '@/components/layout';
import { Container, Breadcrumbs, Icon } from '@/components/ui';
import {
  AuthorHeroBackground,
  DynamicAvatar,
  BlogPostCard,
  BlogSidebarCTA,
  ShareProfileButton,
} from '@/features/blog/client';
import { BlogPostGrid } from '@/features/blog/server';
import { listAuthors, getAuthor, listPosts, BlogApiError } from '@/lib/blog';
import { blogPaths } from '@/features/blog/shared';
import { siteConfig } from '@/lib/constants';
import type { SocialLinks, PublicPost } from '@/lib/blog';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Build author description without nested template literals
function buildAuthorDescription(author: {
  displayName: string;
  jobTitle: string | null;
  company: string | null;
}): string {
  let description = `Articles by ${author.displayName}`;
  if (author.jobTitle) {
    description += `, ${author.jobTitle}`;
  }
  if (author.company) {
    description += ` at ${author.company}`;
  }
  return `${description}.`;
}

// Generate static params for all authors
export async function generateStaticParams() {
  try {
    const response = await listAuthors({ includeEmpty: true });
    return response.data.authors.map((author) => ({
      slug: author.slug,
    }));
  } catch {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getAuthor(slug);
    const { author } = response.data;

    const title = `${author.displayName} - Author`;
    const description = author.bio || buildAuthorDescription(author);

    return {
      title,
      description,
      alternates: {
        canonical: `${siteConfig.url}/blog/author/${slug}`,
      },
      openGraph: {
        title: `${title} | ${siteConfig.name} Blog`,
        description,
        url: `${siteConfig.url}/blog/author/${slug}`,
        type: 'profile',
        images: author.avatarUrl ? [{ url: author.avatarUrl }] : undefined,
      },
    };
  } catch {
    return { title: 'Author Not Found' };
  }
}

// BreadcrumbList schema for author pages
function BreadcrumbSchema({ name, slug }: { name: string; slug: string }) {
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
        name,
        item: `${siteConfig.url}/blog/author/${slug}`,
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

// Schema for author profile
function AuthorSchema({
  author,
}: {
  author: {
    displayName: string;
    slug: string;
    bio: string | null;
    avatarUrl: string | null;
    jobTitle: string | null;
    company: string | null;
    socialLinks: SocialLinks;
  };
}) {
  const sameAs = [
    author.socialLinks.twitter,
    author.socialLinks.linkedin,
    author.socialLinks.github,
    author.socialLinks.website,
  ].filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.displayName,
    url: `${siteConfig.url}/blog/author/${author.slug}`,
    image: author.avatarUrl,
    description: author.bio,
    jobTitle: author.jobTitle,
    worksFor: author.company
      ? {
          '@type': 'Organization',
          name: author.company,
        }
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: 'twitter' | 'linkedin' | 'github' | 'globe';
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
      aria-label={label}
    >
      <Icon name={icon} size={20} />
    </a>
  );
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam ? Number.parseInt(pageParam, 10) : 1;

  let author: Awaited<ReturnType<typeof getAuthor>>['data']['author'] | null = null;
  let postCount = 0;
  let totalReadingTime = 0;
  let latestPost: PublicPost | null = null;
  let authorCategories: string[] = [];

  try {
    const [authorResponse, postsResponse] = await Promise.all([
      getAuthor(slug, { postsLimit: 0 }),
      listPosts({ author: slug, limit: 50 }),
    ]);
    ({ author } = authorResponse.data);
    ({ total: postCount } = postsResponse.meta.pagination);

    if (postsResponse.data.length > 0) {
      latestPost = postsResponse.data[0];

      // Calculate total reading time & extract categories
      const categorySet = new Set<string>();
      postsResponse.data.forEach((post) => {
        totalReadingTime += post.readingTimeMinutes || 0;
        post.categories.forEach((cat) => categorySet.add(cat.name));
      });
      authorCategories = Array.from(categorySet).slice(0, 5);
    }
  } catch (error) {
    if (error instanceof BlogApiError && error.code === 'BLOG_AUTHOR_NOT_FOUND') {
      notFound();
    }
    console.error('Failed to fetch author data:', error);
    notFound();
  }

  if (!author) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: author.displayName },
  ];

  return (
    <LandingLayout>
      <BreadcrumbSchema name={author.displayName} slug={slug} />
      <AuthorSchema author={author} />

      {/* Author Profile Header with Dynamic Gradient */}
      <AuthorHeroBackground avatarUrl={author.avatarUrl}>
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar with dynamic ring color */}
            {author.avatarUrl && (
              <DynamicAvatar
                src={author.avatarUrl}
                alt={author.displayName}
                size={144}
              />
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  {author.displayName}
                </h1>
                <ShareProfileButton authorSlug={slug} authorName={author.displayName} />
              </div>

              {(author.jobTitle || author.company) && (
                <p className="mt-1 text-lg text-neutral-600">
                  {author.jobTitle}
                  {author.jobTitle && author.company && ' at '}
                  {author.company}
                </p>
              )}

              {author.bio && (
                <p className="mt-3 text-neutral-600 max-w-2xl leading-relaxed">{author.bio}</p>
              )}

              {/* Stats, Topics & Social */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {/* Article Count Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 shadow-sm">
                  <Icon name="file-text" size={14} className="text-neutral-500" />
                  {postCount} {postCount === 1 ? 'article' : 'articles'}
                </span>

                {/* Reading Time Badge */}
                {totalReadingTime > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 shadow-sm">
                    <Icon name="clock" size={14} className="text-neutral-500" />
                    {totalReadingTime} min total
                  </span>
                )}

                {/* Topics */}
                {authorCategories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {authorCategories.map((category) => (
                      <span
                        key={category}
                        className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                {(author.socialLinks.twitter || author.socialLinks.linkedin || author.socialLinks.github || author.socialLinks.website) && (
                  <div className="flex items-center gap-2 sm:ml-auto">
                    {author.socialLinks.twitter && (
                      <SocialLink href={author.socialLinks.twitter} icon="twitter" label="Twitter" />
                    )}
                    {author.socialLinks.linkedin && (
                      <SocialLink href={author.socialLinks.linkedin} icon="linkedin" label="LinkedIn" />
                    )}
                    {author.socialLinks.github && (
                      <SocialLink href={author.socialLinks.github} icon="github" label="GitHub" />
                    )}
                    {author.socialLinks.website && (
                      <SocialLink href={author.socialLinks.website} icon="globe" label="Website" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </AuthorHeroBackground>

      {/* Empty State */}
      {postCount === 0 && (
        <section className="py-16">
          <Container>
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="file-text" size={24} className="text-neutral-400" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">No articles yet</h2>
              <p className="text-neutral-600 mb-6">
                {author.displayName} hasn&apos;t published any articles yet. Check back soon!
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icon name="arrow-left" size={16} />
                Browse all articles
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Featured Latest Article */}
      {latestPost && (
        <section className="py-8 bg-neutral-50">
          <Container>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-neutral-900">Latest Article</h2>
              <Link
                href={blogPaths.post(latestPost.slug)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Read article →
              </Link>
            </div>
            <BlogPostCard post={latestPost} featured priority />
          </Container>
        </section>
      )}

      {/* All Articles */}
      {postCount > 1 && (
        <section className="py-8">
          <Container>
            <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
              {/* Main Column */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                  All Articles
                </h2>

                <Suspense
                  fallback={
                    <div className="grid sm:grid-cols-2 gap-5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key -- Static skeleton loaders
                          key={`skeleton-${i}`}
                          className="rounded-2xl aspect-[4/3] bg-neutral-100 animate-pulse"
                        />
                      ))}
                    </div>
                  }
                >
                  <BlogPostGrid
                    params={{
                      page,
                      author: slug,
                      limit: 12,
                    }}
                    basePath={`/blog/author/${slug}`}
                    showFeaturedFirst={false}
                  />
                </Suspense>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <BlogSidebarCTA />
              </aside>
            </div>
          </Container>
        </section>
      )}
    </LandingLayout>
  );
}
