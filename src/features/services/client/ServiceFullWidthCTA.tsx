'use client';

import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { reviewStatsDisplay, customerStatsDisplay } from '@/lib/constants';

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

  const locationText = location ? ` in ${location.name}` : '';

  return (
    <section className="bg-slate-900 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Ready for Professional {service.name}{locationText}?
        </h2>
        <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Fixed pricing. No hidden fees. Free re-clean if not satisfied.
        </p>

        <button
          onClick={scrollToQuoteForm}
          className="inline-flex items-center gap-3 bg-cta hover:bg-cta-hover text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg mb-8"
        >
          Get My Free Quote
          <ArrowRight className="w-5 h-5" />
        </button>

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
