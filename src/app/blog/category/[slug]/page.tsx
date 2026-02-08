import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getCategories, getCategory, getPosts } from '@/lib/blog';
import {
  BlogHero,
  BlogCategoryList,
  BlogSidebarCTA,
  BlogPostGrid,
} from '@/features/blog';
import { LandingLayout } from '@/components/layout';
import { siteConfig } from '@/lib/constants';

// ISR: cache for 5 minutes then revalidate in background
export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const response = await getCategories();
    return response.data.map((category) => ({
      slug: category.slug,
    }));
  } catch {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const [categoryResponse, postsResponse] = await Promise.all([
      getCategory(slug),
      getPosts({ category: slug, pageSize: 1 }),
    ]);
    const category = categoryResponse.data;
    const postCount = postsResponse.meta.pagination.total;

    const title = category.metaTitle || `${category.name} Articles`;
    const description =
      category.metaDescription ||
      category.description ||
      `Browse all articles in ${category.name}. Tips, guides, and insights for property cleaning.`;

    return {
      title,
      description,
      // Noindex thin category pages with fewer than 3 posts to prevent soft 404 / quality dilution
      ...(postCount < 3 && {
        robots: { index: false, follow: true },
      }),
      alternates: {
        canonical: `${siteConfig.url}/blog/category/${slug}`,
      },
      openGraph: {
        title: `${title} | ${siteConfig.name} Blog`,
        description,
        url: `${siteConfig.url}/blog/category/${slug}`,
        type: 'website',
      },
    };
  } catch {
    return { title: 'Category Not Found' };
  }
}

// BreadcrumbList schema for category pages
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
        item: `${siteConfig.url}/blog/category/${slug}`,
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

// Schema for category archive
function CategorySchema({
  category,
  postCount,
}: {
  category: { name: string; slug: string; description: string | null };
  postCount: number;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Articles`,
    description:
      category.description || `Articles about ${category.name} for property cleaning.`,
    url: `${siteConfig.url}/blog/category/${category.slug}`,
    isPartOf: {
      '@type': 'Blog',
      name: `${siteConfig.name} Blog`,
      url: `${siteConfig.url}/blog`,
    },
    numberOfItems: postCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam ? Number.parseInt(pageParam, 10) : 1;

  // Get category and posts count
  let category;
  let categories: Awaited<ReturnType<typeof getCategories>>['data'] = [];
  let postCount = 0;

  try {
    const [categoryResponse, categoriesResponse, postsResponse] = await Promise.all([
      getCategory(slug),
      getCategories(),
      getPosts({ category: slug, pageSize: 1 }),
    ]);
    category = categoryResponse.data;
    categories = Array.isArray(categoriesResponse?.data) ? categoriesResponse.data : [];
    postCount = postsResponse.meta.pagination.total;
  } catch (error) {
    console.error('Failed to fetch category data:', error);
    notFound();
  }

  if (!category) {
    notFound();
  }

  return (
    <LandingLayout>
      <BreadcrumbSchema name={category.name} slug={slug} />
      <CategorySchema category={category} postCount={postCount} />

      {/* Hero */}
      <BlogHero
        title={category.name}
        description={
          category.description ||
          `${postCount} ${postCount === 1 ? 'article' : 'articles'} about ${category.name.toLowerCase()}.`
        }
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: category.name },
        ]}
      />

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="mb-8">
            <BlogCategoryList
              categories={categories}
              activeSlug={slug}
              variant="pills"
            />
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
                  category: slug,
                  limit: 12,
                }}
                basePath={`/blog/category/${slug}`}
                showFeaturedFirst={false}
              />
            </Suspense>

            {/* Sidebar with contextual CTA */}
            <aside className="hidden lg:block">
              <BlogSidebarCTA categories={[category]} />
            </aside>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
