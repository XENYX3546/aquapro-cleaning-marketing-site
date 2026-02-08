'use client';

import { useEffect, useState, useRef } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { getCTAForCategories, DEFAULT_CTA } from '@/lib/blog';
import type { PostCategory } from '@/lib/blog';

type TocHeading = {
  id: string;
  text: string;
  level: number;
};

type BlogSidebarTOCProps = {
  headings: TocHeading[];
  categories?: PostCategory[];
};

export function BlogSidebarTOC({ headings, categories = [] }: BlogSidebarTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    for (const el of headingElements) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const categorySlugs = categories.map((c) => c.slug);
  const cta = categorySlugs.length > 0 ? getCTAForCategories(categorySlugs) : DEFAULT_CTA;

  return (
    <div className="sticky top-24 space-y-6">
      {/* TOC */}
      <nav aria-label="Table of contents" className="bg-neutral-50 rounded-xl border border-neutral-200 p-5">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
          On this page
        </p>
        <ol className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm leading-snug py-1 transition-colors ${
                  heading.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === heading.id
                    ? 'text-primary-600 font-medium'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* CTA Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{cta.headline}</h3>
        <p className="text-primary-100 text-sm mb-4">{cta.description}</p>
        <Link
          href="/contact"
          className="block w-full bg-white text-primary-800 font-semibold text-center py-3 px-4 rounded-lg hover:bg-primary-50 transition-colors"
        >
          {cta.buttonText}
        </Link>
        <p className="text-primary-200 text-xs text-center mt-3">Free quotes • No obligation</p>
      </div>

      {/* Features list */}
      <div className="bg-neutral-50 rounded-xl p-5">
        <h4 className="font-medium text-neutral-900 mb-3 text-sm">What we offer:</h4>
        <ul className="space-y-2">
          {cta.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
