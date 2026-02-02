import { Metadata } from 'next';
import { LandingLayout } from '@/components/layout';
import { CommercialBanner, ReviewsSection, FAQSection, ExpertHelpCTA } from '@/components/ui';
import {
  HeroSection,
  ServicesSection,
  ContactSection,
} from '@/features/home/client';
import {
  AboutSection,
  HowItWorks,
  BlogSection,
} from '@/features/home/server';
import { siteConfig, services } from '@/lib/constants';

// Comprehensive homepage metadata for SEO
export const metadata: Metadata = {
  title: `Professional Cleaning Services in Essex | ${siteConfig.name}`,
  description: `${siteConfig.name} offers professional interior and exterior cleaning services across Essex. Carpet cleaning, roof cleaning, pressure washing, window cleaning & more. Fully insured, 5-star rated. Get a free quote today!`,
  keywords: [
    'cleaning services Essex',
    'professional cleaners Essex',
    'carpet cleaning Essex',
    'professional carpet cleaners',
    'carpet stain removal',
    'rug cleaning Essex',
    'roof cleaning Essex',
    'roof moss removal Essex',
    'moss removal service',
    'pressure washing Essex',
    'window cleaning Essex',
    'gutter cleaning Essex',
    'sofa cleaning Essex',
    'upholstery cleaning Essex',
    'couch cleaning Essex',
    'exterior cleaning Essex',
    'interior cleaning Essex',
    'commercial cleaning Essex',
    'residential cleaning Essex',
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `Professional Cleaning Services in Essex | ${siteConfig.name}`,
    description: `Essex's trusted cleaning experts. Interior & exterior cleaning services for homes and businesses. Fully insured, 5-star rated. Free quotes available.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Professional Cleaning Services in Essex`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional Cleaning Services in Essex | ${siteConfig.name}`,
    description: `Essex's trusted cleaning experts. Interior & exterior cleaning for homes and businesses. Free quotes available.`,
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Homepage JSON-LD structured data
const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteConfig.url}/#webpage`,
  url: siteConfig.url,
  name: `Professional Cleaning Services in Essex | ${siteConfig.name}`,
  description: siteConfig.description,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@id': `${siteConfig.url}/#organization`,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/og-image.png`,
  },
};

// Service catalog for homepage
const servicesCatalogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cleaning Services',
  description: 'Professional cleaning services offered by Aquapro Cleaning in Essex',
  numberOfItems: services.length,
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.name,
      description: service.description,
      url: `${siteConfig.url}/services/${service.slug}`,
      provider: {
        '@type': 'LocalBusiness',
        name: siteConfig.name,
      },
    },
  })),
};

export default function HomePage() {
  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesCatalogJsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <CommercialBanner />
      <ReviewsSection />
      <AboutSection />
      <HowItWorks />
      <BlogSection />
      <ContactSection />
      <FAQSection />
      <ExpertHelpCTA />
    </LandingLayout>
  );
}
