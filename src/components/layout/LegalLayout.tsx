import { type ReactNode } from 'react';
import { Container, Section } from '@/components/ui';
import { Breadcrumbs } from '@/components/seo';
import { Footer } from './Footer';
import { Header } from './Header';

// Import legal-specific styles only for legal pages
import '@/app/legal.css';

type LegalLayoutProps = {
  children: ReactNode;
  title: string;
  lastUpdated: string;
};

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: title },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Section compact className="bg-neutral-50 border-b border-neutral-200">
          <Container>
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-neutral-900">{title}</h1>
            <p className="mt-2 text-neutral-600">Last updated: {lastUpdated}</p>
          </Container>
        </Section>
        <Section>
          <Container>
            <div className="legal-content max-w-4xl">
              {children}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
