'use client';

import { Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function ServiceMiniCTA() {
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form') || document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-6 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: stacked and centered */}
        <div className="flex flex-col items-center gap-4 md:hidden">
          <p className="text-white font-semibold text-center">
            Ready to transform your property?
          </p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 text-white font-bold py-2.5 px-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              Call Us
            </a>
            <button
              onClick={scrollToQuoteForm}
              className="bg-cta hover:bg-cta-hover text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
            >
              Get My Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <p className="text-white font-semibold">
            Ready to transform your property?
          </p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 text-white font-bold py-2.5 px-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              {siteConfig.contact.phone}
            </a>
            <button
              onClick={scrollToQuoteForm}
              className="bg-cta hover:bg-cta-hover text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
            >
              Get My Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceMiniCTA;
