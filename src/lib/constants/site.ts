// Site Configuration - Aquapro Cleaning business info and navigation

export const siteConfig = {
  name: 'Aquapro Cleaning',
  legalName: 'Aquapro Cleaning Limited',
  description: 'Professional exterior cleaning services in Essex. Roof cleaning & moss removal, pressure washing, driveway cleaning, patio cleaning, and gutter cleaning. Fully insured, family-run, and delivering sparkling results.',
  shortDescription: 'Professional cleaning services in Essex',
  url: 'https://aquapro.co.uk',
  contact: {
    phone: '01268 225511',
    phoneHref: 'tel:+441268225511',
    email: 'bookings@aquapro.co.uk',
  },
  social: {
    facebook: 'https://www.facebook.com/p/Aquapro-Cleaning-61565606906517/',
    instagram: 'https://www.instagram.com/aquapro.cleaning/',
    tiktok: 'https://www.tiktok.com/@aquapro.cleaning',
  },
  // Business details for trust signals
  established: 2024,
  foundingDate: '2024-08-12',
  coverage: 'Essex & Surrounding Areas',
  companyNumber: '15891310',
  // Dates for WebPage schema — update contentLastUpdated when making real content changes
  contentFirstPublished: '2025-09-01',
  contentLastUpdated: '2026-02-06',
} as const;

// Customer statistics - single source of truth
// Update this value as customer count grows
export const customerStats = {
  totalCustomers: 4600,
} as const;

// Formatted versions for display
export const customerStatsDisplay = {
  totalCustomers: customerStats.totalCustomers.toLocaleString(),
  totalCustomersPlus: `${customerStats.totalCustomers.toLocaleString()}+`,
  totalCustomersShort: `${(customerStats.totalCustomers / 1000).toFixed(1)}k+`,
} as const;

// Review statistics - single source of truth
// Update these values as you collect more verified reviews
export const reviewStats = {
  totalReviews: 170,
  averageRating: 4.9,
  bestRating: 5,
  worstRating: 1,
} as const;

// Formatted versions for display
export const reviewStatsDisplay = {
  totalReviews: `${reviewStats.totalReviews}+`,
  averageRating: `${reviewStats.averageRating}/5`,
  starRating: `${reviewStats.averageRating}-star`,
} as const;

export const navigation = {
  main: [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Roof Cleaning & Moss Removal', href: '/services/roof-cleaning' },
    { label: 'Pressure Washing', href: '/services/pressure-washing' },
    { label: 'Driveway Cleaning', href: '/services/driveway-cleaning' },
    { label: 'Patio Cleaning', href: '/services/patio-cleaning' },
    { label: 'Gutter Cleaning', href: '/services/gutter-cleaning' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Careers', href: '/careers' },
  ],
} as const;

export const ctaLinks = {
  quote: '/contact',
  call: siteConfig.contact.phoneHref,
} as const;
