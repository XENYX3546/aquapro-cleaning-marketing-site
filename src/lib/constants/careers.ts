// Careers page data - easily updatable

export type JobType = 'Full-time' | 'Part-time' | 'Contract';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  postedDate?: string;
}

export interface Benefit {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

// Benefits data
export const careersBenefits: Benefit[] = [
  {
    icon: 'Sparkles',
    title: 'Top Equipment',
    description: 'We provide the best vans, soft-wash systems, and safety gear in the industry.',
  },
  {
    icon: 'Heart',
    title: 'Health & Wellbeing',
    description: 'Comprehensive private medical insurance and regular health screenings.',
  },
  {
    icon: 'Zap',
    title: 'Performance Bonuses',
    description: 'Competitive hourly rates plus monthly bonuses for 5-star client reviews.',
  },
  {
    icon: 'Award',
    title: 'Training Academy',
    description: 'Paid certifications in Soft Washing, IPAF, and specialist surface care.',
  },
  {
    icon: 'Coffee',
    title: 'Work-Life Balance',
    description: '28 days Annual Leave, predictable rotas, and no unexpected overtime.',
  },
  {
    icon: 'Globe',
    title: 'Local Community',
    description: 'We support local Essex charities with free cleaning days for community centres.',
  },
];

// Jobs data - easily add/remove/update jobs here
export const jobs: Job[] = [
  {
    id: '1',
    title: 'Lead Exterior Cleaning Technician',
    department: 'Operations',
    location: 'Chelmsford, Essex (CM3)',
    type: 'Full-time',
    salary: '£32k - £38k',
    description:
      'Lead a two-person crew delivering high-end soft washing and pressure cleaning services. You will handle roof cleaning, render cleaning, and driveway restoration for our premium residential clients.',
    requirements: [
      '3+ years exterior cleaning experience',
      'Full UK Driving Licence',
      'Soft Wash certification preferred',
    ],
    postedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Commercial Interior Specialist',
    department: 'Operations',
    location: 'Colchester / Braintree',
    type: 'Full-time',
    salary: '£26k - £30k',
    description:
      'Detail-oriented professional needed for our commercial contracts (offices, showrooms, and schools). You will manage deep cleans, carpet restoration, and ensure impeccable hygiene standards.',
    requirements: [
      'Commercial cleaning experience',
      'DBS Checked',
      'Eye for detail',
    ],
    postedDate: '1 week ago',
  },
  {
    id: '3',
    title: 'Sales & Quotes Manager',
    department: 'Sales',
    location: 'Basildon, Essex / Hybrid',
    type: 'Full-time',
    salary: '£35k + Commission',
    description:
      'Visit client properties to provide accurate quotes for exterior and interior work. You will manage the sales pipeline, follow up on leads, and build relationships with property managers.',
    requirements: [
      'Sales experience',
      'Vehicle provided',
      'Friendly & professional manner',
    ],
    postedDate: '3 days ago',
  },
  {
    id: '4',
    title: 'Trainee Cleaning Operative',
    department: 'Operations',
    location: 'Maldon, Essex',
    type: 'Full-time',
    salary: '£24k + Training',
    description:
      'Start your career in specialist cleaning. We provide full training on pressure washing equipment, chemical safety, and working at heights. Great attitude required!',
    requirements: [
      'Willingness to learn',
      'Reliable and punctual',
      'UK Driving Licence a plus',
    ],
    postedDate: '5 days ago',
  },
];

// Helper function to filter jobs
export function filterJobs(
  allJobs: Job[],
  category: 'All' | 'Exterior' | 'Interior',
  searchQuery: string,
  locationQuery: string
): Job[] {
  return allJobs.filter((job) => {
    // Filter by category
    let matchesCategory = true;
    if (category === 'Exterior') {
      matchesCategory =
        job.title.toLowerCase().includes('exterior') ||
        job.description.toLowerCase().includes('roof') ||
        job.description.toLowerCase().includes('washing') ||
        job.description.toLowerCase().includes('pressure');
    } else if (category === 'Interior') {
      matchesCategory =
        job.title.toLowerCase().includes('interior') ||
        job.description.toLowerCase().includes('interior') ||
        job.description.toLowerCase().includes('carpet') ||
        job.description.toLowerCase().includes('commercial cleaning');
    }

    // Filter by search keyword
    const query = searchQuery.toLowerCase();
    const matchesKeyword =
      searchQuery === '' ||
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.requirements.some((req) => req.toLowerCase().includes(query));

    // Filter by location
    const locQuery = locationQuery.toLowerCase();
    const matchesLocation =
      locationQuery === '' || job.location.toLowerCase().includes(locQuery);

    return matchesCategory && matchesKeyword && matchesLocation;
  });
}
