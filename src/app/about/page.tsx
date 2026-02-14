import { Metadata } from 'next';
import { LandingLayout } from '@/components/layout';
import { CommercialBanner, ReviewsSection } from '@/components/ui';
import { AboutHero, AboutStory } from '@/components/about';
import { ContactSection } from '@/features/home/client';
import { siteConfig, customerStatsDisplay } from '@/lib/constants';

// SEO Metadata
export const metadata: Metadata = {
  title: `About ${siteConfig.name} | Professional Cleaning in Essex`,
  description: `Learn about ${siteConfig.name} - a family-run team delivering professional exterior cleaning services across Essex. Fully insured, 5-star rated, and trusted by ${customerStatsDisplay.totalCustomersPlus} happy customers.`,
  keywords: [
    'about aquapro',
    'exterior cleaning essex',
    'professional cleaning company',
    'pressure washing essex',
    'roof cleaning essex',
    'roof moss removal essex',
    'gutter cleaning essex',
    'fully insured cleaners',
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `About ${siteConfig.name} | Professional Exterior Cleaning`,
    description: `Dedicated to excellence in exterior cleaning. ${customerStatsDisplay.totalCustomersPlus} happy customers and 5-star rated service across Essex. Family-run, fully insured.`,
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/images/blake-van-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Professional Exterior Cleaning Team`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${siteConfig.name} | Professional Exterior Cleaning`,
    description: `Dedicated to excellence in exterior cleaning. ${customerStatsDisplay.totalCustomersPlus} happy customers and 5-star rated service across Essex. Family-run, fully insured.`,
    images: [`${siteConfig.url}/images/blake-van-image.jpg`],
  },
};

// JSON-LD Structured Data
function AboutStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function BreadcrumbStructuredData() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}

export default function AboutPage() {
  return (
    <LandingLayout>
      <AboutStructuredData />
      <BreadcrumbStructuredData />

      {/* Hero Section */}
      <AboutHero />

      {/* About Story Section */}
      <AboutStory />

      {/* Commercial Banner */}
      <CommercialBanner />

      {/* Reviews Section */}
      <ReviewsSection variant="slate" />

      {/* Contact Section */}
      <ContactSection />
    </LandingLayout>
  );
}
