import Image from 'next/image';
import Link from 'next/link';
import { getCategories, getPosts, getPostPath, formatPostDate } from '@/lib/blog';
import { BlogCategoryList } from './BlogCategoryList';

type BlogSidebarServerProps = {
  activeCategorySlug?: string;
  showRecentPosts?: boolean;
  showCategories?: boolean;
};

export async function BlogSidebarServer({
  activeCategorySlug,
  showRecentPosts = true,
  showCategories = true,
}: BlogSidebarServerProps) {
  let categories: Awaited<ReturnType<typeof getCategories>>['data'] = [];
  let recentPosts: Awaited<ReturnType<typeof getPosts>>['data'] = [];

  try {
    const [categoriesResponse, recentPostsResponse] = await Promise.all([
      showCategories ? getCategories() : null,
      showRecentPosts ? getPosts({ pageSize: 5 }) : null,
    ]);

    categories = categoriesResponse?.data || [];
    recentPosts = recentPostsResponse?.data || [];
  } catch (error) {
    console.error('Failed to fetch sidebar data:', error);
    // Continue with empty data - sidebar will just show CTA
  }

  return (
    <aside className="space-y-8">
      {/* Categories */}
      {showCategories && categories.length > 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Categories</h3>
          <BlogCategoryList
            categories={categories}
            activeSlug={activeCategorySlug}
            variant="list"
          />
        </div>
      )}

      {/* Recent Posts */}
      {showRecentPosts && recentPosts.length > 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h3 className="font-semibold text-neutral-900 mb-4">Recent Articles</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={getPostPath(post)}
                className="group flex gap-3"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                  {post.featuredImageUrl ? (
                    <Image
                      src={post.featuredImageUrl}
                      alt={post.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  {post.publishedAt && (
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs text-neutral-500 mt-1 block"
                    >
                      {formatPostDate(post.publishedAt)}
                    </time>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-primary-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">Get a Free Quote</h3>
        <p className="text-sm text-primary-100 mb-4">
          Professional cleaning services for your home or business in Brisbane & Gold Coast.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
        >
          Contact Us Today
        </Link>
      </div>
    </aside>
  );
}
