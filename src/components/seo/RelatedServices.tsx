import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getRelatedServices,
  getServiceCluster,
  clusterNames,
  type Service,
  type Location,
} from '@/lib/constants';

type RelatedServicesProps = {
  currentServiceId: string;
  location?: Location; // If provided, links to /[service]/[location]
  showTitle?: boolean;
};

export function RelatedServices({
  currentServiceId,
  location,
  showTitle = true,
}: RelatedServicesProps) {
  const relatedServices = getRelatedServices(currentServiceId);
  const cluster = getServiceCluster(currentServiceId);

  if (relatedServices.length === 0) {
    return null;
  }

  const clusterName = cluster ? clusterNames[cluster] : 'Related';

  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              More {clusterName} Services
            </h2>
            <p className="mt-2 text-neutral-600">
              {location
                ? `Complete your cleaning in ${location.name}`
                : 'Complete your home cleaning'}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <RelatedServiceCard
              key={service.id}
              service={service}
              location={location}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-700 transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedServiceCard({
  service,
  location,
}: {
  service: Service;
  location?: Location;
}) {
  const href = location
    ? `/${service.slug}/${location.slug}`
    : `/services/${service.slug}`;

  return (
    <Link
      href={href}
      className="group bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
        {service.name}
        {location && <span className="text-neutral-500"> in {location.name}</span>}
      </h3>
      <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
        {service.description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:text-primary-700">
        Learn more
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
