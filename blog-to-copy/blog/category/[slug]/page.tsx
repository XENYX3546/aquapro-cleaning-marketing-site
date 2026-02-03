import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LandingLayout } from '@/components/layout';
import { Container } from '@/components/ui';
import { BlogHero, BlogCategoryList, BlogSidebarCTA } from '@/features/blog/client';
import { BlogPostGrid } from '@/features/blog/server';
import { listCategories, listPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const response = await listCategories();
    return response.data.categories.map((category) => ({
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
    const response = await listCategories();
    const category = response.data.categories.find((c) => c.slug === slug);

    if (!category) {
      return { title: 'Category Not Found' };
    }

    const title = category.metaTitle || `${category.name} Articles`;
    const description =
      category.metaDescription ||
      category.description ||
      `Browse all articles in ${category.name}. Tips, guides, and insights for service businesses.`;

    return {
      title,
      description,
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
      // eslint-disable-next-line react/no-danger -- JSON-LD structured data
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
      category.description || `Articles about ${category.name} for service businesses.`,
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
      // eslint-disable-next-line react/no-danger -- JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam ? Number.parseInt(pageParam, 10) : 1;

  // Get all categories and find the current one (with error handling)
  let categories: Awaited<ReturnType<typeof listCategories>>['data']['categories'] = [];
  let postCount = 0;

  try {
    const [categoriesResponse, postsResponse] = await Promise.all([
      listCategories(),
      listPosts({ category: slug, limit: 1 }),
    ]);
    ({ categories } = categoriesResponse.data);
    ({ total: postCount } = postsResponse.meta.pagination);
  } catch (error) {
    console.error('Failed to fetch category data:', error);
    notFound();
  }

  const category = categories.find((c) => c.slug === slug);

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
        <Container>
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
                    // eslint-disable-next-line react/no-array-index-key -- Static skeleton loaders
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
        </Container>
      </section>
    </LandingLayout>
  );
}
