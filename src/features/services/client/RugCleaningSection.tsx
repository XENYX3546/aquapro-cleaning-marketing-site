'use client';

import { Check, ArrowRight } from 'lucide-react';
import type { Location } from '@/lib/constants/locations';

const rugTypes = [
  { name: 'Persian Rugs', detail: 'Hand-knotted wool and silk, colour-safe wash' },
  { name: 'Oriental Rugs', detail: 'Chinese, Turkish, Indian, fibre-appropriate methods' },
  { name: 'Wool & Silk Rugs', detail: 'Low-moisture cleaning, no shrinkage or bleeding' },
  { name: 'Handmade & Antique Rugs', detail: 'Gentle hand-cleaning, fringe restoration' },
  { name: 'Area Rugs & Runners', detail: 'All sizes, including large living room rugs' },
  { name: 'Shaggy & High-Pile Rugs', detail: 'Deep extraction without matting fibres' },
];

interface RugCleaningSectionProps {
  location?: Location;
}

export function RugCleaningSection({ location }: RugCleaningSectionProps) {
  const locationText = location ? ` ${location.name}` : '';

  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('contact') || document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
            Specialist Service
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Professional Rug Cleaning{locationText && <span className="text-[#1B9CB6]">{locationText}</span>}
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            From delicate Persian and Oriental rugs to everyday area rugs, we clean all rug types with specialist methods that protect fibres, colours, and fringes.
          </p>
        </div>

        {/* Rug types grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rugTypes.map((rug) => (
            <div
              key={rug.name}
              className="bg-white p-6 rounded-xl border border-slate-100 hover:border-[#1B9CB6]/30 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B9CB6]/5 flex items-center justify-center shrink-0 group-hover:bg-[#1B9CB6] transition-all duration-300">
                  <Check className="w-4 h-4 text-[#1B9CB6] group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{rug.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{rug.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={scrollToQuoteForm}
            className="inline-flex items-center gap-3 bg-cta hover:bg-cta-hover text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg"
          >
            Get My Free Rug Cleaning Quote
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default RugCleaningSection;
