import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LandingLayout } from '@/components/layout';
import { Container, Section, Icon, AnimatedSection, Card, ReviewsSection } from '@/components/ui';
import { Breadcrumbs, ServiceAreaMap } from '@/components/seo';
import {
  services,
  locations,
  getLocationBySlug,
  getNearbyLocations,
  siteConfig,
  ctaLinks,
  reviewStats,
  getReviewsForLocation,
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 rounded-full mb-6">
                <Icon name="map-pin" size={18} className="text-brand-600" />
                <span className="text-sm font-semibold text-brand-700">
                  {location.postcodeAreas?.join(', ') || location.county}
                </span>
              </div>

              <h1 className="text-[2rem] md:text-[2.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                {isCounty ? 'Professional ' : ''}Cleaning Services
                <span className="block text-brand-500">{isCounty ? `Across ${location.name}` : `in ${location.name}`}</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                {isCounty
                  ? `Expert carpet cleaning, pressure washing, roof moss removal, gutter cleaning & more ${location.localHook}. Serving all major towns including Chelmsford, Southend, Colchester & Basildon.`
                  : `Professional carpet, pressure washing, roof, window & sofa cleaning ${location.localHook}. Fully insured, 5-star rated.`
                }
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href={ctaLinks.quote}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-cta hover:bg-cta-hover text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Your Free Quote
                  <Icon name="arrow-right" size={16} />
                </Link>
                <a
                  href={ctaLinks.call}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Icon name="phone" size={18} className="text-slate-700" />
                  </div>
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>

              {/* Trust strip */}
              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Icon name="star" size={18} className="text-amber-400 fill-amber-400" />
                    {reviewStats.averageRating} Rated
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="shield-check" size={18} className="text-brand-600" />
                    Fully Insured
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="users" size={18} className="text-brand-600" />
                    {isCounty ? `Covering All ${location.name}` : `Local ${location.county} Business`}
                  </span>
                </div>
              </div>
            </div>

            {/* Right column - Hero Image */}
            <div className="hidden lg:block">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/roof-clean-before-after-single-image.jpg"
                  alt={`Professional cleaning services in ${location.name}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Available */}
      <Section className="bg-white">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3 block">
              Available Services
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Services in <span className="text-brand-500">{location.name}</span>
            </h2>
            <p className="mt-4 text-slate-600">
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
                  <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors shadow-sm">
                    <Icon
                      name={service.icon as Parameters<typeof Icon>[0]['name']}
                      size={28}
                      className="text-brand-600"
                    />
                  </div>
                  <h3 className="text-[1.25rem] md:text-[1.375rem] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-slate-600 text-base">
                    {service.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 flex items-center gap-1">
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

      {/* Reviews Section */}
      <ReviewsSection
        reviews={(() => {
          const locationReviews = getReviewsForLocation(location.slug);
          return locationReviews.length > 0 ? locationReviews : getAllReviews();
        })()}
        moreReviews={getAllReviews()}
        locationSlug={location.slug}
        variant="slate"
        tagline="Customer Reviews"
        title={<>What Our <span className="text-brand-500">Customers</span> Say</>}
        subtitle={`Real reviews from homeowners across Essex who used our cleaning services.`}
      />

      {/* Nearby Areas with Map Background */}
      <Section className="relative overflow-hidden min-h-[300px]">
        {/* Lazy-loaded Map Background */}
        <ServiceAreaMap location={location} serviceName="Cleaning" asBackground />
        <div className="absolute inset-0 bg-white/80 z-[1]" />

        <Container className="relative z-[2]">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              {isCounty ? `Towns & Cities in ${location.name}` : `More Services in ${location.name}`}
            </h3>
            <p className="text-slate-600">
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
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors shadow-sm border border-slate-200"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          )}

          {!isCounty && location.postcodeAreas && location.postcodeAreas.length > 0 && (
            <div className="max-w-md mx-auto p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Postcodes covered:</span>{' '}
                {location.postcodeAreas.join(', ')}
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Contact Section */}
      <ContactSection />
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

