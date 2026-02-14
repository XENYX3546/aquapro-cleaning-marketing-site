'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';

type Region = {
  name: string;
  towns: { slug: string; name: string }[];
};

type ServiceOption = {
  slug: string;
  shortName: string;
};

interface AreasGridProps {
  regions: Region[];
  services: ServiceOption[];
}

export function AreasGrid({ regions, services }: AreasGridProps) {
  const [selectedService, setSelectedService] = useState(services[0].slug);

  return (
    <>
      {/* Service Selector */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3 text-center">
          Select a service
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {services.map((service) => (
            <button
              key={service.slug}
              onClick={() => setSelectedService(service.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedService === service.slug
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {service.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Regional Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => (
          <div
            key={region.name}
            className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon name="map-pin" size={20} className="text-primary-700" />
              <h2 className="text-lg font-semibold text-neutral-900">
                {region.name}
              </h2>
            </div>

            <ul className="space-y-2">
              {region.towns.map((town) => (
                <li key={town.slug}>
                  <Link
                    href={`/${selectedService}/${town.slug}`}
                    className="text-sm text-neutral-700 hover:text-primary-700 transition-colors"
                  >
                    {town.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
