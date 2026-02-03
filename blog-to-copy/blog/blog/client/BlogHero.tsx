'use client';

import { Container, Breadcrumbs } from '@/components/ui';
import type { BreadcrumbItem } from '@/components/ui';

type BlogHeroProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function BlogHero({ title, description, breadcrumbs, children }: BlogHeroProps) {
  return (
    <section className="bg-gradient-to-b from-blue-50/50 to-white pt-6 pb-8">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
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
      </Container>
    </section>
  );
}
