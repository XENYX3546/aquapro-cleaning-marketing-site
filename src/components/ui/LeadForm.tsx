'use client';

import { Check } from 'lucide-react';
import { useElfsightLazy } from '@/hooks/useElfsightLazy';

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
  const { containerRef, loaded } = useElfsightLazy('viewport');

  return (
    <div ref={containerRef} id={id} className="bg-white p-6 md:p-8 rounded-xl shadow-xl shadow-slate-900/20 border border-slate-100 w-full relative z-10">
      <div className="mb-6 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>

      <div className="relative" style={{ height: 538 }}>
        <div className="absolute inset-0">
          <div className="elfsight-app-59309e4b-fb3a-4595-86ba-1ada85aa4c3a" data-elfsight-app-lazy />
        </div>
        <div className={`absolute inset-0 animate-pulse transition-opacity duration-300 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-col gap-4 h-full">
            <div className="space-y-1"><div className="h-3 bg-slate-100 rounded w-20" /><div className="h-11 bg-slate-100 rounded-lg" /></div>
            <div className="space-y-1"><div className="h-3 bg-slate-100 rounded w-16" /><div className="h-11 bg-slate-100 rounded-lg" /></div>
            <div className="space-y-1"><div className="h-3 bg-slate-100 rounded w-24" /><div className="h-11 bg-slate-100 rounded-lg" /></div>
            <div className="space-y-1"><div className="h-3 bg-slate-100 rounded w-20" /><div className="h-11 bg-slate-100 rounded-lg" /></div>
            <div className="space-y-1 flex-1"><div className="h-3 bg-slate-100 rounded w-24" /><div className="h-full bg-slate-100 rounded-lg" /></div>
            <div className="h-12 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>

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
