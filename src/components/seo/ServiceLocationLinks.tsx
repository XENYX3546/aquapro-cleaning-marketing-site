import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <div className="border-t border-neutral-200 bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
            {service.shortName} in Your Area
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {topLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/${service.slug}/${location.slug}`}
              className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-neutral-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm"
            >
              {location.name}
            </Link>
          ))}
        </div>

        <div className="text-center mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/areas"
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            View all {locations.length} locations
            <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-neutral-300">|</span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            View all services
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
