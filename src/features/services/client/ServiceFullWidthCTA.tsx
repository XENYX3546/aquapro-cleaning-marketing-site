'use client';

import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, CalendarCheck } from 'lucide-react';
import { BookOnlineButton } from '@/components/ui/BookOnlineButton';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { reviewStatsDisplay, customerStatsDisplay, getServiceKeywords, relatedServiceMap } from '@/lib/constants';

interface ServiceFullWidthCTAProps {
  service: Service;
  location?: Location;
}

export function ServiceFullWidthCTA({ service, location }: ServiceFullWidthCTAProps) {
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('contact') || document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const keywords = getServiceKeywords(service.slug);
  const variation = keywords.variations[3] ?? keywords.primary;
  const related = relatedServiceMap[service.slug] ?? [];

  return (
    <section className="bg-slate-900 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          {location
            ? <>Book Your {service.name} in <span className="text-[#2ABED2]">{location.name}</span></>
            : `Ready for ${variation}?`}
        </h2>
        <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          {location && related.length >= 2
            ? <>Many {location.name} customers also book <Link href={`/${related[0].slug}/${location.slug}`} className="text-[#2ABED2] font-semibold hover:underline">{related[0].label.toLowerCase()}</Link> and <Link href={`/${related[1].slug}/${location.slug}`} className="text-[#2ABED2] font-semibold hover:underline">{related[1].label.toLowerCase()}</Link> alongside their {service.name.toLowerCase()}, same team, same equipment, and usually cheaper than booking separately.</>
            : location
              ? <>Join thousands of {location.name} homeowners who already trust us with their properties. Transparent pricing, no surprises, and a guarantee that puts you in control.</>
              : `Thousands of homeowners already trust us. Transparent pricing, no surprises, and a guarantee that puts you in control.`}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={scrollToQuoteForm}
            className="inline-flex items-center gap-3 bg-cta hover:bg-cta-hover text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg"
          >
            Get My Free Quote
            <ArrowRight className="w-5 h-5" />
          </button>

          {service.slug === 'carpet-cleaning' && (
            <>
              <span className="text-slate-500 text-sm font-medium hidden sm:block">or</span>
              <BookOnlineButton className="inline-flex items-center gap-2.5 bg-cta hover:bg-cta-hover text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg">
                <CalendarCheck className="w-5 h-5" />
                <span>Book Online</span>
              </BookOnlineButton>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
            <span>{reviewStatsDisplay.averageRating} from {reviewStatsDisplay.totalReviews} reviews</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Fully insured</span>
          </div>
          <span>{customerStatsDisplay.totalCustomersPlus} customers served</span>
        </div>
      </div>
    </section>
  );
}

export default ServiceFullWidthCTA;
