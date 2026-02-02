'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Brush,
  Sofa,
  Droplets,
  Home,
  AppWindow,
  CloudRain,
  Sparkles,
} from 'lucide-react';
import { services, type Service } from '@/lib/constants';

export function ServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 8;
  const displayedServices = showAll ? services : services.slice(0, initialCount);

  return (
    <section
      id="services"
      className="pt-20 pb-16 md:pt-28 md:pb-[5.4rem] bg-white relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-24 left-10 w-64 h-64 bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute top-24 right-10 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-sm block mb-3">
            Our Expertise
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Professional Services{' '}
            <span className="text-brand-500">For Your Home</span>
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your one-stop shop for complete exterior cleaning. We combine
            advanced technology with expert care to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">
          {displayedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {services.length > initialCount && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 hover:border-brand-500 hover:text-brand-600 transition-all shadow-sm"
            >
              {showAll ? (
                <>
                  Show Less Services <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View More Services <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white rounded-2xl shadow-sm md:hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full md:hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/0 md:group-hover:bg-slate-900/10 transition-colors duration-300 z-10" />
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover transform md:group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-slate-100" />
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-brand-500">
            {service.id === 'carpet-cleaning' && <Brush className="w-5 h-5" />}
            {service.id === 'upholstery-cleaning' && <Sofa className="w-5 h-5" />}
            {service.id === 'pressure-washing' && <Droplets className="w-5 h-5" />}
            {service.id === 'roof-cleaning' && <Home className="w-5 h-5" />}
            {service.id === 'window-cleaning' && <AppWindow className="w-5 h-5" />}
            {service.id === 'gutter-cleaning' && <CloudRain className="w-5 h-5" />}
            {service.id === 'stain-removal' && <Sparkles className="w-5 h-5" />}
          </span>
          <h4 className="text-xl font-bold text-slate-900 md:group-hover:text-brand-600 transition-colors leading-tight">
            {service.name}
          </h4>
        </div>

        <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed flex-grow">
          {service.description}
        </p>

        <span className="w-full py-3 bg-cta text-white group-hover:bg-cta-hover rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg">
          Learn More{' '}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
