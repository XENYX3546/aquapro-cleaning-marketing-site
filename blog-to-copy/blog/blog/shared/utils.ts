// Blog Shared Utilities

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format a date string for datetime attribute
 */
export function formatDatetime(dateString: string): string {
  return new Date(dateString).toISOString();
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number | null): string {
  if (!minutes) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string | null, maxLength: number): string {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Generate blog URL paths
 */
export const blogPaths = {
  list: '/blog',
  post: (slug: string) => `/blog/${slug}`,
  category: (slug: string) => `/blog/category/${slug}`,
  author: (slug: string) => `/blog/author/${slug}`,
  tag: (tag: string) => `/blog?tag=${encodeURIComponent(tag)}`,
  page: (page: number) => `/blog?page=${page}`,
} as const;

/**
 * Default placeholder image for posts without featured images
 */
export const DEFAULT_POST_IMAGE = '/images/blog-placeholder.svg';

/**
 * Blog pagination defaults
 */
export const BLOG_DEFAULTS = {
  postsPerPage: 12,
  relatedPostsLimit: 3,
  authorPostsLimit: 5,
} as const;
