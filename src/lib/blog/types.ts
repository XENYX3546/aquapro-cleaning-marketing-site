// Blog API Types - matching the Zuvia Blog API response structures

export interface PostAuthor {
  id: string;
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface PostCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: PostAuthor;
  categories: PostCategory[];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishedAt: string | null;
  scheduledAt: string | null;
  featuredImageUrl: string | null;
  featuredImageMediaId: string | null;
  featuredImageAlt: string | null;
  featuredImageCaption: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  ogImageMediaId: string | null;
  structuredData: Record<string, unknown> | null;
  isFeatured: boolean;
  isPinned: boolean;
  allowComments: boolean;
  readingTimeMinutes: number | null;
  wordCount: number | null;
  tags: string[];
  version: number;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: PostAuthor;
  categories: PostCategory[];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishedAt: string | null;
  scheduledAt: string | null;
  featuredImageUrl: string | null;
  featuredImageMediaId: string | null;
  featuredImageAlt: string | null;
  isFeatured: boolean;
  isPinned: boolean;
  readingTimeMinutes: number | null;
  tags: string[];
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoryTreeNode extends BlogCategory {
  children: BlogCategoryTreeNode[];
  postCount: number;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface BlogAuthor {
  id: string;
  userId: string | null;
  displayName: string;
  slug: string;
  bio: string | null;
  avatarUrl: string | null;
  avatarMediaId: string | null;
  jobTitle: string | null;
  company: string | null;
  socialLinks: SocialLinks;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ResponseMeta {
  requestId: string;
  timestamp: string;
  pagination?: PaginationMeta;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: ResponseMeta & { pagination: PaginationMeta };
}

export interface SingleResponse<T> {
  data: T;
  meta: ResponseMeta;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}
