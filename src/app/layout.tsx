import { Analytics } from '@vercel/analytics/next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig, reviewStats } from '@/lib/constants';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb', // primary-600
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Professional Cleaning Services in Essex`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'cleaning services Essex',
    'carpet cleaning',
    'professional carpet cleaners',
    'carpet stain removal',
    'rug cleaning',
    'sofa cleaning',
    'upholstery cleaning',
    'couch cleaning',
    'pressure washing',
    'roof cleaning',
    'roof moss removal',
    'biocide treatment',
    'window cleaning',
    'professional cleaners',
    'cleaning company Essex',
    'driveway cleaning',
    'patio cleaning',
    'deep cleaning',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Professional Cleaning Services in Essex`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Professional Cleaning Services`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Professional Cleaning Services in Essex`,
    description: siteConfig.description,
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
  category: 'local business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* DNS prefetch for faster resolution */}
        <link rel="dns-prefetch" href="https://app.zuviaone.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://app.zuviaone.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data */}
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className="font-sans antialiased text-neutral-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.png`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.5656,
        longitude: 0.4545,
      },
      geoRadius: '50000',
    },
    serviceArea: {
      '@type': 'Place',
      name: 'Essex, United Kingdom',
    },
    priceRange: '££',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(reviewStats.averageRating),
      reviewCount: String(reviewStats.totalReviews),
      bestRating: String(reviewStats.bestRating),
      worstRating: String(reviewStats.worstRating),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Carpet & Rug Cleaning',
            description: 'Professional carpet cleaning with hot water extraction. Stain removal, pet odour elimination, free stain protection.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pressure Washing',
            description: 'High-pressure cleaning for driveways, patios, and decking',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Roof Cleaning & Moss Removal',
            description: 'Professional roof moss removal with biocide treatment. Manual scraping and soft washing for all tile types.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Window Cleaning',
            description: 'Crystal clear window cleaning using pure water technology',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sofa & Upholstery Cleaning',
            description: 'Professional sofa cleaning, couch cleaning, and fabric furniture cleaning',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-GB',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
