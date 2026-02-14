import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReviewsSection, FAQSection } from '@/components/ui';
import { LandingLayout } from '@/components/layout';
import { ServiceCrossLinks } from '@/components/seo';
import {
  services,
  locations,
  getLocationBySlug,
  siteConfig,
  reviewStats,
  reviewStatsDisplay,
  getReviewsForServiceAndLocation,
  getAllReviewsForService,
  type Service,
  type Location,
  type ServiceId,
  getServiceKeywords,
  getLocationProfile,
} from '@/lib/constants';
import {
  ServiceHero,
  ServiceValueProposition,
  ServiceHowItWorks,
  ServiceMobileLeadForm,
  ServiceAbout,
  ServiceGuarantees,
  ServiceStickyCTA,
  ServiceFullWidthCTA,
  RugCleaningSection,
} from '@/features/services/client';
import { ContactSection } from '@/features/home/client';

type PageProps = {
  params: Promise<{
    service: string;
    location: string;
  }>;
};

export async function generateStaticParams() {
  const params: { service: string; location: string }[] = [];

  for (const service of services) {
    for (const location of locations) {
      params.push({ service: service.slug, location: location.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug } = await params;

  const service = services.find((s) => s.slug === serviceSlug);
  const location = getLocationBySlug(locationSlug);

  if (!service || !location) {
    return { title: 'Page Not Found' };
  }

  const isCounty = location.isCounty;
  const seoKeywords = getServiceKeywords(service.slug);
  const primary = seoKeywords.primary;
  const v0 = (seoKeywords.variations[0] ?? primary).toLowerCase();

  const title = isCounty
    ? `${primary} ${location.name} | Professional ${primary} Services | ${siteConfig.name}`
    : `${primary} ${location.name} | ${siteConfig.name}`;
  const description = isCounty
    ? `Professional ${primary.toLowerCase()} services across ${location.name}. ${service.benefits[0]}. Serving Chelmsford, Southend, Colchester, Basildon & all ${location.name} towns. Fully insured, ${reviewStatsDisplay.starRating} rated. Free quotes!`
    : `Expert ${primary.toLowerCase()} services ${location.name}, ${location.county}. ${service.benefits[0]}. Local ${location.county} team, fully insured with ${reviewStatsDisplay.starRating} rating. Free quotes - call today!`;
  const keywords = isCounty
    ? [
        `${primary.toLowerCase()} ${location.name}`,
        `${v0} services ${location.name}`,
        `professional ${primary.toLowerCase()} ${location.name}`,
        `best ${v0} ${location.name}`,
        `${primary.toLowerCase()} company ${location.name}`,
        `${location.name} ${v0}`,
      ]
    : [
        `${primary.toLowerCase()} ${location.name}`,
        `${v0} ${location.county}`,
        `${primary.toLowerCase()} near me`,
        `professional ${v0} ${location.name}`,
        `best ${primary.toLowerCase()} ${location.county}`,
        `${location.name} cleaning services`,
      ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteConfig.url}/${service.slug}/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${service.slug}/${location.slug}`,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_GB',
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${primary} ${location.name} - ${siteConfig.name}`,
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

// JSON-LD Structured Data
function generateSchemas(service: Service, location: Location, allFaqs: { question: string; answer: string }[]) {
  const isCounty = location.isCounty;
  const primary = getServiceKeywords(service.slug).primary;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${primary} ${location.name}`,
    url: `${siteConfig.url}/${service.slug}/${location.slug}`,
    description: isCounty
      ? `Professional ${primary.toLowerCase()} services across ${location.name} county`
      : `Professional ${primary.toLowerCase()} services ${location.name}, ${location.county}`,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: isCounty
      ? {
          '@type': 'AdministrativeArea',
          name: location.name,
          containedInPlace: { '@type': 'Country', name: 'United Kingdom' },
        }
      : {
          '@type': 'City',
          name: location.name,
          containedInPlace: { '@type': 'AdministrativeArea', name: location.county },
        },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(reviewStats.averageRating),
      reviewCount: String(reviewStats.totalReviews),
      bestRating: String(reviewStats.bestRating),
      worstRating: String(reviewStats.worstRating),
    },
  };

  const breadcrumbSchema = {
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
        name: 'Services',
        item: `${siteConfig.url}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${primary} ${location.name}`,
        item: `${siteConfig.url}/${service.slug}/${location.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${primary} ${location.name}`,
    url: `${siteConfig.url}/${service.slug}/${location.slug}`,
    datePublished: siteConfig.contentFirstPublished,
    dateModified: siteConfig.contentLastUpdated,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema };
}

function getLocationFAQs(service: Service, location: Location) {
  const primary = getServiceKeywords(service.slug).primary;
  const profile = getLocationProfile(location);
  const nearbyNames = location.nearbyAreas
    .slice(0, 4)
    .map((slug) => getLocationBySlug(slug)?.name)
    .filter(Boolean);

  const faqs: { question: string; answer: string }[] = [
    {
      question: `Do you cover ${location.name} for ${primary.toLowerCase()}?`,
      answer: `Yes — we work ${location.localHook}${nearbyNames.length > 0 ? ` and also cover ${nearbyNames.join(', ')}` : ''}. Same team, same equipment, same fixed pricing wherever you are in ${location.county}.`,
    },
  ];

  // Uses profile.commonProblems which falls back to archetype defaults — every location gets this FAQ
  if (profile.commonProblems.length > 0) {
    const [first, ...rest] = profile.commonProblems;
    faqs.push({
      question: `Why do ${location.name} homes need ${primary.toLowerCase()}?`,
      answer: `The area is known for ${first}${rest.length > 0 ? `, along with ${rest.join(' and ')}` : ''}. Left untreated these get worse over time — a professional ${primary.toLowerCase()} sorts it in one visit.`,
    });
  }

  // "Near me" FAQ — targets local search intent
  faqs.push({
    question: `Where can I find ${primary.toLowerCase()} near me in ${location.name}?`,
    answer: `${siteConfig.name} is a local, family-run ${primary.toLowerCase()} company covering all of ${location.name}${location.postcodeAreas && location.postcodeAreas.length > 0 ? ` including ${location.postcodeAreas.join(', ')} postcodes` : ''}. We bring professional, truck-mounted equipment directly to your door — no need to travel or drop off. Book online or call for a free, no-obligation quote.`,
  });

  return faqs;
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service: serviceSlug, location: locationSlug } = await params;

  // First, check if this is a known service/location (fast, no API calls)
  const service = services.find((s) => s.slug === serviceSlug);
  const location = getLocationBySlug(locationSlug);

  // If it's a valid service/location, render service page (skip blog API check)
  if (service && location) {
    const locationFaqs = getLocationFAQs(service, location);
    const allFaqs = [...locationFaqs, ...service.faqs];
    const { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema } = generateSchemas(service, location, allFaqs);

    return (
      <LandingLayout>
        <article>
          <ServiceHero service={service} location={location} />
          <ServiceValueProposition service={service} location={location} />
          <ReviewsSection
            reviews={getReviewsForServiceAndLocation(service.id as ServiceId, location.slug)}
            moreReviews={getAllReviewsForService(service.id)}
            locationSlug={location.slug}
            tagline={`${service.shortName} Reviews`}
            title={<>Loved by <span className="text-brand-500">{location.name}</span> Locals</>}
            subtitle={`Real reviews from ${location.name} homeowners who used ${siteConfig.name} for ${getServiceKeywords(service.slug).variations[5]?.toLowerCase() ?? service.name.toLowerCase()}.`}
          />
          <ServiceHowItWorks service={service} location={location} />
          {service.slug === 'carpet-cleaning' && <RugCleaningSection location={location} />}
          <ServiceMobileLeadForm service={service} location={location} />
          <ServiceAbout service={service} location={location} />
          <ServiceGuarantees service={service} location={location} />

          {/* Contact Section */}
          <ContactSection serviceId={service.id} />

          {/* FAQ Section */}
          {allFaqs.length > 0 && (
            <FAQSection
              faqs={allFaqs}
              tagline={`${service.shortName} FAQs`}
              title={<>Frequently Asked <span className="text-brand-500">Questions</span></>}
            />
          )}

          {/* Full Width CTA */}
          <ServiceFullWidthCTA service={service} location={location} />
        </article>

        {/* Cross-links & nearby areas — aside for semantic separation */}
        <aside>
          <ServiceCrossLinks
            location={location}
            currentServiceId={service.id}
            service={service}
            variant="full"
          />
        </aside>

        <ServiceStickyCTA service={service} location={location} />

        {/* JSON-LD structured data — placed after content so first meaningful tokens appear earlier in DOM */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema, webPageSchema]) }}
        />
      </LandingLayout>
    );
  }

  // Not a valid service/location
  notFound();
}

