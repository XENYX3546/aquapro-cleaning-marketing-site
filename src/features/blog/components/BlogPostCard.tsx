import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPostPath, formatPostDate } from '@/lib/blog';
import type { BlogPostSummary } from '@/lib/blog';

type BlogPostCardProps = {
  post: BlogPostSummary;
  featured?: boolean;
  priority?: boolean;
};

export function BlogPostCard({ post, featured = false, priority = false }: BlogPostCardProps) {
  const hasImage = Boolean(post.featuredImageUrl);
  const primaryCategory = post.categories?.[0];

  // Card with cover image as background
  if (hasImage) {
    return (
      <article className={featured ? 'sm:col-span-2' : ''}>
        <Link
          href={getPostPath(post)}
          className={`group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
            featured ? 'aspect-[2/1]' : 'aspect-[4/3]'
          }`}
        >
          {/* Background Image */}
          <Image
            src={post.featuredImageUrl!}
            alt={post.featuredImageAlt || post.title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

          {/* Featured Badge */}
          {post.isFeatured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-700 text-white">
                Featured
              </span>
            </div>
          )}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            {/* Category */}
            {primaryCategory && (
              <span className="text-white/60 text-sm font-medium mb-2">
                {primaryCategory.name}
              </span>
            )}

            {/* Title */}
            <h2
              className={`font-semibold text-white leading-snug line-clamp-2 transition-colors ${
                featured ? 'text-xl md:text-2xl' : 'text-lg'
              }`}
            >
              {post.title}
            </h2>

            {/* Excerpt - only on featured */}
            {featured && post.excerpt && (
              <p className="mt-2 text-white/70 text-sm line-clamp-2 hidden sm:block">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/60">
                {post.author?.avatarUrl && (
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.displayName}
                    width={24}
                    height={24}
                    className="rounded-full ring-1 ring-white/20 flex-shrink-0"
                  />
                )}
                <span className="text-white/80 truncate max-w-[120px]">{post.author?.displayName}</span>
                <span className="flex-shrink-0">·</span>
                <time dateTime={post.publishedAt || ''} className="flex-shrink-0">{formatPostDate(post.publishedAt)}</time>
              </div>

              {/* Animated Arrow */}
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Fallback card without image
  return (
    <article className={featured ? 'sm:col-span-2' : ''}>
      <Link
        href={getPostPath(post)}
        className="group relative block h-full bg-white rounded-2xl p-6 border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
      >
        {/* Featured Badge */}
        {post.isFeatured && (
          <div className="mb-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-700 text-white">
              Featured
            </span>
          </div>
        )}

        {/* Category */}
        {primaryCategory && (
          <span className="text-neutral-500 text-sm font-medium">{primaryCategory.name}</span>
        )}

        {/* Title */}
        <h2
          className={`mt-2 font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-3 text-neutral-600 text-sm line-clamp-3">{post.excerpt}</p>
        )}

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            {post.author?.avatarUrl && (
              <Image
                src={post.author.avatarUrl}
                alt={post.author.displayName}
                width={24}
                height={24}
                className="rounded-full flex-shrink-0"
              />
            )}
            <span className="font-medium text-neutral-700 truncate max-w-[120px]">{post.author?.displayName}</span>
            <span className="flex-shrink-0">·</span>
            <time dateTime={post.publishedAt || ''} className="flex-shrink-0">{formatPostDate(post.publishedAt)}</time>
          </div>

          {/* Animated Arrow */}
          <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </Link>
    </article>
  );
}
