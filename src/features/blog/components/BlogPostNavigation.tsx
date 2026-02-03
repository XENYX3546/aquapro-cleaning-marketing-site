'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPostPath } from '@/lib/blog';
import type { BlogPostSummary } from '@/lib/blog';

type BlogPostNavigationProps = {
  previous?: BlogPostSummary | null;
  next?: BlogPostSummary | null;
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
            href={getPostPath(previous)}
            className="group flex items-start gap-3 p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mt-0.5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
            <div className="min-w-0">
              <span className="text-sm text-neutral-500">Previous</span>
              <p className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
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
            href={getPostPath(next)}
            className="group flex items-start gap-3 p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all text-right sm:flex-row-reverse"
          >
            <ArrowRight className="w-5 h-5 mt-0.5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
            <div className="min-w-0 flex-1">
              <span className="text-sm text-neutral-500">Next</span>
              <p className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
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
