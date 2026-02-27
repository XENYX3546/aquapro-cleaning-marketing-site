'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Check, ChevronLeft, ChevronRight, Shield, TrendingUp, CalendarCheck } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';
import { getLocationProfile } from '@/lib/constants/location-profiles';

// Service-specific section content for CRO optimization
type ServiceSectionContent = {
  eyebrow: string;
  headline: string;
  highlightWord: string;
  description: string;
  sliderHint: string;
  inclusions: string[];
};

const serviceSectionContent: Record<string, ServiceSectionContent> = {
  'roof-cleaning': {
    eyebrow: 'See It To Believe It',
    headline: 'Bring Your Roof Back to',
    highlightWord: 'Life',
    description: 'Drag the slider to see how our roof cleaners safely remove 100% of moss, algae, and black stains, transforming your roof in just 1 day. Many homeowners add £10,000–£20,000 to their property value with nothing more than a professional roof clean.',
    sliderHint: 'Drag to see the transformation',
    inclusions: [
      'Free drone survey and expert advice at every step',
      'Specialist roof clean with 5-year moss-free guarantee',
      'Free gutter clean and all waste removed',
    ],
  },
  'carpet-cleaning': {
    eyebrow: 'Real Results',
    headline: 'See Before &',
    highlightWord: 'After',
    description: 'Your carpets will look, feel, and smell like new, or we re-clean for free. Our carpet cleaners use truck-mounted hot water extraction machines that clean at over 150°C, removing up to 98% of embedded dirt, allergens, and stubborn stains that regular vacuuming leaves behind.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'Deep hot water extraction clean',
      'Free deodoriser treatment included',
      'Pre-treatment of all stains and high-traffic areas',
    ],
  },
  'upholstery-cleaning': {
    eyebrow: 'Real Results',
    headline: 'See Before &',
    highlightWord: 'After',
    description: 'Your sofas and furniture will look, feel, and smell like new, or we re-clean for free. Our upholstery cleaners remove embedded dirt, pet odours, and years of use from all fabric types.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'Deep extraction cleaning for all fabrics',
      'Pet odour and stain treatment',
      'Safe for leather, velvet, and delicate materials',
    ],
  },
  'driveway-cleaning': {
    eyebrow: 'Kerb Appeal Restored',
    headline: 'Transform Your',
    highlightWord: 'Driveway',
    description: 'Our driveway cleaners remove years of moss, oil stains, and grime in just hours. A professional driveway clean instantly boosts your home\'s kerb appeal and can add thousands to your property value.',
    sliderHint: 'Drag to see the difference',
    inclusions: [
      'Commercial-grade pressure washing',
      'Re-sanding for block paving included',
      'Optional sealing for lasting protection',
    ],
  },
  'patio-cleaning': {
    eyebrow: 'Outdoor Living Restored',
    headline: 'Revive Your',
    highlightWord: 'Patio',
    description: 'Bring your outdoor space back to life. Our patio cleaners remove green algae, black spot, and years of weathering, leaving your patio ready for summer entertaining.',
    sliderHint: 'Drag to see the difference',
    inclusions: [
      'Safe for all stone types including sandstone',
      'Black spot and algae treatment',
      'Optional sealing to protect and enhance',
    ],
  },
  'window-cleaning': {
    eyebrow: 'Crystal Clear Results',
    headline: 'Sparkling',
    highlightWord: 'Windows',
    description: 'Our window cleaners use pure water technology to deliver a streak-free finish that lasts longer than traditional cleaning. Frames and sills included at no extra cost.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'Pure water fed pole system',
      'Frames and sills cleaned free',
      'Reaches up to 4 storeys safely',
    ],
  },
  'gutter-cleaning': {
    eyebrow: 'Protect Your Property',
    headline: 'Clear, Free-Flowing',
    highlightWord: 'Gutters',
    description: 'Our gutter cleaners use high-reach vacuum systems to clear leaves, moss, and debris, all from the ground. No ladders on your property, just clear gutters that flow freely.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'High-reach vacuum system',
      'Before and after camera footage',
      'All downpipes checked and cleared',
    ],
  },
  'solar-panel-cleaning': {
    eyebrow: 'Maximise Your Investment',
    headline: 'Restore Your Panel',
    highlightWord: 'Efficiency',
    description: 'Dirty panels lose up to 30% efficiency. Our solar panel cleaners use pure water and soft brushes to safely remove bird droppings, dust, and grime, restoring your panels to peak performance.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'Pure water cleaning, no chemicals',
      'Safe for all panel types',
      'Won\'t void your warranty',
    ],
  },
  'conservatory-cleaning': {
    eyebrow: 'Let The Light Back In',
    headline: 'Crystal Clear',
    highlightWord: 'Conservatory',
    description: 'Our conservatory cleaners remove green algae, moss, and grime from your roof, glass, and frames, restoring natural light and making your conservatory feel brand new again.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'Roof, glass, and frames all cleaned',
      'Safe for polycarbonate and glass roofs',
      'Conservatory gutters cleared free',
    ],
  },
  'mattress-cleaning': {
    eyebrow: 'Sleep Healthier',
    headline: 'A Fresher Night\'s',
    highlightWord: 'Sleep',
    description: 'Our mattress cleaners remove dust mites, allergens, sweat, and stains that build up over time. Wake up fresher on a professionally cleaned and sanitised mattress.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'Deep extraction and sanitisation',
      'Dust mite and allergen removal',
      'Urine and stain treatment',
    ],
  },
  'stain-removal': {
    eyebrow: 'Stubborn Stains Gone',
    headline: 'Expert Stain',
    highlightWord: 'Removal',
    description: 'Red wine, coffee, pet accidents... our stain removal specialists tackle the toughest stains on carpets and upholstery. Priority bookings available for fresh spills.',
    sliderHint: 'Drag to compare',
    inclusions: [
      'All stain types treated',
      'Priority bookings for urgent spills',
      'Safe for all fabrics',
    ],
  },
  'pressure-washing': {
    eyebrow: 'Powerful Results',
    headline: 'Surface',
    highlightWord: 'Transformation',
    description: 'Our pressure washing specialists remove years of moss, algae, oil, and grime from driveways, patios, and decking. Adjustable pressure means no damage to your surfaces.',
    sliderHint: 'Drag to see the difference',
    inclusions: [
      'Commercial-grade equipment',
      'Adjustable pressure for all surfaces',
      'Re-sanding for block paving included',
    ],
  },
};

