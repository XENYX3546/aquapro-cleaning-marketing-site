import Image from 'next/image';
import Link from 'next/link';
import { listCategories, getRecentPosts } from '@/lib/blog';
import { BlogCategoryList } from '../client';
import { formatDate, blogPaths, DEFAULT_POST_IMAGE } from '../shared';

type BlogSidebarProps = {
  activeCategorySlug?: string;
  showRecentPosts?: boolean;
  showCategories?: boolean;
};

export async function BlogSidebar({
  activeCategorySlug,
  showRecentPosts = true,
  showCategories = true,
}: BlogSidebarProps) {
  let categories: Awaited<ReturnType<typeof listCategories>>['data']['categories'] = [];
  let recentPosts: Awaited<ReturnType<typeof getRecentPosts>>['data'] = [];

  try {
    const [categoriesResponse, recentPostsResponse] = await Promise.all([
      showCategories ? listCategories() : null,
      showRecentPosts ? getRecentPosts(5) : null,
    ]);

    categories = categoriesResponse?.data.categories || [];
    recentPosts = recentPostsResponse?.data || [];
  } catch (error) {
    console.error('Failed to fetch sidebar data:', error);
    // Continue with empty data - sidebar will just show newsletter CTA
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
            showCount
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
                href={blogPaths.post(post.slug)}
                className="group flex gap-3"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.featuredImage.url || DEFAULT_POST_IMAGE}
                    alt={post.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs text-neutral-500 mt-1 block"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm text-blue-100 mb-4">
          Get the latest articles and product updates delivered to your inbox.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
        >
          Get Started Free
        </Link>
      </div>
    </aside>
  );
}
