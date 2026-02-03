'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui';
import { getCTAForCategories, DEFAULT_CTA } from '../shared';
import type { PublicCategory } from '@/lib/blog';

type BlogSidebarCTAProps = {
  categories?: PublicCategory[];
};

export function BlogSidebarCTA({ categories = [] }: BlogSidebarCTAProps) {
  // Get contextual CTA based on article categories
  const categorySlugs = categories.map((c) => c.slug);
  const cta = categorySlugs.length > 0 ? getCTAForCategories(categorySlugs) : DEFAULT_CTA;

  return (
    <div className="sticky top-24">
      {/* Main CTA Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{cta.headline}</h3>
        <p className="text-blue-100 text-sm mb-4">{cta.description}</p>
        <Link
          href="https://app.zuviaone.com/register"
          className="block w-full bg-white text-blue-600 font-semibold text-center py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
        >
          {cta.buttonText}
        </Link>
        <p className="text-blue-200 text-xs text-center mt-3">No credit card required</p>
      </div>

      {/* Features list */}
      <div className="mt-6 bg-neutral-50 rounded-xl p-5">
        <h4 className="font-medium text-neutral-900 mb-3 text-sm">What you get:</h4>
        <ul className="space-y-2">
          {cta.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
              <Icon name="check" size={16} className="text-green-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
