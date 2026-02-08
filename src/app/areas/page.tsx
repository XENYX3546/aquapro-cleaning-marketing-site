import { Metadata } from 'next';
import Link from 'next/link';
import { LandingLayout } from '@/components/layout';
import { Container, Section, Icon, AnimatedSection } from '@/components/ui';
import { Breadcrumbs, CrossHubLinks } from '@/components/seo';
import { locations, services, siteConfig, getLocationBySlug, customerStatsDisplay, reviewStats } from '@/lib/constants';
import { ContactSection } from '@/features/home/client';

export const metadata: Metadata = {
  title: `Areas We Cover in Essex & East London | ${siteConfig.name}`,
  description: `Professional cleaning services across ${locations.length}+ locations in Essex and East London. Carpet cleaning, pressure washing, roof cleaning & more. Find your area and get a free quote.`,
  alternates: {
    canonical: `${siteConfig.url}/areas`,
  },
  openGraph: {
    title: `Areas We Cover | ${siteConfig.name}`,
    description: `Professional cleaning services across Essex and East London. ${locations.length}+ locations covered. Find your area and get a free quote.`,
    url: `${siteConfig.url}/areas`,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Areas Covered by ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Areas We Cover | ${siteConfig.name}`,
    description: `Professional cleaning services across ${locations.length}+ locations in Essex and East London. Find your area.`,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

// Regional groupings with only major towns — keeps page useful, not spammy.
// Smaller villages are reachable via individual town pages (nearby areas).
const regions = [
  {
    name: 'Southend & South Essex',
    towns: ['southend-on-sea', 'leigh-on-sea', 'westcliff-on-sea', 'rayleigh', 'rochford', 'hockley', 'shoeburyness'],
  },
  {
    name: 'Basildon & Surroundings',
    towns: ['basildon', 'wickford', 'benfleet', 'canvey-island', 'hadleigh', 'thundersley', 'pitsea'],
  },
  {
    name: 'Billericay & Brentwood',
    towns: ['billericay', 'brentwood', 'shenfield', 'ingatestone', 'hutton'],
  },
  {
    name: 'Chelmsford & Mid Essex',
    towns: ['chelmsford', 'south-woodham-ferrers', 'danbury', 'writtle', 'great-baddow', 'broomfield'],
  },
  {
    name: 'Colchester & North Essex',
    towns: ['colchester', 'wivenhoe', 'west-mersea', 'brightlingsea', 'tiptree', 'dedham', 'stanway'],
  },
  {
    name: 'Tendring & Coast',
    towns: ['clacton-on-sea', 'frinton-on-sea', 'walton-on-the-naze', 'harwich', 'manningtree'],
  },
  {
    name: 'Braintree & Witham',
    towns: ['braintree', 'witham', 'halstead', 'coggeshall', 'kelvedon'],
  },
  {
    name: 'Maldon & Dengie',
    towns: ['maldon', 'burnham-on-crouch', 'heybridge', 'southminster'],
  },
  {
    name: 'Thurrock',
    towns: ['grays', 'stanford-le-hope', 'tilbury', 'south-ockendon', 'chafford-hundred', 'purfleet'],
  },
  {
    name: 'Epping Forest & West Essex',
    towns: ['epping', 'loughton', 'chigwell', 'buckhurst-hill', 'waltham-abbey', 'ongar'],
  },
  {
    name: 'Harlow & North West Essex',
    towns: ['harlow', 'saffron-walden', 'great-dunmow', 'stansted-mountfitchet'],
  },
  {
    name: 'East London',
    towns: ['romford', 'hornchurch', 'upminster', 'ilford', 'woodford', 'stratford', 'walthamstow', 'barking', 'dagenham', 'chingford'],
  },
];

// Simplified JSON-LD — CollectionPage without listing every single location
const areasJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteConfig.url}/areas#webpage`,
  url: `${siteConfig.url}/areas`,
  name: `Areas We Cover | ${siteConfig.name}`,
  description: `Professional cleaning services across ${locations.length}+ locations in Essex and East London`,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
};

// LocalBusiness with area served at county level (not 188 individual cities)
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  url: siteConfig.url,
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Essex',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'East London',
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Hero */}
      <Section className="bg-gradient-to-b from-primary-50 to-neutral-50">
        <Container>
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Areas We Cover' },
                ]}
              />
            </div>
            <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-neutral-900">
              Areas We Cover in Essex
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              <strong>Aquapro Cleaning</strong> provides professional cleaning services across{' '}
              <strong>Essex</strong> and <strong>East London</strong>. From Southend to Saffron
              Walden, Colchester to Romford, our family-run team covers {locations.length}+ towns
              and villages. Every job is fully insured and backed by our 100% satisfaction guarantee.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5">
                <Icon name="star" size={16} className="text-amber-400 fill-amber-400" />
                <strong className="text-neutral-900">{reviewStats.averageRating}</strong> from {reviewStats.totalReviews}+ reviews
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="users" size={16} className="text-primary-600" />
                <strong className="text-neutral-900">{customerStatsDisplay.totalCustomersPlus}</strong> customers served
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="shield-check" size={16} className="text-primary-600" />
                Fully insured
              </span>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Regional Grid */}
      <Section className="bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => {
              const townLocations = region.towns
                .map(slug => getLocationBySlug(slug))
                .filter((loc): loc is NonNullable<ReturnType<typeof getLocationBySlug>> => !!loc);

              return (
                <div
                  key={region.name}
                  className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="map-pin" size={20} className="text-primary-700" />
                    <h2 className="text-lg font-semibold text-neutral-900">
                      {region.name}
                    </h2>
                  </div>

                  <ul className="space-y-2">
                    {townLocations.map((location) => (
                      <li key={location.slug}>
                        <Link
                          href={`/areas/${location.slug}`}
                          className="text-sm text-neutral-700 hover:text-primary-700 transition-colors"
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-neutral-500 mt-8">
            Don&apos;t see your area? We likely still cover it.{' '}
            <Link href="/contact" className="text-primary-700 hover:underline">
              Get in touch
            </Link>{' '}
            or call{' '}
            <a href={siteConfig.contact.phoneHref} className="text-primary-700 hover:underline">
              {siteConfig.contact.phone}
            </a>.
          </p>
        </Container>
      </Section>

      <CrossHubLinks currentHub="areas" variant="section" />

      <ContactSection />
    </LandingLayout>
  );
}
