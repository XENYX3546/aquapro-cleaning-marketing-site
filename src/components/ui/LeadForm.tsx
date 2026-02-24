'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const DEFAULT_TRUST_BADGES = [
  'Fully Insured',
  '100% Satisfaction Guarantee',
];

interface LeadFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  trustBadges?: string[];
}

export function LeadForm({
  id = "quote-form",
  title = "Get My Free Quote",
  subtitle = "Get a fast, fixed-price quote for your home.",
  trustBadges = DEFAULT_TRUST_BADGES
}: LeadFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load: only load script when form is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load the Elfsight platform script only when visible
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const scriptSrc = 'https://elfsightcdn.com/platform.js';

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} id={id} className="bg-white p-6 md:p-8 rounded-xl shadow-xl shadow-slate-900/20 border border-slate-100 w-full relative z-10">
      <div className="mb-6 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>

      {/* Elfsight Contact Form */}
      <div className="elfsight-app-59309e4b-fb3a-4595-86ba-1ada85aa4c3a" data-elfsight-app-lazy />

      {trustBadges && trustBadges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-slate-400 stroke-[2.5px]" />
              <span className="text-slate-400 text-xs font-medium">{badge}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeadForm;
