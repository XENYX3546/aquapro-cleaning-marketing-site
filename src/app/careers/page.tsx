import { Metadata } from 'next';
import { siteConfig, jobs } from '@/lib/constants';
import { CareersPageClient } from './CareersPageClient';

// SEO Metadata
export const metadata: Metadata = {
  title: `Careers | Join Our Team | ${siteConfig.name}`,
  description: `Join Essex's fastest-growing cleaning company. We're hiring exterior cleaning specialists. Competitive pay, training, and benefits. Apply today!`,
  keywords: [
    'cleaning jobs Essex',
    'exterior cleaning careers',
    'pressure washing jobs',
    'roof cleaning jobs',
    'cleaning technician jobs',
    'Aquapro careers',
    'cleaning company jobs Essex',
    'roof cleaning jobs',
    'commercial cleaning jobs',
  ],
  alternates: {
    canonical: `${siteConfig.url}/careers`,
  },
  openGraph: {
    title: `Careers at ${siteConfig.name} | Join Our Growing Team`,
    description: `We're hiring! Join Essex's premier cleaning company. Competitive salaries, excellent training, and great benefits. View open positions.`,
    url: `${siteConfig.url}/careers`,
    siteName: siteConfig.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/images/careers-og.jpg`,
        width: 1200,
        height: 630,
        alt: `Careers at ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Careers at ${siteConfig.name}`,
    description: `Join Essex's fastest-growing cleaning company. View open positions and apply today!`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for Job Postings
function generateJobPostingSchema() {
  return jobs.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: new Date().toISOString().split('T')[0],
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Part-time' ? 'PART_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.split(',')[0],
        addressRegion: 'Essex',
        addressCountry: 'GB',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'GBP',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'YEAR',
      },
    },
    skills: job.requirements.join(', '),
    industry: 'Cleaning Services',
  }));
}

function CareersStructuredData() {
  const jobPostings = generateJobPostingSchema();

  return (
    <>
      {jobPostings.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
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
        name: 'Careers',
        item: `${siteConfig.url}/careers`,
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

export default function CareersPage() {
  return (
    <>
      <CareersStructuredData />
      <BreadcrumbStructuredData />
      <CareersPageClient />
    </>
  );
}
