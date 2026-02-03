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
          <MapPin className="w-4 h-4 text-brand-600" />
          <span className="text-neutral-600">Looking for services in your area?</span>
          <Link
            href="/areas"
            className="inline-flex items-center gap-1 text-brand-600 font-medium hover:text-brand-700"
          >
            View all {locations.length} locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <Wrench className="w-4 h-4 text-brand-600" />
        <span className="text-neutral-600">Want to learn more about our services?</span>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-brand-600 font-medium hover:text-brand-700"
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
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <MapPin className="w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Find Services in <span className="text-brand-500">Your Area</span>
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            We cover {locations.length}+ locations across Essex and surrounding areas.
            Find your local team and get a free quote.
          </p>
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Browse All Locations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
          <Wrench className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Explore Our <span className="text-brand-500">Services</span>
        </h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
          From carpet cleaning to roof moss removal, we offer {services.length} professional
          cleaning services for your home and business.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          View All Services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
