'use client';

import Image from 'next/image';
import { ShieldCheck, Users, Award, Star, ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { reviewStatsDisplay, customerStatsDisplay } from '@/lib/constants';

const HOUSE_IMAGE = "/images/blake-window-cleaning.jpg";

interface ServiceAboutProps {
  service: Service;
  location?: Location;
}

// Mobile trust stats component
function MobileTrustStats() {
  return (
    <section className="lg:hidden py-16 bg-white font-sans relative">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by <span className="text-[#1B9CB6]">{customerStatsDisplay.totalCustomersPlus} Customers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Stat 1 */}
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" strokeWidth={2} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Trained Pros</h3>
            <p className="text-slate-500 text-xs">Certified Team</p>
          </div>

          {/* Stat 2 */}
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5" strokeWidth={2} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{customerStatsDisplay.totalCustomersShort} Clients</h3>
            <p className="text-slate-500 text-xs">Happy Customers</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5" strokeWidth={2} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">5 Star Rated</h3>
            <p className="text-slate-500 text-xs">{reviewStatsDisplay.totalReviews} Reviews</p>
          </div>

          {/* Stat 4 */}
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" strokeWidth={2} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Fully Insured</h3>
            <p className="text-slate-500 text-xs">100% Protection</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceAbout({ service, location }: ServiceAboutProps) {
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const locationText = location ? ` in ${location.name}` : '';

  return (
    <>
    {/* Mobile Trust Stats */}
    <MobileTrustStats />

    {/* Desktop About Section */}
    <section className="hidden lg:block py-24 bg-white font-sans relative">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex gap-20 items-center">

          {/* Left Column: Image */}
          <div className="w-1/2 relative">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 bg-slate-100 aspect-square">
                <Image
                  src={HOUSE_IMAGE}
                  alt={`Professional ${service.name}${locationText}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={65}
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#1B9CB6]/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Column: About Content */}
          <div className="w-1/2">
             <div className="mb-8">
                <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
                   {location ? `Serving ${location.name}` : 'Why Choose Us'}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                   Expert {service.name}{locationText} <span className="text-[#1B9CB6]">You Can Trust</span>
                </h2>
                <div className="space-y-4 text-slate-600 text-base md:text-lg">
                   <p>
                      Over {customerStatsDisplay.totalCustomersPlus} Essex homeowners trust us for {service.name.toLowerCase()}. Commercial-grade equipment. Trained technicians. Done right, first time.
                   </p>
                   <p>
                      Free re-clean if not satisfied. Fully insured. No hidden fees.{location?.postcodeAreas && location.postcodeAreas.length > 0 ? ` We cover all ${location.postcodeAreas.join(', ')} postcodes.` : ''}
                   </p>
                </div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-10 pt-4">
                {/* Stat 1 */}
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" strokeWidth={2} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-none mb-1">Trained Pros</h3>
                      <p className="text-slate-500 text-sm">Certified Team</p>
                   </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" strokeWidth={2} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-none mb-1">{customerStatsDisplay.totalCustomersShort} Clients</h3>
                      <p className="text-slate-500 text-sm">Happy Customers</p>
                   </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center shrink-0">
                      <Star className="w-6 h-6" strokeWidth={2} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-none mb-1">5 Star Rated</h3>
                      <p className="text-slate-500 text-sm">{reviewStatsDisplay.totalReviews} Reviews</p>
                   </div>
                </div>

                {/* Stat 4 */}
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1B9CB6] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6" strokeWidth={2} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-none mb-1">Fully Insured</h3>
                      <p className="text-slate-500 text-sm">100% Protection</p>
                   </div>
                </div>
             </div>

             {/* CTA Button */}
             <button
                onClick={scrollToQuoteForm}
                className="bg-[#E30663] hover:bg-[#C20555] text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-[#E30663]/20 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 text-lg"
             >
                Get My Free Quote
                <ArrowRight className="w-5 h-5" />
             </button>

          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default ServiceAbout;
