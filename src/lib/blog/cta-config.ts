// Category-to-CTA mapping for contextual sidebar CTAs
// Add new categories here as your blog grows

export type CTAConfig = {
  headline: string;
  description: string;
  buttonText: string;
  features: string[];
};

// Default/fallback CTA for AquaPro Cleaning
export const DEFAULT_CTA: CTAConfig = {
  headline: 'Ready for a Sparkling Clean?',
  description:
    'Join hundreds of satisfied customers across Essex who trust Aquapro Cleaning for their professional exterior cleaning needs.',
  buttonText: 'Get a Free Quote',
  features: [
    'Roof cleaning & moss removal',
    'Pressure washing & soft washing',
    'Driveway & patio cleaning',
    'Gutter cleaning',
    'Free quotes & assessments',
  ],
};

// Category-specific CTAs (keyed by category slug)
export const CATEGORY_CTAS: Record<string, CTAConfig> = {
  'pressure-washing': {
    headline: 'Need Professional Pressure Washing?',
    description:
      'AquaPro uses commercial-grade equipment and eco-friendly solutions for outstanding results.',
    buttonText: 'Get a Free Quote',
    features: [
      'Driveway & concrete cleaning',
      'Commercial pressure washing',
      'Graffiti removal',
      'Pool area cleaning',
      'Same-day quotes available',
    ],
  },
  'solar-cleaning': {
    headline: 'Maximise Your Solar Efficiency',
    description:
      'Dirty panels lose up to 30% efficiency. Our professional cleaning restores peak performance.',
    buttonText: 'Book Solar Cleaning',
    features: [
      'Deionised water cleaning',
      'No harsh chemicals',
      'Performance guarantee',
      'Regular maintenance plans',
      'Before & after photos',
    ],
  },
  'window-cleaning': {
    headline: 'Crystal Clear Windows Guaranteed',
    description:
      'Professional window cleaning for homes and businesses. Streak-free results every time.',
    buttonText: 'Schedule Window Cleaning',
    features: [
      'Interior & exterior cleaning',
      'Hard water stain removal',
      'Screen cleaning included',
      'High-rise capable',
      'Regular service plans',
    ],
  },
  'house-washing': {
    headline: 'Restore Your Home\'s Beauty',
    description:
      'Gentle soft washing removes mould, mildew, and grime without damaging your home.',
    buttonText: 'Get House Washing Quote',
    features: [
      'Safe soft wash technique',
      'Kills mould & mildew',
      'Extends paint life',
      'Roof cleaning available',
      'Environmentally friendly',
    ],
  },
  'cleaning-tips': {
    headline: 'Want Professional Results?',
    description:
      'While DIY tips help, nothing beats professional equipment and expertise.',
    buttonText: 'Get Expert Help',
    features: [
      'Commercial-grade equipment',
      'Trained technicians',
      'Fully insured service',
      'Satisfaction guaranteed',
      'Competitive pricing',
    ],
  },
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
