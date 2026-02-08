import { Metadata } from 'next';
import Link from 'next/link';
import { LandingLayout } from '@/components/layout';
import { Container, Section, Card, Icon, AnimatedSection } from '@/components/ui';
import { Breadcrumbs, ServiceClusterNav, CrossHubLinks } from '@/components/seo';
import { services, siteConfig, type Service } from '@/lib/constants';
import { ContactSection } from '@/features/home/client';

// Comprehensive metadata for services hub page
export const metadata: Metadata = {
  title: `Professional Cleaning Services | Interior & Exterior | ${siteConfig.name}`,
  description: `Explore our professional cleaning services in Essex. Carpet cleaning, sofa & upholstery cleaning, pressure washing, roof cleaning, gutter cleaning & window cleaning. Fully insured, 5-star rated. Free quotes.`,
  keywords: [
    'cleaning services Essex',
    'carpet cleaning services',
    'professional carpet cleaners',
    'carpet stain removal',
    'rug cleaning services',
    'sofa cleaning services',
    'upholstery cleaning services',
    'couch cleaning Essex',
    'pressure washing services',
    'roof cleaning services',
    'roof moss removal',
    'moss removal Essex',
    'gutter cleaning services',
    'window cleaning services',
    'professional cleaning company Essex',
    'interior cleaning Essex',
    'exterior cleaning Essex',
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Professional Cleaning Services | ${siteConfig.name}`,
    description: `Complete interior & exterior cleaning services in Essex. Carpet, upholstery, roof, pressure washing, gutter & window cleaning. Free quotes available.`,
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Professional Cleaning Services - ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional Cleaning Services | ${siteConfig.name}`,
    description: `Complete interior & exterior cleaning services in Essex. Free quotes available.`,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

// JSON-LD for services collection
const servicesCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteConfig.url}/services#webpage`,
  url: `${siteConfig.url}/services`,
  name: `Professional Cleaning Services | ${siteConfig.name}`,
  description: 'Complete range of professional interior and exterior cleaning services in Essex',
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@type': 'ItemList',
    name: 'Cleaning Services',
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${siteConfig.url}/services/${service.slug}`,
        provider: {
          '@id': `${siteConfig.url}/#organization`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Essex',
        },
      },
    })),
  },
};

// FAQ schema for services page
const servicesFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What cleaning services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `We offer comprehensive interior and exterior cleaning services including: ${services.map(s => s.name).join(', ')}. All services are available across Essex.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Are your cleaning services insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, we are fully insured with public liability insurance up to £5 million. We provide certificates upon request.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free quotes for cleaning services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all our quotes are 100% free with no obligation. Simply fill out our online form or call us for an instant quote.',
      },
    },
  ],
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services' },
  ];

  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesCollectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqJsonLd) }}
      />
      <Section className="bg-slate-50 border-b border-slate-200">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3 block">
              What We Offer
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Professional <span className="text-brand-500">Services</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              From deep carpet cleaning to roof restoration, we provide comprehensive
              cleaning solutions for homes and businesses across Essex.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <ServiceClusterNav />

      <Section className="bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <CrossHubLinks currentHub="services" variant="section" />

      <ContactSection />
    </LandingLayout>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full group">
      <Card hover className="h-full">
        <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors shadow-sm">
          <Icon
            name={service.icon as Parameters<typeof Icon>[0]['name']}
            size={28}
            className="text-brand-600"
          />
        </div>
        <h3 className="text-[1.25rem] md:text-[1.375rem] font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors">
          {service.name}
        </h3>
        <p className="mt-2 text-neutral-600">
          {service.description}
        </p>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">Ideal for:</h4>
          <ul className="space-y-1">
            {service.idealFor.slice(0, 3).map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-neutral-500">
                <Icon name="check" size={12} className="text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 flex items-center gap-1">
            Learn more about {service.shortName}
            <Icon name="arrow-right" size={14} />
          </span>
        </div>
      </Card>
    </Link>
  );
}
