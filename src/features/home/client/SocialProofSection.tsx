'use client';

import Link from 'next/link';
import { Container, Section, AnimatedSection, AnimatedDiv, Icon } from '@/components/ui';
import { locations } from '@/lib/constants';

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '5,000+', label: 'Jobs Completed' },
  { value: '5.0', label: 'Google Rating', icon: 'star' as const },
  { value: '100%', label: 'Satisfaction Rate' },
];

const testimonials = [
  {
    quote: "Absolutely fantastic service! Our gutters were completely blocked and overflowing. The team was professional, punctual, and thorough. Highly recommend Aquapro Cleaning.",
    author: 'Sarah Thompson',
    locationSlug: 'basildon',
    location: 'Basildon',
    service: 'Gutter Cleaning',
  },
  {
    quote: "Best pressure washing service I've used. My driveway hadn't been cleaned in years and now it looks incredible. Will definitely use again.",
    author: 'James Mitchell',
    locationSlug: 'southend-on-sea',
    location: 'Southend-on-Sea',
    service: 'Pressure Washing',
  },
  {
    quote: "Professional, reliable, and great value. The roof cleaning made such a difference to our home's appearance. Thank you Aquapro!",
    author: 'Emma Wilson',
    locationSlug: 'chelmsford',
    location: 'Chelmsford',
    service: 'Roof Cleaning',
  },
];

// Top 10 locations for homepage links
const topLocations = locations.slice(0, 10);

export function SocialProofSection() {
  return (
    <>
      {/* Stats + Testimonials */}
      <Section className="bg-neutral-50">
        <Container>
          <StatsGrid />
          <TestimonialsGrid />
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="bg-white">
        <Container>
          <HowItWorks />
        </Container>
      </Section>

      {/* Local Area Strip */}
      <Section className="bg-primary-50">
        <Container>
          <LocalAreaStrip />
        </Container>
      </Section>
    </>
  );
}

function StatsGrid() {
  return (
    <AnimatedDiv className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16" stagger>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</span>
            {stat.icon && <Icon name={stat.icon} size={24} className="text-amber-400 fill-amber-400" />}
          </div>
          <div className="mt-1 text-sm text-neutral-600">{stat.label}</div>
        </div>
      ))}
    </AnimatedDiv>
  );
}

function TestimonialsGrid() {
  return (
    <div>
      <AnimatedSection className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-white text-primary-700 text-sm font-medium rounded-full mb-4">
          Customer Reviews
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Real reviews from real customers across Essex
        </p>
      </AnimatedSection>

      <AnimatedDiv className="grid md:grid-cols-3 gap-6" stagger>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} testimonial={testimonial} />
        ))}
      </AnimatedDiv>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: typeof testimonials[0];
}) {
  // Map service names to slugs
  const serviceSlugMap: Record<string, string> = {
    'Gutter Cleaning': 'gutter-cleaning',
    'Pressure Washing': 'pressure-washing',
    'Roof Cleaning': 'roof-cleaning',
    'Driveway Cleaning': 'driveway-cleaning',
    'Patio Cleaning': 'patio-cleaning',
  };
  const serviceSlug = serviceSlugMap[testimonial.service] || 'roof-cleaning';

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
      {/* Google badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Icon key={i} name="star" size={16} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <span className="text-xs text-neutral-400 font-medium">via Google</span>
      </div>
      <p className="text-neutral-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-4 pt-4 border-t border-neutral-100">
        <div className="font-semibold text-neutral-900">{testimonial.author}</div>
        <div className="text-sm text-neutral-500">
          <Link
            href={`/${serviceSlug}/${testimonial.locationSlug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {testimonial.service} in {testimonial.location}
          </Link>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'Get a Quote',
      description: 'Call or email us for a free, no-obligation quote. Takes just 2 minutes.',
      icon: 'message-circle' as const,
    },
    {
      step: 2,
      title: 'Book a Time',
      description: 'Choose a date and time that works for you. We offer flexible scheduling.',
      icon: 'calendar' as const,
    },
    {
      step: 3,
      title: 'We Clean',
      description: 'Our professional team arrives on time with all equipment needed.',
      icon: 'sparkles' as const,
    },
    {
      step: 4,
      title: 'You Inspect',
      description: 'Check the results. Not happy? We\'ll re-clean for free.',
      icon: 'check' as const,
    },
  ];

  return (
    <div>
      <AnimatedSection className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full mb-4">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Getting your property professionally cleaned is easy
        </p>
      </AnimatedSection>

      <AnimatedDiv className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger>
        {steps.map((item) => (
          <div
            key={item.step}
            className="relative bg-neutral-50 rounded-xl p-6 border border-neutral-200"
          >
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
              {item.step}
            </div>
            <h3 className="font-semibold text-neutral-900 text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600">
              {item.description}
            </p>
          </div>
        ))}
      </AnimatedDiv>
    </div>
  );
}

function LocalAreaStrip() {
  return (
    <AnimatedSection className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Icon name="map-pin" size={24} className="text-primary-600" />
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
          Proudly Serving Essex & Surrounding Areas
        </h2>
      </div>
      <p className="text-neutral-600 mb-6">
        We provide professional cleaning services throughout Essex
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {topLocations.map((location) => (
          <Link
            key={location.slug}
            href={`/roof-cleaning/${location.slug}`}
            className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 border border-neutral-200 hover:border-primary-300 hover:text-primary-600 transition-colors"
          >
            {location.name}
          </Link>
        ))}
        <Link
          href="/areas"
          className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          View All Areas
        </Link>
      </div>
    </AnimatedSection>
  );
}
