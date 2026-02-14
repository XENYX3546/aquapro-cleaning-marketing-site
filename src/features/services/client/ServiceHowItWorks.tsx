'use client';

import Image from 'next/image';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { getServiceKeywords, authorityLinkMap } from '@/lib/constants';

const DEFAULT_IMAGE_URL = "/images/blake-van-image.jpg";
const ROOF_CLEANING_VIDEO_ID = "9XtCPtQDPE8";

interface ServiceHowItWorksProps {
  service: Service;
  location?: Location;
}

export function ServiceHowItWorks({ service, location }: ServiceHowItWorksProps) {
  const isRoofCleaning = service.id === 'roof-cleaning';
  const keywords = getServiceKeywords(service.slug);
  const variation = keywords.variations[0] ?? keywords.primary;
  const specs = Object.entries(keywords.specs);
  const authority = authorityLinkMap[service.slug];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How {variation} <span className="text-[#1B9CB6]">Works</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {location
              ? <>{location.name} homeowners choose our {variation.toLowerCase()} for hassle-free results from start to finish.</>
              : `We make ${variation.toLowerCase()} hassle-free from start to finish. Professional results every time.`}
          </p>
        </div>

        {/* Video for Roof Cleaning, Image for others */}
        <div className="mb-16 lg:mb-20 max-w-3xl mx-auto">
          {isRoofCleaning ? (
            <>
              <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 bg-slate-900">
                <iframe
                  src={`https://www.youtube.com/embed/${ROOF_CLEANING_VIDEO_ID}?rel=0`}
                  title="Roof Cleaning Process"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-center text-sm text-slate-500 mt-6 font-medium">
                Watch our roof cleaning process
              </p>
            </>
          ) : (
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
              <Image
                src={service.image || DEFAULT_IMAGE_URL}
                alt={`Professional ${service.name.toLowerCase()} equipment and process in action`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                quality={75}
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Process Steps - Clean Overlapping Design */}
        <div className="max-w-3xl mx-auto space-y-0">
          {service.process.map((step, index) => (
            <div
              key={step.step}
              className={`relative pl-16 md:pl-24 py-8 ${index !== service.process.length - 1 ? 'border-b border-slate-200/60' : ''}`}
            >
              {/* Large muted background number */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
                <span className="text-5xl md:text-7xl font-bold text-slate-200/80 select-none">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Service Specs — structured key-value pairs for tidbit extraction */}
        {specs.length > 0 && (
          <div className="max-w-3xl mx-auto mt-12 lg:mt-16">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Service Details</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {specs.map(([key, value]) => (
                <div key={key} className="flex flex-col py-2 border-b border-slate-100">
                  <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">{key}</dt>
                  <dd className="text-sm font-medium text-slate-800 mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
            {authority && (
              <p className="text-xs text-slate-400 mt-4">
                {authority.context} —{' '}
                <a href={authority.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">{authority.label}</a>
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export default ServiceHowItWorks;
