'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { formatReadingTime, blogPaths } from '../shared';
import type { RelatedPost } from '@/lib/blog';

type BlogRelatedPostsProps = {
  posts: RelatedPost[];
  title?: string;
};

function RelatedPostCard({ post, index }: { post: RelatedPost; index: number }) {
  const hasImage = Boolean(post.featuredImageUrl);

  // Card with cover image as background
  if (hasImage) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Link
          href={blogPaths.post(post.slug)}
          className="group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Background Image */}
          <Image
            src={post.featuredImageUrl!}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h3 className="font-semibold text-white text-lg leading-snug line-clamp-2 group-hover:text-blue-200 transition-colors">
              {post.title}
            </h3>

            <div className="mt-3 flex items-center justify-between text-sm text-white/70">
              <span>{post.authorName}</span>
              {post.readingTimeMinutes && (
                <span>{formatReadingTime(post.readingTimeMinutes)}</span>
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
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={blogPaths.post(post.slug)}
        className="group block h-full bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200 hover:border-blue-300 hover:shadow-lg hover:from-blue-50 hover:to-white transition-all duration-300"
      >
        <h3 className="font-semibold text-neutral-900 text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-3 text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
        )}

        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
          <span>{post.authorName}</span>
          {post.readingTimeMinutes && (
            <span>{formatReadingTime(post.readingTimeMinutes)}</span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogRelatedPosts({ posts, title = 'Related Articles' }: BlogRelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-neutral-200">
      <h2 className="text-2xl font-bold text-neutral-900 mb-8">{title}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <RelatedPostCard key={post.id} post={post} index={idx} />
        ))}
      </div>
    </section>
  );
}
