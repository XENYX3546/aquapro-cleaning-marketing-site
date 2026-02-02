import Link from 'next/link';
import { Home, Sparkles } from 'lucide-react';
import {
  getServicesByCluster,
  clusterNames,
  type ServiceCluster,
} from '@/lib/constants';

type ServiceClusterNavProps = {
  activeCluster?: ServiceCluster;
};

export function ServiceClusterNav({ activeCluster }: ServiceClusterNavProps) {
  const interiorServices = getServicesByCluster('interior');
  const exteriorServices = getServicesByCluster('exterior');

  return (
    <nav className="py-8 bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Interior Cluster */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-700" />
              <h3 className="font-semibold text-neutral-900">
                {clusterNames.interior}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interiorServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                    activeCluster === 'interior'
                      ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {service.shortName}
                </Link>
              ))}
            </div>
          </div>

          {/* Exterior Cluster */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-primary-700" />
              <h3 className="font-semibold text-neutral-900">
                {clusterNames.exterior}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {exteriorServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                    activeCluster === 'exterior'
                      ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {service.shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
