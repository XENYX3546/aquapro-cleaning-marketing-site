'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowRight } from 'lucide-react';
import { ctaLinks } from '@/lib/constants';

export function CommercialBanner() {
  return (
    <section
      id="commercial"
      className="relative py-16 md:py-24 overflow-hidden bg-slate-900"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blake-van-image.jpg"
          alt="Aquapro commercial cleaning services"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              Commercial Services
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5 leading-tight">
              Commercial Exterior & <br />
              Interior Cleaning
            </h3>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              We provide comprehensive cleaning contracts for schools, offices,
              and businesses. From external cladding and grounds maintenance to
              internal office cleaning and deep cleans. Fully insured with RAMS
              provided.
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto pt-4 lg:pt-0">
            <Link
              href={ctaLinks.quote}
              className="inline-flex items-center justify-center gap-2 py-3 px-6 text-slate-900 font-bold bg-white hover:bg-slate-50 rounded-lg transition-colors w-full sm:w-auto shadow-lg"
            >
              Commercial Enquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
