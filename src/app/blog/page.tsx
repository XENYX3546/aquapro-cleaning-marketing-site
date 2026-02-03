import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCategories } from '@/lib/blog';
import {
  BlogHero,
  BlogSearch,
  BlogCategoryList,
  BlogSidebarCTA,
  BlogPostGrid,
} from '@/features/blog';
import { LandingLayout } from '@/components/layout';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog - Cleaning Tips & Expert Advice',
  description:
    'Tips, guides, and insights to help you maintain your property. Expert cleaning advice from the Aquapro Cleaning team.',
  keywords: [
    'cleaning tips',
    'cleaning advice',
    'cleaning guides',
    'window cleaning tips',
    'exterior cleaning',
    'property maintenance',
    'cleaning blog',
  ],
  openGraph: {
    title: 'Blog - Cleaning Tips & Expert Advice | Aquapro Cleaning',
    description:
      'Tips, guides, and insights to help you maintain your property.',
    type: 'website',
    url: `${siteConfig.url}/blog`,
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: {
      'application/rss+xml': `${siteConfig.url}/blog/feed.xml`,
    },
  },
};

// Schema for blog listing
function BlogListSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    description: 'Tips, guides, and insights for property maintenance.',
    url: `${siteConfig.url}/blog`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helper functions for page title/description
function getPageTitle(searchQuery?: string, tag?: string): string {
  if (searchQuery) {
    return `Search: "${searchQuery}"`;
  }
  if (tag) {
    return `Tagged: ${tag}`;
  }
  return 'Blog';
}

function getPageDescription(searchQuery?: string, tag?: string): string {
  if (searchQuery) {
    return `Search results for "${searchQuery}"`;
  }
  if (tag) {
    return `Articles tagged with "${tag}"`;
  }
  return 'Tips, guides, and insights to help you maintain your property.';
}

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tag?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = params.page ? Number.parseInt(params.page, 10) : 1;
  const searchQuery = params.q || undefined;
  const tag = params.tag || undefined;

  // Get categories for filter pills (with error handling)
  let categories: Awaited<ReturnType<typeof getCategories>>['data'] = [];
  try {
    const categoriesResponse = await getCategories();
    categories = Array.isArray(categoriesResponse?.data) ? categoriesResponse.data : [];
  } catch {
    // If API fails, continue with empty categories
    console.error('Failed to fetch blog categories');
  }

  const pageTitle = getPageTitle(searchQuery, tag);
  const pageDescription = getPageDescription(searchQuery, tag);

  return (
    <LandingLayout>
      <BlogListSchema />

      {/* Hero with Search */}
      <BlogHero
        title={pageTitle}
        description={pageDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      >
        <BlogSearch defaultValue={searchQuery} />
      </BlogHero>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="mb-8">
            <BlogCategoryList categories={categories} variant="pills" />
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Posts Grid */}
            <Suspense
              fallback={
                <div className="grid sm:grid-cols-2 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="bg-neutral-100 rounded-2xl aspect-[4/3] animate-pulse" />
                  ))}
                </div>
              }
            >
              <BlogPostGrid
                params={{
                  page,
                  q: searchQuery,
                  tag,
                  limit: 12,
                }}
                basePath="/blog"
              />
            </Suspense>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <BlogSidebarCTA />
            </aside>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
