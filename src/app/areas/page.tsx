import { Metadata } from 'next';
import Link from 'next/link';
import { LandingLayout } from '@/components/layout';
import { Container, Section, Icon, AnimatedSection } from '@/components/ui';
import { Breadcrumbs, CrossHubLinks } from '@/components/seo';
import { locations, services, siteConfig } from '@/lib/constants';
import { ContactSection } from '@/features/home/client';
import { CTASection } from '@/features/home/server';

// Comprehensive metadata for areas hub page
export const metadata: Metadata = {
  title: `Areas We Cover in Essex | Service Locations | ${siteConfig.name}`,
  description: `Professional cleaning services across Essex and surrounding areas. We cover ${locations.slice(0, 8).map(l => l.name).join(', ')} and 30+ more locations. Carpet, roof, pressure washing & window cleaning.`,
  keywords: [
    'cleaning services near me',
    'cleaning services Essex',
    'cleaners in Essex',
    ...locations.slice(0, 10).map(l => `cleaning services ${l.name}`),
    'local cleaning company Essex',
    'Essex cleaning coverage',
  ],
  alternates: {
    canonical: `${siteConfig.url}/areas`,
  },
  openGraph: {
    title: `Areas We Cover | Cleaning Services Across Essex | ${siteConfig.name}`,
    description: `We provide professional cleaning services throughout Essex. ${locations.length}+ locations covered. Find your area and get a free quote.`,
    url: `${siteConfig.url}/areas`,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Areas Covered by ${siteConfig.name} in Essex`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Areas We Cover | ${siteConfig.name}`,
    description: `Professional cleaning services across ${locations.length}+ locations in Essex. Find your area.`,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

// JSON-LD for areas collection page
const areasCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteConfig.url}/areas#webpage`,
  url: `${siteConfig.url}/areas`,
  name: `Areas We Cover | ${siteConfig.name}`,
  description: `Professional cleaning services across ${locations.length}+ locations in Essex and surrounding areas`,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@type': 'ItemList',
    name: 'Service Areas',
    numberOfItems: locations.length,
    itemListElement: locations.slice(0, 20).map((location, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Place',
        name: location.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.name,
          addressRegion: location.county,
          addressCountry: 'GB',
        },
        url: `${siteConfig.url}/areas/${location.slug}`,
      },
    })),
  },
};

// Service area schema
const serviceAreaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  url: siteConfig.url,
  areaServed: locations.map(location => ({
    '@type': 'City',
    name: location.name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: location.county,
    },
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
      },
    })),
  },
};

export default function AreasPage() {
  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasCollectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaJsonLd) }}
      />
      <Section className="bg-gradient-to-b from-primary-50 to-neutral-50">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Areas We Cover' },
            ]}
          />

          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-neutral-900">
              Areas We Cover
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              We provide professional cleaning services throughout Essex and surrounding areas.
              Find your location below to see the services available in your area.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.slug}
                className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="map-pin" size={20} className="text-primary-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {location.name}
                  </h2>
                </div>

                {location.postcodeAreas && (
                  <p className="text-sm text-neutral-500 mb-4">
                    Covering: {location.postcodeAreas.join(', ')}
                  </p>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-700">Services available:</p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/${service.slug}/${location.slug}`}
                        className="text-xs px-2 py-1 bg-white rounded border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
                      >
                        {service.shortName}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* All Services by Area - Additional internal links */}
      <Section className="bg-neutral-50">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-neutral-900">
              Browse by Service
            </h2>
            <p className="mt-4 text-neutral-600">
              Find your service in your area
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {services.map((service) => (
              <div key={service.slug}>
                <h3 className="text-[1.25rem] md:text-[1.375rem] font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Icon
                    name={service.icon as Parameters<typeof Icon>[0]['name']}
                    size={20}
                    className="text-primary-600"
                  />
                  {service.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/${service.slug}/${location.slug}`}
                      className="text-sm px-3 py-1.5 bg-white rounded-full border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CrossHubLinks currentHub="areas" variant="section" />

      <ContactSection />
      <CTASection />
    </LandingLayout>
  );
}
