'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { formatDate, formatReadingTime, blogPaths } from '../shared';
import type { PublicPost } from '@/lib/blog';

type BlogPostCardProps = {
  post: PublicPost;
  featured?: boolean;
  priority?: boolean;
};

export function BlogPostCard({ post, featured = false, priority = false }: BlogPostCardProps) {
  const hasImage = Boolean(post.featuredImage.url);
  const primaryCategory = post.categories[0];

  // Card with cover image as background
  if (hasImage) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={featured ? 'sm:col-span-2' : ''}
      >
        <Link
          href={blogPaths.post(post.slug)}
          className={`group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
            featured ? 'aspect-[2/1]' : 'aspect-[4/3]'
          }`}
        >
          {/* Background Image */}
          <Image
            src={post.featuredImage.url!}
            alt={post.featuredImage.alt || post.title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

          {/* Featured Badge */}
          {post.isFeatured && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary">Featured</Badge>
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
              className={`font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-200 transition-colors ${
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
            <div className="mt-3 flex items-center gap-3 text-sm text-white/60">
              {post.author.avatarUrl && (
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.displayName}
                  width={24}
                  height={24}
                  className="rounded-full ring-1 ring-white/20"
                />
              )}
              <span className="text-white/80">{post.author.displayName}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingTimeMinutes && (
                <>
                  <span>·</span>
                  <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                </>
              )}
            </div>
          </div>

          {/* Hover border accent */}
          <div className="absolute inset-0 rounded-2xl ring-0 ring-blue-400/0 group-hover:ring-2 group-hover:ring-blue-400/50 transition-all duration-300" />
        </Link>
      </motion.article>
    );
  }

  // Fallback card without image
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={featured ? 'sm:col-span-2' : ''}
    >
      <Link
        href={blogPaths.post(post.slug)}
        className="group block h-full bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200 hover:border-blue-300 hover:shadow-lg hover:from-blue-50 hover:to-white transition-all duration-300"
      >
        {/* Featured Badge */}
        {post.isFeatured && (
          <div className="mb-3">
            <Badge variant="primary">Featured</Badge>
          </div>
        )}

        {/* Category */}
        {primaryCategory && (
          <span className="text-neutral-500 text-sm font-medium">{primaryCategory.name}</span>
        )}

        {/* Title */}
        <h2
          className={`mt-2 font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors ${
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
        <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500">
          {post.author.avatarUrl && (
            <Image
              src={post.author.avatarUrl}
              alt={post.author.displayName}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span className="font-medium text-neutral-700">{post.author.displayName}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readingTimeMinutes && (
            <>
              <span>·</span>
              <span>{formatReadingTime(post.readingTimeMinutes)}</span>
            </>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
