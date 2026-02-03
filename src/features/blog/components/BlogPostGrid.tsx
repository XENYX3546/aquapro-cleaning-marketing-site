import { getPosts, searchPosts } from '@/lib/blog';
import { BlogPostCard } from './BlogPostCard';
import { BlogPagination } from './BlogPagination';

type BlogPostGridProps = {
  params?: {
    page?: number;
    q?: string;
    category?: string;
    author?: string;
    tag?: string;
    limit?: number;
  };
  basePath?: string;
  showFeaturedFirst?: boolean;
};

export async function BlogPostGrid({
  params = {},
  basePath = '/blog',
  showFeaturedFirst = true,
}: BlogPostGridProps) {
  const { page = 1, q, category, author, tag, limit = 12 } = params;

  try {
    // Use search if query provided, otherwise regular getPosts
    const response = q
      ? await searchPosts({ q, page, pageSize: limit, category, author, tag })
      : await getPosts({ page, pageSize: limit, category, tag });

    const { data: posts, meta: { pagination } } = response;

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-neutral-600">No articles found.</p>
          {q && (
            <p className="mt-2 text-neutral-500">
              Try adjusting your search or browse all articles.
            </p>
          )}
        </div>
      );
    }

    // Sort to show featured first on first page
    const sortedPosts =
      showFeaturedFirst && pagination.page === 1
        ? [...posts].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        : posts;

    // Get the first featured post for larger display
    const featuredPost =
      showFeaturedFirst && pagination.page === 1
        ? sortedPosts.find((p) => p.isFeatured)
        : null;

    const regularPosts = featuredPost
      ? sortedPosts.filter((p) => p.id !== featuredPost.id)
      : sortedPosts;

    // Build search params for pagination
    const searchParams: Record<string, string> = {};
    if (category) {
      searchParams.category = category;
    }
    if (author) {
      searchParams.author = author;
    }
    if (tag) {
      searchParams.tag = tag;
    }
    if (q) {
      searchParams.q = q;
    }

    return (
      <div>
        {/* Post Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Featured Post (larger) */}
          {featuredPost && <BlogPostCard post={featuredPost} featured priority />}

          {/* Regular Posts */}
          {regularPosts.map((post, idx) => (
            <BlogPostCard key={post.id} post={post} priority={idx < 3} />
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-10">
            <BlogPagination
              pagination={pagination}
              basePath={basePath}
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    // Return empty state on error
    return (
      <div className="text-center py-12">
        <p className="text-lg text-neutral-600">Unable to load articles at this time.</p>
        <p className="mt-2 text-neutral-500">Please try again later.</p>
      </div>
    );
  }
}
