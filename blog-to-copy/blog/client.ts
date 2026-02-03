import type {
  ListPostsParams,
  ListPostsResponse,
  GetPostResponse,
  ListCategoriesParams,
  ListCategoriesResponse,
  ListAuthorsParams,
  ListAuthorsResponse,
  GetAuthorParams,
  GetAuthorResponse,
  BlogErrorResponse,
} from './types';

// ============================================
// CONFIGURATION
// ============================================

const API_BASE_URL = 'https://app.zuviaone.com/api/marketing/blog';
const API_KEY = process.env.MARKETING_API_KEY;

// Cache configuration for ISR
export const CACHE_TAGS = {
  posts: 'blog-posts',
  post: (slug: string) => `blog-post-${slug}`,
  categories: 'blog-categories',
  authors: 'blog-authors',
  author: (slug: string) => `blog-author-${slug}`,
} as const;

export const REVALIDATE_TIMES = {
  list: 60, // 1 minute for lists
  detail: 300, // 5 minutes for detail pages
} as const;

// ============================================
// ERROR HANDLING
// ============================================

export class BlogApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'BlogApiError';
  }
}

function isErrorResponse(data: unknown): data is BlogErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof (data as BlogErrorResponse).error?.code === 'string'
  );
}

// ============================================
// BASE FETCH UTILITY
// ============================================

async function blogFetch<T>(
  endpoint: string,
  options: {
    params?: Record<string, string | number | boolean | undefined>;
    revalidate?: number;
    tags?: string[];
  } = {}
): Promise<T> {
  if (!API_KEY) {
    throw new BlogApiError(
      'MARKETING_API_NOT_CONFIGURED',
      'Marketing API key is not configured',
      500
    );
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`);

  // Add query parameters
  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      'X-API-Key': API_KEY,
      Accept: 'application/json',
    },
    next: {
      revalidate: options.revalidate ?? REVALIDATE_TIMES.list,
      tags: options.tags,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (isErrorResponse(data)) {
      throw new BlogApiError(data.error.code, data.error.message, response.status);
    }
    throw new BlogApiError('UNKNOWN_ERROR', 'An unknown error occurred', response.status);
  }

  return data as T;
}

// ============================================
// POSTS API
// ============================================

export function listPosts(params: ListPostsParams = {}): Promise<ListPostsResponse> {
  return blogFetch<ListPostsResponse>('/posts', {
    params: {
      page: params.page,
      limit: params.limit,
      category: params.category,
      author: params.author,
      tag: params.tag,
      featured: params.featured,
      q: params.q,
    },
    revalidate: REVALIDATE_TIMES.list,
    tags: [CACHE_TAGS.posts],
  });
}

export function getPost(slug: string): Promise<GetPostResponse> {
  return blogFetch<GetPostResponse>(`/posts/${encodeURIComponent(slug)}`, {
    revalidate: REVALIDATE_TIMES.detail,
    tags: [CACHE_TAGS.post(slug), CACHE_TAGS.posts],
  });
}

export function getFeaturedPosts(limit = 3): Promise<ListPostsResponse> {
  return listPosts({ featured: true, limit });
}

export function getRecentPosts(limit = 6): Promise<ListPostsResponse> {
  return listPosts({ limit });
}

// ============================================
// CATEGORIES API
// ============================================

export function listCategories(
  params: ListCategoriesParams = {}
): Promise<ListCategoriesResponse> {
  return blogFetch<ListCategoriesResponse>('/categories', {
    params: {
      includeEmpty: params.includeEmpty,
    },
    revalidate: REVALIDATE_TIMES.list,
    tags: [CACHE_TAGS.categories],
  });
}

// ============================================
// AUTHORS API
// ============================================

export function listAuthors(params: ListAuthorsParams = {}): Promise<ListAuthorsResponse> {
  return blogFetch<ListAuthorsResponse>('/authors', {
    params: {
      includeEmpty: params.includeEmpty,
    },
    revalidate: REVALIDATE_TIMES.list,
    tags: [CACHE_TAGS.authors],
  });
}

export function getAuthor(
  slug: string,
  params: GetAuthorParams = {}
): Promise<GetAuthorResponse> {
  return blogFetch<GetAuthorResponse>(`/authors/${encodeURIComponent(slug)}`, {
    params: {
      postsLimit: params.postsLimit,
    },
    revalidate: REVALIDATE_TIMES.detail,
    tags: [CACHE_TAGS.author(slug), CACHE_TAGS.authors],
  });
}
