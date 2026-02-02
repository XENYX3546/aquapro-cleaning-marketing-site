import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { locations, type Service } from '@/lib/constants';

type ServiceLocationLinksProps = {
  service: Service;
  limit?: number;
};

// Get top locations (prioritize non-county, major towns)
const getTopLocations = (limit: number = 8) => {
  // Filter out county-level locations and get major towns first
  const towns = locations.filter((l) => !l.isCounty);
  return towns.slice(0, limit);
};

export function ServiceLocationLinks({
  service,
  limit = 8,
}: ServiceLocationLinksProps) {
  const topLocations = getTopLocations(limit);

  return (
    <section className="py-12 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            {service.name} in Your Area
          </h2>
          <p className="mt-2 text-neutral-600">
            Find professional {service.shortName.toLowerCase()} services near you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/${service.slug}/${location.slug}`}
              className="group flex items-center gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600 transition-colors truncate">
                {location.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View all {locations.length} locations
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-neutral-600 font-medium hover:text-neutral-800 transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
