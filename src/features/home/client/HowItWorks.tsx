'use client';

import Link from 'next/link';
import { ClipboardCheck, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { ctaLinks } from '@/lib/constants';

const steps = [
  {
    number: '01',
    title: 'Get Your Free Quote',
    description:
      'Contact us for a tailored estimate. We use remote technology for exterior quotes and detailed consultations for interior projects to give you a fixed price.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'The Specialist Clean',
    description:
      'Our uniformed, fully insured team arrives on time with industrial-grade equipment. From steam cleaning carpets to soft-washing roofs, we handle it all.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Satisfaction Guaranteed',
    description:
      'We inspect the work with you upon completion. You only pay when you are 100% happy with the results. All services come with our quality guarantee.',
    icon: ShieldCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Professional Cleaning,{' '}
            <span className="text-brand-500">Made Simple</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Whether you need interior deep cleaning or complete exterior
            restoration, our seamless process ensures minimal disruption and
            maximum results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-start"
            >
              {/* Large Number Background */}
              <div className="absolute -right-6 -top-10 select-none pointer-events-none">
                <span className="text-[160px] font-black text-slate-100/50 leading-none">
                  {step.number}
                </span>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center shadow-sm mb-6">
                  <step.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={ctaLinks.quote}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Start Your Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
