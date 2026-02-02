'use client';

import { ShieldCheck, CalendarCheck, Umbrella, Wallet, Sparkles, Leaf } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';

interface ServiceGuaranteesProps {
  service: Service;
  location?: Location;
}

export function ServiceGuarantees({ service, location: _location }: ServiceGuaranteesProps) {
  const guarantees = [
    {
      icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Satisfaction Guaranteed",
      description: "Not happy with the results? We'll re-clean for free until you're completely satisfied."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "No Damage Promise",
      description: "We use safe, professional techniques. If anything goes wrong, we make it right."
    },
    {
      icon: <Umbrella className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fully Insured",
      description: "Rest easy knowing your property is fully protected by our comprehensive insurance."
    },
    {
      icon: <Wallet className="w-6 h-6" strokeWidth={1.5} />,
      title: "Fixed Price Quotes",
      description: "No hidden fees or surprises. The price we quote is the price you pay."
    },
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
      title: "Professional Results",
      description: "Our trained technicians use commercial-grade equipment for the best possible outcome."
    },
    {
      icon: <Leaf className="w-6 h-6" strokeWidth={1.5} />,
      title: "Eco-Friendly",
      description: "We use biodegradable, pet-safe solutions that are gentle on the environment."
    }
  ];

  return (
    <section className="pt-14 pb-12 lg:pt-24 lg:pb-24 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm lg:text-sm block mb-2 lg:mb-3">Peace of Mind</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Our {service.shortName} <br />
            <span className="text-[#1B9CB6]">Guarantee</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-slate-100 hover:border-[#1B9CB6]/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col items-start gap-4 h-full"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-[#1B9CB6]/5 flex items-center justify-center shrink-0 group-hover:bg-[#1B9CB6] group-hover:scale-110 transition-all duration-300">
                <div className="text-[#1B9CB6] group-hover:text-white transition-colors duration-300">
                  {guarantee.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {guarantee.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {guarantee.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServiceGuarantees;
