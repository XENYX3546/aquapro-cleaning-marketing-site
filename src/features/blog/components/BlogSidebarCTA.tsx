'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { getCTAForCategories, DEFAULT_CTA } from '@/lib/blog';
import type { PostCategory } from '@/lib/blog';

type BlogSidebarCTAProps = {
  categories?: PostCategory[];
};

export function BlogSidebarCTA({ categories = [] }: BlogSidebarCTAProps) {
  // Get contextual CTA based on article categories
  const categorySlugs = categories.map((c) => c.slug);
  const cta = categorySlugs.length > 0 ? getCTAForCategories(categorySlugs) : DEFAULT_CTA;

  return (
    <div className="sticky top-24">
      {/* Main CTA Card */}
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
      <div className="mt-6 bg-neutral-50 rounded-xl p-5">
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
