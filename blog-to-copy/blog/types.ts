// Blog API Types
// Based on Marketing Blog API Specification

// ============================================
// META & PAGINATION
// ============================================

export type ResponseMeta = {
  requestId: string;
  request_id: string; // Deprecated, use requestId
  timestamp: string; // ISO 8601
  pagination?: OffsetPagination;
};

export type OffsetPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

// ============================================
// AUTHOR
// ============================================

export type PublicAuthor = {
  id: string;
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  bio: string | null;
  jobTitle: string | null;
  company: string | null;
};

export type SocialLinks = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

export type PublicAuthorWithCount = PublicAuthor & {
  socialLinks: SocialLinks;
  postCount: number;
};

export type PublicAuthorDetail = PublicAuthorWithCount & {
  recentPosts: PublicPost[];
};

// ============================================
// CATEGORY
// ============================================

export type PublicCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type PublicCategoryWithCount = PublicCategory & {
  postCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
};

// ============================================
// POST
// ============================================

export type FeaturedImage = {
  url: string | null;
  alt: string | null;
};

export type FeaturedImageWithCaption = FeaturedImage & {
  caption: string | null;
};

export type PublicPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: PublicAuthor;
  categories: PublicCategory[];
  publishedAt: string; // ISO 8601
  featuredImage: FeaturedImage;
  readingTimeMinutes: number | null;
  tags: string[];
  isFeatured: boolean;
};

export type SeoMeta = {
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
};

export type AdjacentPost = {
  id: string;
  title: string;
  slug: string;
} | null;

export type RelatedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  publishedAt: string;
  readingTimeMinutes: number | null;
  authorName: string;
  authorSlug: string;
};

export type PublicPostDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string; // HTML
  author: PublicAuthor;
  categories: PublicCategory[];
  publishedAt: string;
  featuredImage: FeaturedImageWithCaption;
  readingTimeMinutes: number | null;
  wordCount: number | null;
  tags: string[];
  isFeatured: boolean;
  allowComments: boolean;
  seo: SeoMeta;
  structuredData: Record<string, unknown> | null;
  navigation: {
    previous: AdjacentPost;
    next: AdjacentPost;
  };
  relatedPosts: RelatedPost[];
};

// ============================================
// RESPONSE ENVELOPES
// ============================================

export type ListPostsResponse = {
  data: PublicPost[];
  meta: ResponseMeta & { pagination: OffsetPagination };
};

export type GetPostResponse = {
  data: { post: PublicPostDetail };
  meta: ResponseMeta;
};

export type ListCategoriesResponse = {
  data: { categories: PublicCategoryWithCount[] };
  meta: ResponseMeta;
};

export type ListAuthorsResponse = {
  data: { authors: PublicAuthorWithCount[] };
  meta: ResponseMeta;
};

export type GetAuthorResponse = {
  data: { author: PublicAuthorDetail };
  meta: ResponseMeta;
};

// ============================================
// ERROR RESPONSE
// ============================================

export type BlogErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

// ============================================
// QUERY PARAMETERS
// ============================================

export type ListPostsParams = {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
  tag?: string;
  featured?: boolean;
  q?: string;
};

export type ListCategoriesParams = {
  includeEmpty?: boolean;
};

export type ListAuthorsParams = {
  includeEmpty?: boolean;
};

export type GetAuthorParams = {
  postsLimit?: number;
};
