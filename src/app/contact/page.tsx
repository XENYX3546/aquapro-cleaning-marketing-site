import { Metadata } from 'next';
import { siteConfig, reviewStats } from '@/lib/constants';
import { LandingLayout } from '@/components/layout';
import { ReviewsSection } from '@/components/ui';
import { ContactInfoCards } from '@/features/contact/server';
import {
  ContactHero,
  ContactMapSection,
  ContactFAQ,
  NeedHelp,
} from '@/features/contact/client';

export const metadata: Metadata = {
  title: `Contact Us | Get a Free Quote | ${siteConfig.name}`,
  description: `Contact ${siteConfig.name} for professional cleaning services in Essex. Get a free, no-obligation quote. Call ${siteConfig.contact.phone} or fill out our online form.`,
  keywords: [
    'contact cleaning services Essex',
    'free cleaning quote',
    'cleaning services near me',
    'Essex cleaning company contact',
    'get a cleaning quote',
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact Us | Get a Free Quote | ${siteConfig.name}`,
    description: `Contact ${siteConfig.name} for professional cleaning services in Essex. Get a free, no-obligation quote.`,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact Us | ${siteConfig.name}`,
    description: `Get a free, no-obligation quote for professional cleaning services in Essex.`,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${siteConfig.name}`,
  description: `Contact page for ${siteConfig.name} - Professional cleaning services in Essex`,
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hyacinths, The Avenue',
      addressLocality: 'North Fambridge',
      addressRegion: 'Essex',
      postalCode: 'CM3 6LZ',
      addressCountry: 'GB',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(reviewStats.averageRating),
      reviewCount: String(reviewStats.totalReviews),
      bestRating: String(reviewStats.bestRating),
      worstRating: String(reviewStats.worstRating),
    },
    areaServed: {
      '@type': 'State',
      name: 'Essex',
    },
  },
};

// Breadcrumb Structured Data
const breadcrumbJsonLd = {
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
      name: 'Contact',
      item: `${siteConfig.url}/contact`,
    },
  ],
};

// FAQ Structured Data for rich snippets
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas do you cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We cover all of Essex and the surrounding counties, including Greater London for commercial contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are quotes free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, 100%. All our quotes are free and come with no obligation to book.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you registered and insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. We hold full public liability insurance up to £5m and employer's liability insurance. Copies of our certificates are available on request.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are your hours of operation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our phone lines are open Monday to Saturday, 8am to 5pm. Our cleaning teams can operate outside these hours for commercial contracts to minimize disruption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you take on commercial work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, a significant portion of our business is commercial. We work with schools, offices, property management companies, and local councils.',
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactHero />
      <ContactInfoCards />
      <ReviewsSection />
      <ContactMapSection />
      <ContactFAQ />
      <NeedHelp />
    </LandingLayout>
  );
}
