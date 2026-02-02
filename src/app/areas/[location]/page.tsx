import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LandingLayout } from '@/components/layout';
import { Container, Section, Button, Icon, AnimatedSection, Card } from '@/components/ui';
import { Breadcrumbs, ServiceAreaMap } from '@/components/seo';
import {
  services,
  locations,
  getLocationBySlug,
  getNearbyLocations,
  siteConfig,
  ctaLinks,
  reviewStats,
  getAllReviews,
} from '@/lib/constants';
import { ContactSection } from '@/features/home/client';

type PageProps = {
  params: Promise<{
    location: string;
  }>;
};

// Generate all location pages at build time
export async function generateStaticParams() {
  return locations.map((location) => ({
    location: location.slug,
  }));
}

// Generate metadata for each location page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return { title: 'Location Not Found' };
  }

  // Different metadata for county-level vs town-level pages
  const isCounty = location.isCounty;
  const title = isCounty
    ? `Cleaning Services in ${location.name} | Professional Cleaners | ${siteConfig.name}`
    : `Cleaning Services in ${location.name} | ${siteConfig.name}`;
  const description = isCounty
    ? `Professional cleaning services across ${location.name}. Carpet cleaning, pressure washing, roof moss removal, gutter cleaning & more. Serving Chelmsford, Southend, Colchester, Basildon & all ${location.name} towns. Free quotes!`
    : `Professional cleaning services in ${location.name}, ${location.county}. Carpet cleaning, pressure washing, roof cleaning, window cleaning & sofa cleaning. Fully insured, 5-star rated.`;

  const keywords = isCounty
    ? [
        `cleaning services ${location.name}`,
        `carpet cleaning ${location.name}`,
        `professional carpet cleaners ${location.name}`,
        `rug cleaning ${location.name}`,
        `pressure washing ${location.name}`,
        `roof cleaning ${location.name}`,
        `roof moss removal ${location.name}`,
        `cleaners ${location.name}`,
        `professional cleaning ${location.name}`,
      ]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteConfig.url}/areas/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/areas/${location.slug}`,
      siteName: siteConfig.name,
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Cleaning Services in ${location.name} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const nearbyLocations = getNearbyLocations(location);
  const isCounty = location.isCounty;

  // For county pages, show all towns; for town pages, show nearby areas
  const linkedLocations = isCounty
    ? locations.filter((loc) => !loc.isCounty) // All towns for county page
    : nearbyLocations;

  return (
    <LandingLayout>
      <LocationSchema location={location} />

      {/* Hero Section */}
      <Section className="bg-white pt-4 pb-16 md:pb-24">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Areas', href: '/areas' },
              { label: location.name },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
            {/* Left column - Content */}
            <div className="animate-hero-stagger">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-6">
                <Icon name="map-pin" size={18} className="text-primary-700" />
                <span className="text-sm font-semibold text-primary-700">
                  {location.postcodeAreas?.join(', ') || location.county}
                </span>
              </div>

              <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-neutral-900 tracking-tight leading-[1.1]">
                {isCounty ? 'Professional ' : ''}Cleaning Services
                <span className="block text-primary-700">{isCounty ? `Across ${location.name}` : `in ${location.name}`}</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-neutral-500 max-w-xl leading-relaxed">
                {isCounty
                  ? `Expert carpet cleaning, pressure washing, roof moss removal, gutter cleaning & more ${location.localHook}. Serving all major towns including Chelmsford, Southend, Colchester & Basildon.`
                  : `Professional carpet, pressure washing, roof, window & sofa cleaning ${location.localHook}. Fully insured, 5-star rated.`
                }
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Button href={ctaLinks.quote} size="lg">
                  Get Your Free Quote
                </Button>
                <a
                  href={ctaLinks.call}
                  className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    <Icon name="phone" size={18} className="text-neutral-700" />
                  </div>
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>

              {/* Trust strip */}
              <div className="mt-10 pt-6 border-t border-neutral-100">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500">
                  <span className="flex items-center gap-2">
                    <Icon name="star" size={18} className="text-amber-400 fill-amber-400" />
                    {reviewStats.averageRating} Rated
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="shield-check" size={18} className="text-primary-700" />
                    Fully Insured
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="users" size={18} className="text-primary-700" />
                    {isCounty ? `Covering All ${location.name}` : `Local ${location.county} Business`}
                  </span>
                </div>
              </div>
            </div>

            {/* Right column - Image placeholder */}
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-primary-300">
                  <Icon name="map-pin" size={64} className="mx-auto mb-4" />
                  <p className="text-sm font-medium">{location.name} Image</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Available */}
      <Section className="bg-white">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-neutral-900">
              Our Services in {location.name}
            </h2>
            <p className="mt-4 text-neutral-600">
              Click a service to learn more and get a free quote
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}/${location.slug}`}
                className="block"
              >
                <Card hover className="h-full group">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <Icon
                      name={service.icon as Parameters<typeof Icon>[0]['name']}
                      size={28}
                      className="text-primary-700"
                    />
                  </div>
                  <h3 className="text-[1.25rem] md:text-[1.375rem] font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-neutral-600 text-base">
                    {service.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-700 flex items-center gap-1">
                      {service.name} in {location.name}
                      <Icon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Review */}
      <FeaturedReview />

      {/* Nearby Areas with Map Background */}
      <Section className="relative overflow-hidden min-h-[300px]">
        {/* Lazy-loaded Map Background */}
        <ServiceAreaMap location={location} serviceName="Cleaning" asBackground />
        <div className="absolute inset-0 bg-white/80 z-[1]" />

        <Container className="relative z-[2]">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              {isCounty ? `Towns & Cities in ${location.name}` : `More Services in ${location.name}`}
            </h3>
            <p className="text-neutral-600">
              {isCounty
                ? `We provide professional cleaning services across all of ${location.name}`
                : `Serving ${location.name} and nearby areas in ${location.county}`
              }
            </p>
          </div>

          {linkedLocations.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {linkedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/areas/${loc.slug}`}
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm border border-neutral-200"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          )}

          {!isCounty && location.postcodeAreas && location.postcodeAreas.length > 0 && (
            <div className="max-w-md mx-auto p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200 text-center">
              <p className="text-sm text-neutral-600">
                <span className="font-semibold text-neutral-800">Postcodes covered:</span>{' '}
                {location.postcodeAreas.join(', ')}
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Contact Section */}
      <ContactSection />

      {/* CTA Section */}
      <Section className="bg-primary-600">
        <Container>
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-white">
              Need Cleaning Services in {location.name}?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Get a free, no-obligation quote today. We&apos;re local, fully insured,
              and committed to exceptional results.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={ctaLinks.quote}
                size="lg"
                className="bg-white text-primary-700 hover:bg-neutral-100"
              >
                Get a Free Quote
              </Button>
              <Button
                href={ctaLinks.call}
                variant="ghost"
                size="lg"
                className="ring-2 ring-inset ring-white text-white hover:bg-white/10"
              >
                <Icon name="phone" size={18} className="mr-2" />
                {siteConfig.contact.phone}
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </LandingLayout>
  );
}

function LocationSchema({ location }: { location: ReturnType<typeof getLocationBySlug> }) {
  if (!location) {
    return null;
  }

  const isCounty = location.isCounty;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${siteConfig.name}${isCounty ? '' : ` - ${location.name}`}`,
    description: isCounty
      ? `Professional cleaning services across ${location.name} county`
      : `Professional cleaning services in ${location.name}, ${location.county}`,
    url: `${siteConfig.url}/areas/${location.slug}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    areaServed: isCounty
      ? {
          '@type': 'AdministrativeArea',
          name: location.name,
          containedInPlace: {
            '@type': 'Country',
            name: 'United Kingdom',
          },
        }
      : {
          '@type': 'City',
          name: location.name,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: location.county,
          },
        },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          url: `${siteConfig.url}/${service.slug}/${location.slug}`,
        },
      })),
    },
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FeaturedReview() {
  // Get top priority review (real verified Google review)
  const topReview = getAllReviews().find(r => r.priority) || getAllReviews()[0];

  if (!topReview) {
    return null;
  }

  return (
    <Section className="bg-primary-50 border-y border-primary-100">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium text-primary-700 mb-3">
            Verified Google Review
          </p>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={20} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl text-neutral-800">
            &ldquo;{topReview.text.length > 200 ? topReview.text.slice(0, 200).trim() + '...' : topReview.text}&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-neutral-900">
            {topReview.name}
          </p>
          {topReview.reviewer.isLocalGuide && (
            <p className="text-sm text-primary-700 mt-1">Local Guide</p>
          )}
        </div>
      </Container>
    </Section>
  );
}
