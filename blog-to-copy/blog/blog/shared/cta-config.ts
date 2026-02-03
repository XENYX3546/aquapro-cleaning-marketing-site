// Category-to-CTA mapping for contextual sidebar CTAs
// Add new categories here as your blog grows

export type CTAConfig = {
  headline: string;
  description: string;
  buttonText: string;
  features: string[];
};

// Default/fallback CTA
export const DEFAULT_CTA: CTAConfig = {
  headline: 'Ready to streamline your business?',
  description:
    'Join thousands of service businesses using ZuviaOne to manage scheduling, invoicing, and customer relationships.',
  buttonText: 'Get Started Free',
  features: [
    'Online booking & scheduling',
    'Invoicing & payments',
    'Customer CRM',
    'Team management',
    'Automated reminders',
  ],
};

// Category-specific CTAs (keyed by category slug)
export const CATEGORY_CTAS: Record<string, CTAConfig> = {
  'conversion-rate-optimization': {
    headline: 'Turn more visitors into customers',
    description:
      'ZuviaOne helps service businesses convert leads with professional quotes, easy booking, and automated follow-ups.',
    buttonText: 'Boost Conversions',
    features: [
      'Professional online quotes',
      'One-click booking pages',
      'Automated follow-up sequences',
      'Lead tracking & analytics',
      'Mobile-optimized forms',
    ],
  },
  scheduling: {
    headline: 'Stop the scheduling headaches',
    description:
      'Let customers book online 24/7. ZuviaOne handles availability, confirmations, and reminders automatically.',
    buttonText: 'Automate Scheduling',
    features: [
      'Online booking calendar',
      'Automatic confirmations',
      'SMS & email reminders',
      'Team availability sync',
      'No double-bookings',
    ],
  },
  invoicing: {
    headline: 'Get paid faster, every time',
    description:
      'Send professional invoices, accept online payments, and automate payment reminders with ZuviaOne.',
    buttonText: 'Speed Up Payments',
    features: [
      'Professional invoices',
      'Online payment processing',
      'Automatic payment reminders',
      'Recurring billing',
      'Financial reporting',
    ],
  },
  crm: {
    headline: 'Never lose track of a customer',
    description:
      'Keep all your customer info, job history, and communications in one place with ZuviaOne CRM.',
    buttonText: 'Organize Your Customers',
    features: [
      'Customer profiles & history',
      'Job & service tracking',
      'Notes & attachments',
      'Communication log',
      'Custom fields',
    ],
  },
  'field-service': {
    headline: 'Manage your team in the field',
    description:
      'Dispatch jobs, track progress, and keep your field team connected with ZuviaOne.',
    buttonText: 'Streamline Field Ops',
    features: [
      'Job dispatching',
      'Mobile app for technicians',
      'Real-time job status',
      'Route optimization',
      'On-site payments',
    ],
  },
  // Add more categories as needed...
};

/**
 * Get the appropriate CTA config based on category slugs
 * Returns the first matching category CTA, or the default
 */
export function getCTAForCategories(categorySlugs: string[]): CTAConfig {
  for (const slug of categorySlugs) {
    if (CATEGORY_CTAS[slug]) {
      return CATEGORY_CTAS[slug];
    }
  }
  return DEFAULT_CTA;
}
