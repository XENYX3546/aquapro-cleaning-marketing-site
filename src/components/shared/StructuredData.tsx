import { siteConfig } from '@/lib/constants';

type StructuredDataProps = {
  type: 'LocalBusiness' | 'WebSite';
};

export function StructuredData({ type }: StructuredDataProps) {
  const data = getStructuredData(type);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function getStructuredData(type: StructuredDataProps['type']) {
  switch (type) {
    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        areaServed: {
          '@type': 'Place',
          name: siteConfig.coverage,
        },
        sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
      };

    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      };
  }
}
