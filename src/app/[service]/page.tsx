import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  getCategory,
  getCategories,
  getCategoryTree,
  getPosts,
} from '@/lib/blog';
import {
  BlogPostCard,
  BlogCategoryList,
  BlogPagination,
  Breadcrumbs,
  BlogSidebarCTA,
} from '@/features/blog';
import { LandingLayout } from '@/components/layout';
import { siteConfig } from '@/lib/constants';

type PageProps = {
  params: Promise<{ service: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  try {
    const categoriesResponse = await getCategories();
    return categoriesResponse.data.map((category) => ({
      service: category.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: categorySlug } = await params;

  try {
    const categoryResponse = await getCategory(categorySlug);
    const category = categoryResponse.data;

    const title = category.metaTitle || `${category.name} - Blog`;
    const description =
      category.metaDescription ||
      category.description ||
      `Browse all articles in ${category.name}. Expert tips, guides, and insights.`;

    return {
      title,
      description,
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        type: 'website',
        url: `${siteConfig.url}/${category.slug}`,
      },
      alternates: {
        canonical: `${siteConfig.url}/${category.slug}`,
      },
    };
  } catch {
    return {
      title: 'Page Not Found',
    };
  }
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { service: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  // Try to fetch the category - this page only handles blog categories
  let category;
  try {
    const categoryResponse = await getCategory(categorySlug);
    category = categoryResponse.data;
  } catch {
    // Not a valid blog category - return 404
    notFound();
  }

  if (!category) {
    notFound();
  }

  // Fetch posts for this category and all categories for navigation
  let posts: Awaited<ReturnType<typeof getPosts>>['data'] = [];
  let pagination: Awaited<ReturnType<typeof getPosts>>['meta']['pagination'] = {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasMore: false,
  };
  let categories: Awaited<ReturnType<typeof getCategoryTree>>['data'] = [];

  try {
    const [postsResponse, categoryTreeResponse] = await Promise.all([
      getPosts({ page, pageSize: 10, category: categorySlug }),
      getCategoryTree(),
    ]);

    posts = Array.isArray(postsResponse?.data) ? postsResponse.data : [];
    pagination = postsResponse?.meta?.pagination || pagination;
    categories = Array.isArray(categoryTreeResponse?.data) ? categoryTreeResponse.data : [];
  } catch {
    // API error - show empty state
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${siteConfig.url}/${category.slug}`,
    isPartOf: {
      '@type': 'Blog',
      name: 'Aquapro Cleaning Blog',
      url: `${siteConfig.url}/blog`,
    },
    breadcrumb: {
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
          name: category.name,
          item: `${siteConfig.url}/${category.slug}`,
        },
      ],
    },
  };

  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: category.name },
            ]}
            className="mb-6"
          />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-neutral-500 max-w-2xl">
                  {category.description}
                </p>
              )}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="search"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <BlogCategoryList
              categories={categories}
              activeSlug={categorySlug}
              variant="pills"
            />
          </div>

          {/* Main Content */}
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
            {/* Posts Grid */}
            <div>
              {posts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {posts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                  <BlogPagination pagination={pagination} basePath={`/${categorySlug}`} />
                </>
              ) : (
                <div className="text-center py-16 bg-neutral-50 rounded-2xl">
                  <p className="text-neutral-500 text-lg">
                    No articles found in this category yet.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <BlogSidebarCTA categories={[category]} />
            </aside>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
