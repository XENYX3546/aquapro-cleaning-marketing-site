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
    <div className="border-t border-neutral-200 bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-5">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
              More {clusterName} Services
            </h3>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          {relatedServices.map((service) => (
            <Link
              key={service.id}
              href={location ? `/${service.slug}/${location.slug}` : `/services/${service.slug}`}
              className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full text-neutral-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm"
            >
              {service.shortName}
            </Link>
          ))}
        </div>

        <div className="text-center mt-4">
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
