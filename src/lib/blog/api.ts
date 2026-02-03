import type {
  BlogPost,
  BlogPostSummary,
  BlogCategory,
  BlogCategoryTreeNode,
  BlogAuthor,
  PaginatedResponse,
  SingleResponse,
} from './types';

const API_URL = process.env.BLOG_API_URL || 'https://app.zuviaone.com/api/public/blog';
const API_KEY = process.env.BLOG_API_KEY;

class BlogApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'BlogApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: { revalidate?: number; tags?: string[] } = {}
): Promise<T> {
  if (!API_KEY) {
    throw new Error('BLOG_API_KEY environment variable is not set');
  }

  const { revalidate = 300, tags } = options; // 5 minutes default cache

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: {
      revalidate,
      tags,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new BlogApiError(
      json.error?.code || 'UNKNOWN_ERROR',
      json.error?.message || 'An unknown error occurred',
      response.status
    );
  }

  return json;
}

// Posts
export async function getPosts(params: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
} = {}): Promise<PaginatedResponse<BlogPostSummary>> {
  const searchParams = new URLSearchParams();
  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.pageSize) {
    searchParams.set('pageSize', String(params.pageSize));
  }
  if (params.category) {
    searchParams.set('category', params.category);
  }
  if (params.tag) {
    searchParams.set('tag', params.tag);
  }

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<BlogPostSummary>>(
    `/posts${query ? `?${query}` : ''}`,
    { tags: ['blog-posts'] }
  );
}

// Note: API returns { data: { posts: [...] } } so we need to unwrap
export async function getFeaturedPosts(limit = 5): Promise<SingleResponse<BlogPostSummary[]>> {
  const response = await fetchApi<{ data: { posts: BlogPostSummary[] }; meta: SingleResponse<BlogPostSummary[]>['meta'] }>(
    `/posts/featured?limit=${limit}`,
    { tags: ['blog-featured'] }
  );
  return {
    data: response.data.posts,
    meta: response.meta,
  };
}

// Note: API returns { data: { post: {...} } } so we need to unwrap
export async function getPost(slug: string): Promise<SingleResponse<BlogPost>> {
  const response = await fetchApi<{ data: { post: BlogPost }; meta: SingleResponse<BlogPost>['meta'] }>(
    `/posts/${encodeURIComponent(slug)}`,
    { tags: ['blog-posts', `blog-post-${slug}`] }
  );
  return {
    data: response.data.post,
    meta: response.meta,
  };
}

// Note: API returns { data: { posts: [...] } } so we need to unwrap
export async function getRelatedPosts(
  slug: string,
  limit = 5
): Promise<SingleResponse<BlogPostSummary[]>> {
  const response = await fetchApi<{ data: { posts: BlogPostSummary[] }; meta: SingleResponse<BlogPostSummary[]>['meta'] }>(
    `/posts/${encodeURIComponent(slug)}/related?limit=${limit}`,
    { tags: ['blog-posts'] }
  );
  return {
    data: response.data.posts,
    meta: response.meta,
  };
}

// Categories
// Note: API returns { data: { categories: [...] } } so we need to unwrap
export async function getCategories(): Promise<SingleResponse<BlogCategory[]>> {
  const response = await fetchApi<{ data: { categories: BlogCategory[] }; meta: SingleResponse<BlogCategory[]>['meta'] }>(
    '/categories',
    { tags: ['blog-categories'], revalidate: 3600 }
  );
  return {
    data: response.data.categories,
    meta: response.meta,
  };
}

// Note: API returns { data: { tree: [...] } } so we need to unwrap
export async function getCategoryTree(): Promise<SingleResponse<BlogCategoryTreeNode[]>> {
  const response = await fetchApi<{ data: { tree: BlogCategoryTreeNode[] }; meta: SingleResponse<BlogCategoryTreeNode[]>['meta'] }>(
    '/categories/tree',
    { tags: ['blog-categories'], revalidate: 3600 }
  );
  return {
    data: response.data.tree,
    meta: response.meta,
  };
}

