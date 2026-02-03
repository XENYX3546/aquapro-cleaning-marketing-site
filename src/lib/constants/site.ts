// Site Configuration - Aquapro Cleaning business info and navigation

export const siteConfig = {
  name: 'Aquapro Cleaning',
  legalName: 'Aquapro Cleaning Limited',
  description: 'Professional cleaning services in Essex. Carpet & rug cleaning, sofa & upholstery cleaning, pressure washing, roof moss removal, and window cleaning. Fully insured, family-run, and delivering sparkling results.',
  shortDescription: 'Professional cleaning services in Essex',
  url: 'https://aquapro.co.uk',
  contact: {
    phone: '01268 225511',
    phoneHref: 'tel:+441268225511',
    email: 'bookings@aquapro.co.uk',
  },
  social: {
    facebook: 'https://facebook.com/aquaprocleaning',
    instagram: 'https://instagram.com/aquaprocleaning',
  },
  // Business details for trust signals
  established: 2020,
  coverage: 'Essex & Surrounding Areas',
  companyNumber: '15891310',
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
    { label: 'Carpet & Rug Cleaning', href: '/services/carpet-cleaning' },
    { label: 'Sofa & Upholstery Cleaning', href: '/services/upholstery-cleaning' },
    { label: 'Pressure Washing', href: '/services/pressure-washing' },
    { label: 'Roof Cleaning & Moss Removal', href: '/services/roof-cleaning' },
    { label: 'Window Cleaning', href: '/services/window-cleaning' },
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
