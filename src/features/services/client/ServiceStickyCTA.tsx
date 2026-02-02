'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/constants';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';

interface ServiceStickyCTAProps {
  service: Service;
  location?: Location;
}

export function ServiceStickyCTA({ service: _service, location: _location }: ServiceStickyCTAProps) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const endTrigger = document.getElementById('final-cta');

      let shouldShow = false;

      // Logic for showing the sticky bar
      shouldShow = window.scrollY > 800;

      // Logic for hiding the sticky bar (when reaching Final CTA)
      if (shouldShow && endTrigger) {
        const endRect = endTrigger.getBoundingClientRect();
        if (endRect.top < window.innerHeight) {
          shouldShow = false;
        }
      }

      setShowStickyCTA(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* Mobile Sticky CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-2 pb-[5%] md:hidden transition-transform duration-300 ease-out z-50 flex gap-2 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button
          onClick={() => window.location.href = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
          className="flex-1 bg-slate-100 text-slate-900 font-bold py-2.5 px-2 rounded-lg flex items-center justify-center gap-2 active:bg-slate-200 text-sm whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          {siteConfig.contact.phone}
        </button>
        <button
          onClick={scrollToForm}
          className="flex-1 bg-[#E30663] text-white font-bold py-2.5 px-4 rounded-lg shadow-sm text-sm active:bg-[#C20555]"
        >
          See My Price
        </button>
      </div>
    </>
  );
}

export default ServiceStickyCTA;
