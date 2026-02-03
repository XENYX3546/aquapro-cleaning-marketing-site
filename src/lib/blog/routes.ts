import { getPost, getCategory, getPosts } from './api';
import type { BlogPost, BlogCategory, BlogPostSummary } from './types';

export type BlogRouteMatch = {
  type: 'blog';
  post: BlogPost;
  category: BlogCategory;
};

export type ServiceRouteMatch = {
  type: 'service';
};

export type RouteMatch = BlogRouteMatch | ServiceRouteMatch | null;

/**
 * Check if a route matches a blog category/post combination
 * Returns the blog post and category if found, null otherwise
 */
export async function matchBlogRoute(
  categorySlug: string,
  postSlug: string
): Promise<BlogRouteMatch | null> {
  try {
    // First, check if the category exists
    const categoryResponse = await getCategory(categorySlug);
    const category = categoryResponse.data;

    if (!category) {
      return null;
    }

    // Then, check if the post exists and belongs to this category
    const postResponse = await getPost(postSlug);
    const post = postResponse.data;

    if (!post) {
      return null;
    }

    // Verify the post belongs to the category
    const postCategory = post.categories.find((c) => c.slug === categorySlug);
    if (!postCategory) {
      return null;
    }

    return {
      type: 'blog',
      post,
      category,
    };
  } catch {
    // If API call fails, it's not a blog route
    return null;
  }
}

/**
 * Get all blog posts for static generation
 */
export async function getAllBlogPostsForStaticParams(): Promise<
  { category: string; slug: string }[]
> {
  try {
    const allPosts: BlogPostSummary[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await getPosts({ page, pageSize: 100 });
      allPosts.push(...response.data);
      hasMore = response.meta.pagination.hasMore;
      page++;
    }

    return allPosts
      .filter((post) => post.categories && post.categories.length > 0)
      .map((post) => ({
        category: post.categories[0].slug,
        slug: post.slug,
      }));
  } catch {
    return [];
  }
}
