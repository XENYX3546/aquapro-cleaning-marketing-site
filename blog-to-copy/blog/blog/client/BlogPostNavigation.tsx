'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui';
import { blogPaths } from '../shared';
import type { AdjacentPost } from '@/lib/blog';

type BlogPostNavigationProps = {
  previous: AdjacentPost;
  next: AdjacentPost;
};

export function BlogPostNavigation({ previous, next }: BlogPostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav aria-label="Post navigation" className="mt-12">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Previous */}
        {previous ? (
          <Link
            href={blogPaths.post(previous.slug)}
            className="group flex items-start gap-3 p-4 rounded-xl border border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
          >
            <Icon
              name="arrow-left"
              size={20}
              className="mt-0.5 text-neutral-400 group-hover:text-blue-600 transition-colors"
            />
            <div className="min-w-0">
              <span className="text-sm text-neutral-500">Previous</span>
              <p className="font-medium text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {previous.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={blogPaths.post(next.slug)}
            className="group flex items-start gap-3 p-4 rounded-xl border border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-right sm:flex-row-reverse"
          >
            <Icon
              name="arrow-right"
              size={20}
              className="mt-0.5 text-neutral-400 group-hover:text-blue-600 transition-colors"
            />
            <div className="min-w-0 flex-1">
              <span className="text-sm text-neutral-500">Next</span>
              <p className="font-medium text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {next.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