function getServiceContent(serviceSlug: string, serviceName: string): ServiceSectionContent {
  const content = serviceSectionContent[serviceSlug];
  if (content) return content;

  // Default fallback
  return {
    eyebrow: 'Real Results',
    headline: 'See The',
    highlightWord: 'Transformation',
    description: `Your ${serviceName.toLowerCase().replace('&', 'and')} will look like new, or we re-clean for free.`,
    sliderHint: 'Drag to compare',
    inclusions: [],
  };
}

// Before/After image pairs by service type
// Services with multiple pairs assign different images per archetype for visual differentiation
const beforeAfterImages: Record<string, { before: string; after: string }[]> = {
  'carpet-cleaning': [
    { before: '/images/carpet-cleaning-before.jpg', after: '/images/carpet-cleaning-after.jpg' },
    { before: '/images/carpet-cleaning-before-2.jpg', after: '/images/carpet-cleaning-after-2.jpg' },
  ],
  'roof-cleaning': [
    { before: '/images/roof-cleaning-before.jpg', after: '/images/roof-cleaning-after.jpg' },
    { before: '/images/roof-cleaning-before-2.jpg', after: '/images/roof-cleaning-after-2.jpg' },
  ],
  'gutter-cleaning': [
    { before: '/images/gutter-cleaning-before.jpg', after: '/images/gutter-cleaning-after.jpg' },
  ],
  'pressure-washing': [
    { before: '/images/pressure-washing-before.jpg', after: '/images/pressure-washing-after.jpg' },
  ],
  'driveway-cleaning': [
    { before: '/images/pressure-washing-before.jpg', after: '/images/pressure-washing-after.jpg' },
  ],
  'patio-cleaning': [
    { before: '/images/pressure-washing-before.jpg', after: '/images/pressure-washing-after.jpg' },
  ],
  // Default to carpet cleaning for services without specific images
  default: [
    { before: '/images/carpet-cleaning-before.jpg', after: '/images/carpet-cleaning-after.jpg' },
  ],
};

