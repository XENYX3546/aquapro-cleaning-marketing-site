import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getRelatedServices,
  getCrossClusterServices,
  getServiceCluster,
  getLocationBySlug,
  clusterNames,
  type Location,
  type Service,
} from '@/lib/constants';

type ServiceCrossLinksProps = {
  location: Location;
  currentServiceId: string;
  service?: Service;
  variant?: 'compact' | 'full';
};

// Main Essex hub towns by population - these get linked from every location page
// to strengthen their internal link authority
const MAIN_ESSEX_TOWNS = [
  { slug: 'southend-on-sea', name: 'Southend-on-Sea' },
  { slug: 'colchester', name: 'Colchester' },
  { slug: 'chelmsford', name: 'Chelmsford' },
  { slug: 'basildon', name: 'Basildon' },
  { slug: 'harlow', name: 'Harlow' },
  { slug: 'grays', name: 'Grays' },
  { slug: 'brentwood', name: 'Brentwood' },
  { slug: 'clacton-on-sea', name: 'Clacton-on-Sea' },
];

export function ServiceCrossLinks({
  location,
  currentServiceId,
  service,
  variant = 'compact',
}: ServiceCrossLinksProps) {
  // Get same-cluster services first (higher priority)
  const sameClusterServices = getRelatedServices(currentServiceId);
  // Then get cross-cluster services
  const crossClusterServices = getCrossClusterServices(currentServiceId, 3);

  const cluster = getServiceCluster(currentServiceId);
  const clusterName = cluster ? clusterNames[cluster] : '';

  if (variant === 'compact') {
    const allServices = [...sameClusterServices, ...crossClusterServices];

    return (
      <div className="py-6 border-t border-neutral-200">
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
          Other services in {location.name}
        </p>
        <div className="flex flex-wrap gap-2">
          {allServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}/${location.slug}`}
              className="px-3 py-1.5 text-xs bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {s.shortName}
            </Link>
          ))}
        </div>
        <div className="mt-3">
          <Link
            href={`/areas/${location.slug}`}
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700"
          >
            All services in {location.name}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  // Nearby areas for this service
  const nearbyLocations = service
    ? location.nearbyAreas
        .slice(0, 6)
        .map(slug => getLocationBySlug(slug))
        .filter(Boolean) as Location[]
    : [];

  // Full variant - single consolidated footer
  const allOtherServices = [...sameClusterServices, ...crossClusterServices];

  return (
    <div className="border-t border-neutral-200 bg-white py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Other services */}
        {allOtherServices.length > 0 && (
          <div className="mb-8">
            <p className="text-neutral-900 font-semibold text-sm mb-3">
              Other services in {location.name}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {allOtherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/${location.slug}`}
                  className="px-4 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  {s.shortName}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby areas */}
        {service && nearbyLocations.length > 0 && (
          <div className="mb-8">
            <p className="text-neutral-900 font-semibold text-sm mb-3">
              {service.shortName} in nearby areas
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${service.slug}/${loc.slug}`}
                  className="px-4 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Postcodes we cover */}
        {location.postcodeAreas && location.postcodeAreas.length > 0 && (
          <div className="mb-8">
            <p className="text-neutral-900 font-semibold text-sm mb-3">
              {location.name} postcodes we cover
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {location.postcodeAreas.map((postcode) => (
                <span
                  key={postcode}
                  className="px-3 py-1.5 text-sm bg-neutral-100 text-neutral-600 rounded-lg"
                >
                  {postcode}
                </span>
              ))}
              <Link
                href="/areas"
                className="px-3 py-1.5 text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                + 100 more across Essex
              </Link>
            </div>
          </div>
        )}

        {/* Main Essex towns - hub pages for link equity */}
        {service && (
          <div className="mb-8">
            <p className="text-neutral-900 font-semibold text-sm mb-3">
              {service.shortName} across Essex
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {MAIN_ESSEX_TOWNS
                .filter(town => town.slug !== location.slug)
                .map((town) => (
                  <Link
                    key={town.slug}
                    href={`/${service.slug}/${town.slug}`}
                    className="px-4 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    {town.name}
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* Footer links */}
        <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400">
          {service && (
            <>
              <Link href={`/services/${service.slug}`} className="hover:text-neutral-600 transition-colors">
                More about {service.shortName}
              </Link>
              <span>·</span>
            </>
          )}
          <Link href={`/areas/${location.slug}`} className="hover:text-neutral-600 transition-colors">
            All services in {location.name}
          </Link>
          <span>·</span>
          <Link href="/services" className="hover:text-neutral-600 transition-colors">
            All services
          </Link>
          <span>·</span>
          <Link href="/areas" className="hover:text-neutral-600 transition-colors">
            All areas
          </Link>
        </div>
      </div>
    </div>
  );
}
