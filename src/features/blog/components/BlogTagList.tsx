import Link from 'next/link';
import { blogPaths } from '@/lib/blog';

type BlogTagListProps = {
  tags: string[];
  variant?: 'inline' | 'pills';
};

export function BlogTagList({ tags, variant = 'pills' }: BlogTagListProps) {
  if (tags.length === 0) {
    return null;
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
        <span>Tags:</span>
        {tags.map((tag, idx) => (
          <span key={tag}>
            <Link
              href={blogPaths.tag(tag)}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              {tag}
            </Link>
            {idx < tags.length - 1 && <span className="ml-1">,</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={blogPaths.tag(tag)}
          className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
