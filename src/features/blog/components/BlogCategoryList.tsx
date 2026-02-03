import Link from 'next/link';
import { cn } from '@/lib/utils';
import { blogPaths } from '@/lib/blog';
import type { BlogCategory, BlogCategoryTreeNode, PostCategory } from '@/lib/blog';

// Base category shape that all category types share
type CategoryLike = {
  id: string;
  name: string;
  slug: string;
};

type BlogCategoryListProps = {
  categories: CategoryLike[] | BlogCategory[] | BlogCategoryTreeNode[] | PostCategory[];
  activeSlug?: string;
  variant?: 'inline' | 'list' | 'pills' | 'light';
  showCount?: boolean;
};

function hasCount(
  category: CategoryLike
): category is BlogCategoryTreeNode {
  return 'postCount' in category;
}

export function BlogCategoryList({
  categories,
  activeSlug,
  variant = 'inline',
  showCount = false,
}: BlogCategoryListProps) {
  if (categories.length === 0) {
    return null;
  }

  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        <Link
          href={blogPaths.list}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-full transition-colors',
            !activeSlug
              ? 'bg-primary-700 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={blogPaths.category(category.slug)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-full transition-colors',
              activeSlug === category.slug
                ? 'bg-primary-700 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {category.name}
            {showCount && hasCount(category) && (
              <span className="ml-1 text-xs opacity-70">({category.postCount})</span>
            )}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <ul className="space-y-2">
        <li>
          <Link
            href={blogPaths.list}
            className={cn(
              'flex items-center justify-between py-2 px-3 rounded-lg transition-colors',
              !activeSlug
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            )}
          >
            <span>All Posts</span>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={blogPaths.category(category.slug)}
              className={cn(
                'flex items-center justify-between py-2 px-3 rounded-lg transition-colors',
                activeSlug === category.slug
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              )}
            >
              <span>{category.name}</span>
              {showCount && hasCount(category) && (
                <span className="text-sm text-neutral-400">{category.postCount}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  // light variant (for dark backgrounds)
  if (variant === 'light') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={blogPaths.category(category.slug)}
            className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  }

  // inline variant (default)
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category, idx) => (
        <span key={category.id} className="inline-flex items-center">
          <Link
            href={blogPaths.category(category.slug)}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {category.name}
          </Link>
          {idx < categories.length - 1 && <span className="ml-2 text-neutral-300">·</span>}
        </span>
      ))}
    </div>
  );
}
