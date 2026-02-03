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
    <nav className="py-8 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Interior Cluster */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h3 className="font-semibold text-slate-900">
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
                      ? 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700'
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
              <Home className="w-5 h-5 text-brand-600" />
              <h3 className="font-semibold text-slate-900">
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
                      ? 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700'
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
