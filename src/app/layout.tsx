import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { ElfsightConversionTracker } from '@/components/ElfsightConversionTracker';
import './globals.css';
import { siteConfig, reviewStats, services } from '@/lib/constants';
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
    'exterior cleaning Essex',
    'pressure washing',
    'roof cleaning',
    'roof moss removal',
    'biocide treatment',
    'gutter cleaning',
    'driveway cleaning',
    'patio cleaning',
    'professional cleaners',
    'cleaning company Essex',
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
    <html lang="en-GB" className={inter.variable}>
      <head>
        {/* DNS prefetch for faster resolution */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://app.zuviaone.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://app.zuviaone.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to blog image CDN for faster LCP */}
        <link rel="preconnect" href="https://polished-forest-1255.fly.storage.tigris.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://polished-forest-1255.fly.storage.tigris.dev" />
        {/* Structured Data */}
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className="font-sans antialiased text-neutral-900">
        {children}
        <Analytics />
        <ElfsightConversionTracker />

        {/* Google tag (gtag.js) — Google Ads + GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16686011342"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16686011342');
            gtag('config', 'G-0TXRRR3LBG');
            gtag('config', 'AW-16686011342/iX0DCNaWzt0ZEM6nwZQ-', {
              'phone_conversion_number': '01268 225511'
            });
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '387953377712390');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=387953377712390&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
    foundingDate: siteConfig.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hyacinths, The Avenue',
      addressLocality: 'North Fambridge',
      addressRegion: 'Essex',
      postalCode: 'CM3 6LZ',
      addressCountry: 'GB',
    },
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalReviews,
      bestRating: reviewStats.bestRating,
      worstRating: reviewStats.worstRating,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