// Archetype-based image index selection — different areas show different before/after photos
// when multiple image pairs are available for a service
const archetypeImageIndex: Record<string, number> = {
  coastal: 1, estuary: 1, thames: 1,
  forest: 0, 'new-build': 0, historic: 1,
  commuter: 0, rural: 1, urban: 0,
};

function getServiceImages(serviceSlug: string, archetype?: string) {
  const images = beforeAfterImages[serviceSlug] || beforeAfterImages.default;
  if (images.length <= 1 || !archetype) return images[0];
  const idx = archetypeImageIndex[archetype] ?? 0;
  return images[idx % images.length];
}

interface ServiceValuePropositionProps {
  service: Service;
  location?: Location;
}

export function ServiceValueProposition({ service, location }: ServiceValuePropositionProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Get service-specific content for CRO
  const sectionContent = getServiceContent(service.slug, service.name);
  const profile = location ? getLocationProfile(location, service.slug) : null;

  // Get service-specific before/after images (archetype varies the image shown)
  const { before: beforeImage, after: afterImage } = getServiceImages(service.slug, profile?.archetype);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Defer initial measurement to avoid forced reflow
    const rafId = requestAnimationFrame(updateWidth);
    window.addEventListener('resize', updateWidth);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) {return;}
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {return;}
      e.preventDefault();
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) {return;}
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMove]);

  const afterLabelOpacity = sliderPosition > 95 ? 0 : 1;
  const beforeLabelOpacity = sliderPosition < 5 ? 0 : 1;

  // Dynamic benefits based on service (pairs: [0]/[1], [2]/[3], [4]/[5])
  const valueBenefits = [
    {
      icon: <Shield className="w-5 h-5" strokeWidth={2} />,
      title: service.benefits[0] || "Professional Results",
      description: service.benefits[1] || "Expert service every time."
    },
    {
      icon: <CalendarCheck className="w-5 h-5" strokeWidth={2} />,
      title: service.benefits[2] || "Satisfaction Guaranteed",
      description: service.benefits[3] || "100% satisfaction guarantee on every job we complete."
    },
    {
      icon: <TrendingUp className="w-5 h-5" strokeWidth={2} />,
      title: service.benefits[4] || "Boosts Property Value",
      description: service.benefits[5] || "Professional cleaning instantly improves your property's appearance."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">{sectionContent.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {sectionContent.headline} <span className="text-[#1B9CB6]">{sectionContent.highlightWord}</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg mt-4 max-w-2xl mx-auto">
             {sectionContent.description}
          </p>
          {profile && location && (
            <>
              <p className="text-slate-500 text-sm md:text-base mt-3 max-w-2xl mx-auto">
                Most properties around {location.name} feature {profile.housingStock}, leaving them particularly susceptible to {profile.environmentalFactors.slice(0, 2).join(' and ')}. Combine that with the area&apos;s {profile.waterHardness} water, which gradually deposits minerals on surfaces and fibres, and you can see why regular deep cleaning makes such a difference here.
              </p>
              {profile.commonProblems.length > 0 && (
                <p className="text-slate-500 text-sm md:text-base mt-3 max-w-2xl mx-auto">
                  In {location.name}, the most common issues we encounter are {profile.commonProblems.join(', ')}. These tend to worsen gradually when left untreated, but a thorough deep clean makes a visible difference straight away.
                </p>
              )}
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center lg:items-stretch">

          {/* LEFT COLUMN: Before/After Slider */}
          <div className="relative group lg:h-full">
            {/* Decorative background blob */}
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-[2rem] -z-10 opacity-70 blur-xl" />

            <div
              ref={containerRef}
              className="relative w-full aspect-[3/2] sm:aspect-[16/9] lg:aspect-auto lg:h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 select-none cursor-ew-resize ring-1 ring-black/5"
            >
              {/* Clean Image (Right Side / Background) */}
              <Image
                src={afterImage}
                alt={`Clean carpet after professional ${service.name.toLowerCase()}, stains and dirt removed`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={50}
                className="object-cover"
                draggable={false}
              />

              {/* After Label */}
              <div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20 pointer-events-none select-none z-10 transition-all duration-300"
                style={{ opacity: afterLabelOpacity, transform: `translateX(${sliderPosition > 95 ? '10px' : '0'})` }}
              >
                AFTER
              </div>

              {/* Dirty Image (Left Side / Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden z-20"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0" style={{ width: containerWidth || '100%' }}>
                  <Image
                    src={beforeImage}
                    alt={`Stained carpet before professional ${service.name.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={50}
                    className="object-cover"
                    draggable={false}
                  />
                </div>

                {/* Before Label */}
                 <div
                   className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/10 pointer-events-none select-none z-30 transition-all duration-300"
                   style={{ opacity: beforeLabelOpacity, transform: `translateX(${sliderPosition < 5 ? '-10px' : '0'})` }}
                 >
                  BEFORE
                </div>
              </div>

              {/* Divider Line */}
              <div
                 className="absolute inset-y-0 w-1 bg-white z-30 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.25)]"
                 style={{ left: `${sliderPosition}%` }}
               />

              {/* Slider Handle */}
              <div
                className="absolute top-1/2 -mt-7 -ml-7 w-14 h-14 z-40 flex items-center justify-center outline-none touch-none"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
              >
                <div className="w-11 h-11 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-grab active:cursor-grabbing transform transition-transform hover:scale-110 active:scale-95 ring-4 ring-white/30 backdrop-blur-sm">
                  <div className="flex gap-0.5 text-[#1B9CB6]">
                    <ChevronLeft className="w-4 h-4 stroke-[3px]" />
                    <ChevronRight className="w-4 h-4 stroke-[3px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only interaction hint */}
            <div className="lg:hidden text-center mt-3 text-xs text-slate-500 font-medium flex items-center justify-center gap-2">
              <ChevronLeft className="w-3 h-3" /> {sectionContent.sliderHint} <ChevronRight className="w-3 h-3" />
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="flex flex-col h-full justify-center">

            {/* Benefits Grid */}
            <div className="space-y-6 mb-8 lg:mb-10">
              {valueBenefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 group items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1B9CB6]/10 flex items-center justify-center text-[#1B9CB6] group-hover:bg-[#1B9CB6]/20 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-slate-900 font-bold text-lg mb-0.5">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inclusions Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
               {/* Decorative accent */}
               <div className="absolute top-0 right-0 w-20 h-20 bg-[#1B9CB6]/5 rounded-bl-full -mr-4 -mt-4" />

               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10 text-sm uppercase tracking-wide">
                 What&apos;s Included:
               </h3>
               <ul className="space-y-3 relative z-10">
                  {(sectionContent.inclusions.length > 0 ? sectionContent.inclusions : service.features.slice(0, 3)).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#1B9CB6] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white stroke-[3px]" />
                      </div>
                      <span className="min-w-0 flex-1">{item}</span>
                    </li>
                  ))}
               </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceValueProposition;
