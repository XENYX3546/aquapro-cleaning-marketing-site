'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BlogHeroProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function BlogHero({ title, description, breadcrumbs, children }: BlogHeroProps) {
  return (
    <section className="bg-gradient-to-b from-primary-50/50 to-white pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 mx-1 text-neutral-400" />
                  )}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-neutral-900 font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-neutral-600 max-w-xl">{description}</p>
            )}
          </div>
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
