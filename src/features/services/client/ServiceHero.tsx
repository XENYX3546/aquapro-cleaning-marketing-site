'use client';

import Image from 'next/image';
import { Star, Check } from 'lucide-react';
import { LeadForm } from '@/components/ui/LeadForm';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { reviewStatsDisplay } from '@/lib/constants';

const HERO_BG = "/images/blake-van-image.jpg";

const Logos = () => (
  <div className="flex flex-col items-center lg:items-start gap-4 pt-8">
    <span className="text-slate-500 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase">
      Approved & Accredited By
    </span>

    <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 items-center">
      {/* Google Guaranteed */}
      <div className="flex flex-col items-center group cursor-default">
        <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-bold text-white">Google</span>
        </div>
        <div className="bg-green-700 text-[9px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1 shadow-sm">
          Guaranteed
        </div>
      </div>

      {/* Smart Seal */}
      <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-lg font-black text-white italic tracking-tighter">
          Smart
        </span>
        <span className="text-lg font-black text-slate-500 italic tracking-tighter">
          Seal
        </span>
      </div>

      {/* City & Guilds */}
      <div className="flex flex-col items-start leading-none opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex gap-0.5">
          <span className="text-xs font-bold text-white">City&</span>
        </div>
        <span className="text-xs font-bold text-white">Guilds</span>
        <div className="w-full h-[2px] bg-[#1B9CB6] mt-0.5" />
      </div>
    </div>
  </div>
);

interface ServiceHeroProps {
  service: Service;
  location?: Location;
}

export function ServiceHero({ service, location }: ServiceHeroProps) {
  // Use custom hero checkpoints if available, otherwise first 3 benefits
  const checkpoints = service.hero?.checkpoints || service.benefits.slice(0, 3);

  // Custom hero content
  const hasCustomHero = !!service.hero && !location;

  // Location-aware text
  const locationText = location ? ` in ${location.name}` : '';
  const localTeamText = location ? `Local ${location.county} team.` : '';

  return (
    <div className="relative bg-[#0F172A] pt-8 pb-6 md:pb-12 lg:py-24 overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 bg-slate-800">
        <Image
          src={HERO_BG}
          alt={`Professional ${service.name}${locationText}`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={65}
          className="object-cover object-center transition-opacity duration-500 opacity-90"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-slate-900/[0.87] lg:bg-gradient-to-r lg:from-slate-900/75 lg:via-slate-900/65 lg:to-slate-900/35 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Column: Copy */}
          <div className="lg:col-span-7 text-center lg:text-left mb-8 lg:mb-0">

            {/* Reviews Line */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
               <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-slate-300 text-xs lg:text-sm font-medium">{reviewStatsDisplay.averageRating} based on {reviewStatsDisplay.totalReviews} verified reviews</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 lg:mb-6">
              {location ? (
                <>
                  {service.name} <br />
                  <span className="text-[#1B9CB6]">in {location.name}</span>
                </>
              ) : hasCustomHero ? (
                <>
                  {service.hero!.headline} <br />
                  {service.hero!.subheadline && (
                    <span className="text-[#1B9CB6]">{service.hero!.subheadline}</span>
                  )}
                </>
              ) : (
                <>
                  Professional <br />
                  <span className="text-[#1B9CB6]">{service.name}</span>
                </>
              )}
            </h1>

            {/* Subtext */}
            <p className="text-base lg:text-lg font-medium text-slate-300 mb-8 lg:mb-12 max-w-lg sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              {location
                ? `Professional ${service.name.toLowerCase()} ${location.localHook}. ${localTeamText}`
                : hasCustomHero
                  ? service.hero!.description
                  : service.description
              }
            </p>

            {/* Checkpoints */}
            <div className="flex justify-center lg:justify-start mb-8 lg:mb-0">
              <ul className="space-y-3 text-left inline-flex flex-col">
                {checkpoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#22c55e] flex items-center justify-center mt-0.5 bg-transparent">
                      <Check className="w-3.5 h-3.5 text-[#22c55e] stroke-[3px]" />
                    </div>
                    <span className="text-white font-medium text-base lg:text-lg leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Only: Actual Logos */}
            <div className="hidden lg:block">
               <Logos />
            </div>

          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5">
             <LeadForm
               title={location ? `Get My Free Quote in ${location.name}` : hasCustomHero ? service.hero!.formTitle : `Get My Free ${service.shortName} Quote`}
               subtitle={location
                 ? `Fast, fixed-price ${service.name.toLowerCase()} quote for ${location.name}.`
                 : `Get a fast, fixed-price quote for ${service.name.toLowerCase()}.`
               }
               trustBadges={hasCustomHero ? service.hero!.trustBadges : undefined}
             />

             {/* Mobile Only: Logos re-added under form */}
             <div className="lg:hidden">
                <Logos />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ServiceHero;
