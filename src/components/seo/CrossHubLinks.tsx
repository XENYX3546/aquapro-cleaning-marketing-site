import Link from 'next/link';
import { MapPin, Wrench, ArrowRight } from 'lucide-react';
import { services, locations } from '@/lib/constants';

type CrossHubLinksProps = {
  currentHub: 'services' | 'areas';
  variant?: 'inline' | 'section';
};

export function CrossHubLinks({
  currentHub,
  variant = 'inline',
}: CrossHubLinksProps) {
  if (variant === 'inline') {
    if (currentHub === 'services') {
      return (
        <div className="flex items-center justify-center gap-2 py-4">
          <MapPin className="w-4 h-4 text-primary-700" />
          <span className="text-neutral-600">Looking for services in your area?</span>
          <Link
            href="/areas"
            className="inline-flex items-center gap-1 text-primary-700 font-medium hover:text-primary-700"
          >
            View all {locations.length} locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <Wrench className="w-4 h-4 text-primary-700" />
        <span className="text-neutral-600">Want to learn more about our services?</span>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-primary-700 font-medium hover:text-primary-700"
        >
          View all {services.length} services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Section variant - more prominent
  if (currentHub === 'services') {
    return (
      <section className="py-12 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-10 h-10 text-primary-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Find Services in Your Area
          </h2>
          <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
            We cover {locations.length}+ locations across Essex and surrounding areas.
            Find your local team and get a free quote.
          </p>
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse All Locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Wrench className="w-10 h-10 text-primary-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Explore Our Services
        </h2>
        <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
          From carpet cleaning to roof moss removal, we offer {services.length} professional
          cleaning services for your home and business.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          View All Services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
