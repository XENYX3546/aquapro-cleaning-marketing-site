'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';

const DEFAULT_TRUST_BADGES = [
  'Fully Insured',
  '100% Satisfaction Guarantee',
  'No Hidden Fees',
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
  // Load the Zuvia widget script
  useEffect(() => {
    const scriptSrc = 'https://app.zuviaone.com/api/public/widgets/02b58ca7-a579-49da-a6ae-d21620d7fee5/embed.js';

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div id={id} className="bg-white p-6 md:p-8 rounded-xl shadow-xl shadow-slate-900/20 border border-slate-100 w-full relative z-10">
      <div className="mb-6 text-center lg:text-left">
        <h3 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h3>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
        {trustBadges && trustBadges.length > 0 && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 mt-3">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#22c55e] stroke-[2.5px]" />
                <span className="text-slate-600 text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zuvia Quote Request Widget */}
      <div className="quote-request-widget-02b58ca7-a579-49da-a6ae-d21620d7fee5" />
    </div>
  );
}

export default LeadForm;
