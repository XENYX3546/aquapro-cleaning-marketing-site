'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { OffsetPagination } from '@/lib/blog';

type BlogPaginationProps = {
  pagination: OffsetPagination;
  basePath: string;
  searchParams?: Record<string, string>;
};

export function BlogPagination({ pagination, basePath, searchParams = {} }: BlogPaginationProps) {
  const { page, totalPages, hasMore } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const buildUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNum > 1) {
      params.set('page', String(pageNum));
    } else {
      params.delete('page');
    }
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: Array<number | 'ellipsis'> = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-1">
      {/* Previous */}
      {page > 1 ? (
        <Link
          href={buildUrl(page - 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Previous page"
        >
          <Icon name="chevron-left" size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-300 cursor-not-allowed">
          <Icon name="chevron-left" size={16} />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-2">
        {pageNumbers.map((pageNum, idx) =>
          pageNum === 'ellipsis' ? (
            <span key={idx < 3 ? 'ellipsis-start' : 'ellipsis-end'} className="px-2 py-2 text-neutral-400">
              ...
            </span>
          ) : (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={cn(
                'min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors',
                pageNum === page
                  ? 'bg-blue-600 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              )}
              aria-current={pageNum === page ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {hasMore ? (
        <Link
          href={buildUrl(page + 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <Icon name="chevron-right" size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-300 cursor-not-allowed">
          <span className="hidden sm:inline">Next</span>
          <Icon name="chevron-right" size={16} />
        </span>
      )}
    </nav>
  );
}
