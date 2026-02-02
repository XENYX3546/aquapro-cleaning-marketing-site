import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getRelatedServices,
  getCrossClusterServices,
  getServiceCluster,
  clusterNames,
  type Location,
} from '@/lib/constants';

type ServiceCrossLinksProps = {
  location: Location;
  currentServiceId: string;
  variant?: 'compact' | 'full';
};

export function ServiceCrossLinks({
  location,
  currentServiceId,
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
      <div className="py-8 border-t border-neutral-200">
        <p className="text-sm font-semibold text-neutral-900 mb-4">
          Other services in {location.name}:
        </p>
        <div className="flex flex-wrap gap-2">
          {allServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}/${location.slug}`}
              className="px-4 py-2 text-sm bg-neutral-100 text-neutral-700 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors font-medium"
            >
              {service.shortName}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href={`/areas/${location.slug}`}
            className="inline-flex items-center gap-1 text-sm text-primary-700 font-medium hover:text-primary-700"
          >
            All services in {location.name}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Full variant with sections
  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            More Services in {location.name}
          </h2>
          <p className="mt-2 text-neutral-600">
            Book multiple services and save
          </p>
        </div>

        {/* Same cluster services */}
        {sameClusterServices.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              More {clusterName}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sameClusterServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}/${location.slug}`}
                  className="group bg-white rounded-xl p-5 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {service.name}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700">
                    View service
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Cross-cluster services */}
        {crossClusterServices.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Also Available in {location.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {crossClusterServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}/${location.slug}`}
                  className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors font-medium text-sm"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8 pt-6 border-t border-neutral-200">
          <Link
            href={`/areas/${location.slug}`}
            className="inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-700 transition-colors"
          >
            View all services in {location.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
