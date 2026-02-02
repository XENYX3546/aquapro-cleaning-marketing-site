'use client';

import { Play } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';

const THUMBNAIL_URL = "/images/blake-carpet-cleaning.png";

interface ServiceHowItWorksProps {
  service: Service;
  location?: Location;
}

export function ServiceHowItWorks({ service, location }: ServiceHowItWorksProps) {
  const locationText = location ? ` in ${location.name}` : '';

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            How {service.name}{locationText} <span className="text-[#1B9CB6]">Works</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We make {service.name.toLowerCase()}{locationText} hassle-free from start to finish. Professional results every time.
          </p>
        </div>

        {/* Video Embed Block */}
        <div className="mb-16 lg:mb-20 max-w-3xl mx-auto">
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 bg-slate-900 group cursor-pointer transform transition-all hover:shadow-2xl hover:-translate-y-1">
             {/* Poster Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={THUMBNAIL_URL}
              alt={`${service.name} Process`}
              className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center pl-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B9CB6] fill-[#1B9CB6]" />
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400 mt-6 font-medium flex items-center justify-center gap-2">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B9CB6] opacity-75" />
               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1B9CB6]" />
             </span>
             Watch our {service.name.toLowerCase()} process
          </p>
        </div>

        {/* Vertical Process Timeline */}
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-12 relative">

            {/* Continuous Vertical Line */}
            <div className="absolute left-[23px] md:left-[27px] top-6 bottom-6 md:top-7 md:bottom-7 w-0.5 bg-slate-200" />

            {service.process.map((step, index) => (
              <div key={step.step} className="relative flex flex-row gap-5 md:gap-8 items-start">
                  <div className="flex-shrink-0 z-10 relative">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-[#1B9CB6] flex items-center justify-center text-[#1B9CB6] text-xl md:text-2xl font-bold shadow-[0_0_0_4px_rgba(27,156,182,0.1)]">
                          {step.step}
                      </div>
                  </div>
                  <div className="pt-1 flex-grow relative z-10">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                        {step.title}
                        {index === service.process.length - 1 && (
                          <span className="text-[#E30663] block sm:inline"> + Satisfaction Guaranteed</span>
                        )}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-[15px]">
                          {step.description}
                      </p>
                  </div>
              </div>
            ))}

        </div>

      </div>
    </section>
  );
}

export default ServiceHowItWorks;
