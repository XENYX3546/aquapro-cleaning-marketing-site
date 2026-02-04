import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReviewsSection, FAQSection } from '@/components/ui';
import { LandingLayout } from '@/components/layout';
import { RelatedServices, ServiceLocationLinks } from '@/components/seo';
import { getServiceBySlug, getAllServiceSlugs, siteConfig, reviewStats, getServiceSpecificReviews, getAllReviewsForService } from '@/lib/constants';
import {
  ServiceHero,
  ServiceValueProposition,
  ServiceHowItWorks,
  ServiceMobileLeadForm,
  ServiceAbout,
  ServiceGuarantees,
  ServiceStickyCTA,
  ServiceFullWidthCTA,
} from '@/features/services/client';
import { ContactSection } from '@/features/home/client';

type Props = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: {
      canonical: `${siteConfig.url}/services/${service.slug}`,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${siteConfig.url}/services/${service.slug}`,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_GB',
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo.title,
      description: service.seo.description,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

// JSON-LD Structured Data for Service
function generateServiceSchema(service: ReturnType<typeof getServiceBySlug>) {
  if (!service) {return null;}

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      url: siteConfig.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'North Fambridge',
        addressRegion: 'Essex',
        postalCode: 'CM3 6LZ',
        addressCountry: 'GB',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(reviewStats.averageRating),
        reviewCount: String(reviewStats.totalReviews),
        bestRating: String(reviewStats.bestRating),
        worstRating: String(reviewStats.worstRating),
      },
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.6356,
        longitude: 0.6756,
      },
      geoRadius: '50000',
    },
  };
}

function generateFAQSchema(service: ReturnType<typeof getServiceBySlug>) {
  if (!service || !service.faqs || service.faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function generateBreadcrumbSchema(service: { name: string; id: string }) {
  return {
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
        item: `${siteConfig.url}/services/${service.id}`,
      },
    ],
  };
}

export default async function ServicePage({ params }: Props) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = generateServiceSchema(service);
  const breadcrumbJsonLd = generateBreadcrumbSchema(service);
  const faqJsonLd = generateFAQSchema(service);

  return (
    <LandingLayout>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ServiceHero service={service} />
      <ServiceValueProposition service={service} />
      <ReviewsSection
        reviews={getServiceSpecificReviews(service.id)}
        moreReviews={getAllReviewsForService(service.id)}
        tagline={`${service.shortName} Reviews`}
        title={<>What Our <span className="text-brand-500">{service.name}</span> Customers Say</>}
        subtitle={`Real reviews from Essex homeowners who used our ${service.name.toLowerCase()} service.`}
      />
      <ServiceHowItWorks service={service} />

      {/* Mobile-only Lead Form after process */}
      <ServiceMobileLeadForm service={service} />

      <ServiceAbout service={service} />
      <ServiceGuarantees service={service} />

      {/* Contact Section */}
      <ContactSection serviceId={service.id} />

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQSection
          faqs={service.faqs}
          tagline={`${service.shortName} FAQs`}
          title={<>Frequently Asked <span className="text-brand-500">Questions</span></>}
        />
      )}

      {/* Full Width CTA */}
      <ServiceFullWidthCTA service={service} />

      {/* Related services from same cluster */}
      <RelatedServices currentServiceId={service.id} />

      {/* Service available in locations */}
      <ServiceLocationLinks service={service} />

      <ServiceStickyCTA service={service} />
    </LandingLayout>
  );
}
