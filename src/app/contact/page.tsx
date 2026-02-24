import { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';
import { LandingLayout } from '@/components/layout';
import { ReviewsSection, ExpertHelpCTA } from '@/components/ui';
import { ContactInfoCards } from '@/features/contact/server';
import {
  ContactHero,
  ContactMapSection,
  ContactFAQ,
} from '@/features/contact/client';

export const metadata: Metadata = {
  title: `Contact ${siteConfig.name} | Free Quote | Essex Cleaning Services`,
  description: `Contact Aquapro Cleaning for a free, no-obligation quote. Call ${siteConfig.contact.phone} or use our online form. Professional exterior cleaning services across Essex and East London.`,
  keywords: [
    'contact Aquapro Cleaning',
    'Aquapro Cleaning phone number',
    'Aquapro Cleaning email',
    'free cleaning quote Essex',
    'cleaning services near me',
    'Essex cleaning company contact',
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact ${siteConfig.name} | Free Quote | Essex Cleaning Services`,
    description: `Contact Aquapro Cleaning for a free, no-obligation quote. Professional exterior cleaning services across Essex and East London.`,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact ${siteConfig.name} | Free Quote`,
    description: `Contact Aquapro Cleaning for a free, no-obligation quote. Professional cleaning services across Essex.`,
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
    '@id': `${siteConfig.url}/#organization`,
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

// FAQ Structured Data for rich snippets — all 10 FAQs
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas do you cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aquapro Cleaning covers all of Essex and the surrounding counties, including Greater London for commercial contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the quoting process work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply fill out the online form with your details. For most standard jobs, we can provide a price immediately or within the hour. For larger commercial projects, a site visit may be required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are quotes free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, 100%. All quotes are free and come with no obligation to book.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you registered and insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. Aquapro Cleaning holds full public liability insurance up to £5m and employer's liability insurance. Copies of certificates are available on request.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are your hours of operation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our phone lines are open Monday to Saturday, 8am to 5pm. Cleaning teams can operate outside these hours for commercial contracts to minimise disruption.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit/debit cards, bank transfers (BACS), and cash. Payment is typically due upon completion of the work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you take away waste?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Aquapro Cleaning removes all moss, debris, and waste resulting from the cleaning process. We are licensed waste carriers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you take on commercial work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, a significant portion of our business is commercial. We work with schools, offices, property management companies, and local councils across Essex.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your staff certified or licensed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All technicians are fully trained, vetted, and wear full uniform. Aquapro Cleaning is certified for working at heights and uses professional-grade equipment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with historic or delicate buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. We use Soft Wash technology for delicate surfaces like render, historic stone, and older roofs, which cleans effectively without the risk of high-pressure damage.",
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
      <ExpertHelpCTA variant="scroll" />
    </LandingLayout>
  );
}
