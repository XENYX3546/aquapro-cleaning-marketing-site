import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, ReviewsSection } from '@/components/ui';
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
} from '@/lib/constants';
import {
  ServiceHero,
  ServiceValueProposition,
  ServiceHowItWorks,
  ServiceMobileLeadForm,
  ServiceAbout,
  ServiceGuarantees,
  ServiceStickyCTA,
  ServiceMiniCTA,
} from '@/features/services/client';
import { ContactSection } from '@/features/home/client';
import {
  matchBlogRoute,
  getAllBlogPostsForStaticParams,
  getRelatedPosts,
} from '@/lib/blog';
import { BlogPostPage } from '@/features/blog';

type PageProps = {
  params: Promise<{
    service: string;
    location: string;
  }>;
};

export async function generateStaticParams() {
  const params: { service: string; location: string }[] = [];

  // Add service-location combinations
  for (const service of services) {
    for (const location of locations) {
      params.push({ service: service.slug, location: location.slug });
    }
  }

  // Add blog category-post combinations
  try {
    const blogParams = await getAllBlogPostsForStaticParams();
    for (const { category, slug } of blogParams) {
      params.push({ service: category, location: slug });
    }
  } catch {
    // Blog API might not be available during build
    console.warn('Could not fetch blog posts for static params');
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug } = await params;

  // First, check if this is a blog route
  const blogMatch = await matchBlogRoute(serviceSlug, locationSlug);
  if (blogMatch) {
    const { post, category } = blogMatch;
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || '';
    const ogImage = post.ogImageUrl || post.featuredImageUrl;

    return {
      title,
      description,
      keywords: post.metaKeywords || post.tags?.join(', ') || '',
      authors: post.author ? [{ name: post.author.displayName }] : undefined,
      openGraph: {
        title: post.ogTitle || title,
        description: post.ogDescription || description,
        type: 'article',
        url: `${siteConfig.url}/${category.slug}/${post.slug}`,
        images: ogImage ? [{ url: ogImage }] : undefined,
        publishedTime: post.publishedAt || undefined,
        authors: post.author ? [post.author.displayName] : undefined,
        tags: post.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.ogTitle || title,
        description: post.ogDescription || description,
        images: ogImage ? [ogImage] : undefined,
      },
      alternates: {
        canonical: post.canonicalUrl || `${siteConfig.url}/${category.slug}/${post.slug}`,
      },
    };
  }

  // Otherwise, handle as service-location page
  const service = services.find((s) => s.slug === serviceSlug);
  const location = getLocationBySlug(locationSlug);

  if (!service || !location) {
    return { title: 'Page Not Found' };
  }

  const isCounty = location.isCounty;
  const title = isCounty
    ? `${service.name} in ${location.name} | Professional ${service.shortName} Services | ${siteConfig.name}`
    : `${service.name} in ${location.name} | ${siteConfig.name}`;
  const description = isCounty
    ? `Professional ${service.name.toLowerCase()} services across ${location.name}. ${service.benefits[0]}. Serving Chelmsford, Southend, Colchester, Basildon & all ${location.name} towns. Fully insured, ${reviewStatsDisplay.starRating} rated. Free quotes!`
    : `Expert ${service.name.toLowerCase()} services in ${location.name}, ${location.county}. ${service.benefits[0]}. Local ${location.county} team, fully insured with ${reviewStatsDisplay.starRating} rating. Free quotes - call today!`;
  const keywords = isCounty
    ? [
        `${service.name.toLowerCase()} ${location.name}`,
        `${service.name.toLowerCase()} services ${location.name}`,
        `professional ${service.name.toLowerCase()} ${location.name}`,
        `best ${service.name.toLowerCase()} ${location.name}`,
        `${service.name.toLowerCase()} company ${location.name}`,
        `${location.name} ${service.name.toLowerCase()}`,
      ]
    : [
        `${service.name.toLowerCase()} ${location.name}`,
        `${service.name.toLowerCase()} ${location.county}`,
        `${service.name.toLowerCase()} near me`,
        `professional ${service.name.toLowerCase()} ${location.name}`,
        `best ${service.name.toLowerCase()} ${location.county}`,
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
          alt: `${service.name} in ${location.name} - ${siteConfig.name}`,
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
function generateSchemas(service: Service, location: Location) {
  const isCounty = location.isCounty;

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/${service.slug}/${location.slug}#business`,
    name: siteConfig.name,
    description: isCounty
      ? `Professional ${service.name.toLowerCase()} services across ${location.name}`
      : `Professional ${service.name.toLowerCase()} in ${location.name}, ${location.county}`,
    url: `${siteConfig.url}/${service.slug}/${location.slug}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '££',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(reviewStats.averageRating),
      reviewCount: String(reviewStats.totalReviews),
      bestRating: String(reviewStats.bestRating),
      worstRating: String(reviewStats.worstRating),
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
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'North Fambridge',
      addressRegion: 'Essex',
      postalCode: 'CM3 6LZ',
      addressCountry: 'GB',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${location.name}`,
    description: isCounty
      ? `Professional ${service.name.toLowerCase()} services across ${location.name} county`
      : `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.county}`,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
    },
    areaServed: isCounty
      ? { '@type': 'AdministrativeArea', name: location.name }
      : { '@type': 'City', name: location.name },
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
        name: `${service.name} in ${location.name}`,
        item: `${siteConfig.url}/${service.slug}/${location.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do you cover ${location.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, we provide ${service.name.toLowerCase()} throughout ${location.name} and surrounding areas in ${location.county}.`,
        },
      },
      ...service.faqs.slice(0, 3).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    ],
  };

  return { businessSchema, serviceSchema, faqSchema, breadcrumbSchema };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service: serviceSlug, location: locationSlug } = await params;

  // First, check if this is a blog route
  const blogMatch = await matchBlogRoute(serviceSlug, locationSlug);
  if (blogMatch) {
    const { post, category } = blogMatch;

    // Fetch related posts
    let relatedPosts: Awaited<ReturnType<typeof getRelatedPosts>>['data'] = [];
    try {
      const relatedResponse = await getRelatedPosts(post.slug, 3);
      relatedPosts = relatedResponse.data;
    } catch {
      // Related posts not available
    }

    // Generate blog post JSON-LD
    const blogPostSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImageUrl,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: post.author
        ? {
            '@type': 'Person',
            name: post.author.displayName,
            image: post.author.avatarUrl,
          }
        : undefined,
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/${category.slug}/${post.slug}`,
      },
      wordCount: post.wordCount,
      articleSection: category.name,
      keywords: post.tags?.join(', ') || '',
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
          name: 'Blog',
          item: `${siteConfig.url}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: `${siteConfig.url}/${category.slug}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: post.title,
          item: `${siteConfig.url}/${category.slug}/${post.slug}`,
        },
      ],
    };

    return (
      <LandingLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <BlogPostPage
          post={post}
          category={category}
          relatedPosts={relatedPosts}
        />
      </LandingLayout>
    );
  }

  // Otherwise, handle as service-location page
  const service = services.find((s) => s.slug === serviceSlug);
  const location = getLocationBySlug(locationSlug);

  if (!service || !location) {
    notFound();
  }

  const { businessSchema, serviceSchema, faqSchema, breadcrumbSchema } = generateSchemas(service, location);

  return (
    <LandingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceHero service={service} location={location} />
      <ServiceValueProposition service={service} location={location} />
      <ReviewsSection
        reviews={getReviewsForServiceAndLocation(service.id as ServiceId, location.slug)}
        moreReviews={getAllReviewsForService(service.id)}
        locationSlug={location.slug}
        tagline={`${service.shortName} Reviews`}
        title={<>What <span className="text-brand-500">{location.name}</span> Customers Say</>}
        subtitle={`Real reviews from ${location.name} homeowners who used our ${service.name.toLowerCase()} service.`}
      />
      <ServiceMiniCTA />
      <ServiceHowItWorks service={service} location={location} />

      {/* Mobile-only Lead Form after process */}
      <ServiceMobileLeadForm service={service} location={location} />

      <ServiceAbout service={service} location={location} />
      <ServiceGuarantees service={service} location={location} />

      {/* Contact Section */}
      <ContactSection serviceId={service.id} />

      {/* Other services in this location - cross-service internal linking */}
      <ServiceCrossLinks
        location={location}
        currentServiceId={service.id}
        variant="full"
      />

      {/* Nearby areas - same service in nearby locations */}
      <NearbyAreasFooter service={service} location={location} />

      <ServiceStickyCTA service={service} location={location} />
    </LandingLayout>
  );
}

function NearbyAreasFooter({ service, location }: { service: Service; location: Location }) {
  const nearbyLocations = location.nearbyAreas
    .slice(0, 6)
    .map(slug => getLocationBySlug(slug))
    .filter(Boolean) as Location[];

  return (
    <div className="border-t border-neutral-200 bg-neutral-50 py-12">
      <Container>
        <div className="text-center space-y-8">
          {/* Section Title */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              {service.shortName} in Nearby Areas
            </h3>
            <p className="text-neutral-600 text-sm">
              We also provide {service.name.toLowerCase()} services in these locations
            </p>
          </div>

          {/* Nearby areas for same service */}
          <div className="flex flex-wrap justify-center gap-2">
            {nearbyLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${service.slug}/${loc.slug}`}
                className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-neutral-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm"
              >
                {loc.name}
              </Link>
            ))}
          </div>

          {/* Parent page links */}
          <div className="pt-6 border-t border-neutral-200/50 flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href={`/services/${service.slug}`}
              className="text-primary-700 hover:text-primary-700 font-medium"
            >
              More about {service.shortName}
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href={`/areas/${location.slug}`}
              className="text-primary-700 hover:text-primary-700 font-medium"
            >
              All services in {location.name}
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/services"
              className="text-neutral-600 hover:text-neutral-800"
            >
              All services
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/areas"
              className="text-neutral-600 hover:text-neutral-800"
            >
              All areas
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
