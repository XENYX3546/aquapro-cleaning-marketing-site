import { Metadata } from 'next';
import { LandingLayout } from '@/components/layout';
import { CommercialBanner, ReviewsSection, ExpertHelpCTA } from '@/components/ui';
import { AboutHero, AboutStory } from '@/components/about';
import { ContactSection } from '@/features/home/client';
import { siteConfig, reviewStats, customerStatsDisplay } from '@/lib/constants';

// SEO Metadata
export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name} - Professional Exterior Cleaning in Essex`,
  description: `Learn about ${siteConfig.name} - over 10 years of experience delivering professional exterior cleaning services in Essex. Fully insured, 5-star rated, and trusted by ${customerStatsDisplay.totalCustomersPlus} happy customers.`,
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
    description: `Dedicated to excellence in exterior cleaning. Over 10 years experience, ${customerStatsDisplay.totalCustomersPlus} happy customers, and 5-star rated service across Essex.`,
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
    description: `Dedicated to excellence in exterior cleaning. Over 10 years experience, ${customerStatsDisplay.totalCustomersPlus} happy customers, and 5-star rated service across Essex.`,
    images: [`${siteConfig.url}/images/blake-van-image.jpg`],
  },
};

// JSON-LD Structured Data
function AboutStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: siteConfig.established.toString(),
    areaServed: {
      '@type': 'Place',
      name: siteConfig.coverage,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(reviewStats.averageRating),
      reviewCount: String(reviewStats.totalReviews),
      bestRating: String(reviewStats.bestRating),
      worstRating: String(reviewStats.worstRating),
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

      {/* Expert CTA */}
      <ExpertHelpCTA />
    </LandingLayout>
  );
}
