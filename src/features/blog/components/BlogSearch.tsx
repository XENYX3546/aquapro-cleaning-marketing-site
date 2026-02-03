'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search, X } from 'lucide-react';
import { blogPaths } from '@/lib/blog';

type BlogSearchProps = {
  defaultValue?: string;
  placeholder?: string;
};

export function BlogSearch({
  defaultValue = '',
  placeholder = 'Search articles...',
}: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue || searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();

    startTransition(() => {
      if (trimmed) {
        router.push(`${blogPaths.list}?q=${encodeURIComponent(trimmed)}`);
      } else {
        router.push(blogPaths.list);
      }
    });
  };

  const handleClear = () => {
    setValue('');
    startTransition(() => {
      router.push(blogPaths.list);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
          aria-label="Search blog posts"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {isPending && (
        <div className="absolute right-14 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </form>
  );
}
