'use client';

import { Sparkles, Heart, Zap, Award, Coffee, Globe } from 'lucide-react';
import { careersBenefits } from '@/lib/constants';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Coffee: <Coffee className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

export function CareersBenefits() {
  return (
    <section id="benefits" className="pt-16 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Values
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Why Join <span className="text-brand-600">Aquapro</span>?
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            We invest in the best equipment and the best people to deliver a superior
            shine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careersBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-brand-200 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                {iconMap[benefit.icon] || <Sparkles className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