// Note: API returns { data: { category: {...} } } so we need to unwrap
export async function getCategory(slug: string): Promise<SingleResponse<BlogCategory>> {
  const response = await fetchApi<{ data: { category: BlogCategory }; meta: SingleResponse<BlogCategory>['meta'] }>(
    `/categories/${encodeURIComponent(slug)}`,
    { tags: ['blog-categories', `blog-category-${slug}`], revalidate: 3600 }
  );
  return {
    data: response.data.category,
    meta: response.meta,
  };
}

// Authors
// Note: API returns { data: { authors: [...] } } so we need to unwrap
export async function getAuthors(): Promise<SingleResponse<BlogAuthor[]>> {
  const response = await fetchApi<{ data: { authors: BlogAuthor[] }; meta: SingleResponse<BlogAuthor[]>['meta'] }>(
    '/authors',
    { tags: ['blog-authors'], revalidate: 3600 }
  );
  return {
    data: response.data.authors,
    meta: response.meta,
  };
}

// Note: API returns { data: { author: {...} } } so we need to unwrap
export async function getAuthor(slug: string): Promise<SingleResponse<BlogAuthor>> {
  const response = await fetchApi<{ data: { author: BlogAuthor }; meta: SingleResponse<BlogAuthor>['meta'] }>(
    `/authors/${encodeURIComponent(slug)}`,
    { tags: ['blog-authors', `blog-author-${slug}`], revalidate: 3600 }
  );
  return {
    data: response.data.author,
    meta: response.meta,
  };
}

// Helper to get all posts for sitemap generation
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const allPosts: BlogPostSummary[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await getPosts({ page, pageSize: 100 });
    allPosts.push(...response.data);
    hasMore = response.meta.pagination.hasMore;
    page++;
  }

  return allPosts;
}

// Helper to get post URL path
export function getPostPath(post: BlogPostSummary | BlogPost): string {
  return `/blog/${post.slug}`;
}

// Helper to format date
export function formatPostDate(dateString: string | null): string {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Helper to format reading time
export function formatReadingTime(minutes: number | null): string {
  if (!minutes) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

// Blog URL paths
export const blogPaths = {
  list: '/blog',
  post: (slug: string) => `/blog/${slug}`,
  category: (slug: string) => `/blog/category/${slug}`,
  author: (slug: string) => `/blog/author/${slug}`,
  tag: (tag: string) => `/blog?tag=${encodeURIComponent(tag)}`,
  page: (page: number) => `/blog?page=${page}`,
} as const;

// Default placeholder image
export const DEFAULT_POST_IMAGE = '/images/blog-placeholder.svg';

// Blog pagination defaults
export const BLOG_DEFAULTS = {
  postsPerPage: 12,
  relatedPostsLimit: 3,
  authorPostsLimit: 5,
  // Cache durations (in seconds)
  postsCacheTTL: 300,      // 5 minutes for posts
  categoriesCacheTTL: 3600, // 1 hour for categories
  authorsCacheTTL: 3600,    // 1 hour for authors
} as const;

// BlogApiError export for error handling
export { BlogApiError };

// Search posts function
export async function searchPosts(params: {
  q?: string;
  page?: number;
  pageSize?: number;
  category?: string;
  author?: string;
  tag?: string;
} = {}): Promise<PaginatedResponse<BlogPostSummary>> {
  const searchParams = new URLSearchParams();
  if (params.q) {
    searchParams.set('q', params.q);
  }
  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.pageSize) {
    searchParams.set('pageSize', String(params.pageSize));
  }
  if (params.category) {
    searchParams.set('category', params.category);
  }
  if (params.author) {
    searchParams.set('author', params.author);
  }
  if (params.tag) {
    searchParams.set('tag', params.tag);
  }

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<BlogPostSummary>>(
    `/posts${query ? `?${query}` : ''}`,
    { tags: ['blog-posts'] }
  );
}

// Get author's posts
export async function getAuthorPosts(slug: string, params: {
  page?: number;
  pageSize?: number;
} = {}): Promise<PaginatedResponse<BlogPostSummary>> {
  const searchParams = new URLSearchParams();
  searchParams.set('author', slug);
  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.pageSize) {
    searchParams.set('pageSize', String(params.pageSize));
  }

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<BlogPostSummary>>(
    `/posts?${query}`,
    { tags: ['blog-posts', `blog-author-${slug}-posts`] }
  );
}
