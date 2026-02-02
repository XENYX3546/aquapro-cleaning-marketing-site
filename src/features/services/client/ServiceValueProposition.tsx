'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, ChevronLeft, ChevronRight, Shield, TrendingUp, CalendarCheck } from 'lucide-react';
import type { Service } from '@/lib/constants/services';
import type { Location } from '@/lib/constants/locations';

// Before/After image pairs by service type
const beforeAfterImages: Record<string, { before: string; after: string }[]> = {
  'carpet-cleaning': [
    { before: '/images/carpet-cleaning-before.jpg', after: '/images/carpet-cleaning-after.jpg' },
    { before: '/images/carpet-cleaning-before-2.jpg', after: '/images/carpet-cleaning-after-2.jpg' },
  ],
  'roof-cleaning': [
    { before: '/images/roof-cleaning-before.jpg', after: '/images/roof-cleaning-after.jpg' },
    { before: '/images/roof-cleaning-before-2.jpg', after: '/images/roof-cleaning-after-2.jpg' },
  ],
  // Default to carpet cleaning for services without specific images
  default: [
    { before: '/images/carpet-cleaning-before.jpg', after: '/images/carpet-cleaning-after.jpg' },
  ],
};

function getServiceImages(serviceSlug: string) {
  const images = beforeAfterImages[serviceSlug] || beforeAfterImages.default;
  // Return first pair (could randomize or cycle through pairs)
  return images[0];
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

  // Get service-specific before/after images
  const { before: beforeImage, after: afterImage } = getServiceImages(service.slug);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
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

  // Dynamic benefits based on service
  const valueBenefits = [
    {
      icon: <Shield className="w-5 h-5" strokeWidth={2} />,
      title: service.benefits[0] || "Professional Results",
      description: service.benefits[1] || "Expert service every time."
    },
    {
      icon: <CalendarCheck className="w-5 h-5" strokeWidth={2} />,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee on every job we complete."
    },
    {
      icon: <TrendingUp className="w-5 h-5" strokeWidth={2} />,
      title: "Boosts Property Value",
      description: "Professional cleaning instantly improves your property's appearance."
    }
  ];

  return (
    <section className="pt-12 pb-10 lg:pt-20 lg:pb-12 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-2">Real Results</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
            See The <span className="text-[#1B9CB6]">Transformation</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-lg mx-auto">
             Dramatic results you can see. Professional {service.name.toLowerCase()}{location ? ` in ${location.name}` : ''} that makes a difference.
          </p>
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
              {/* Clean Image (Right Side / Background) - using img for slider compatibility */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={afterImage}
                alt={`After ${service.name.toLowerCase()}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* After Label */}
              <div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20 pointer-events-none select-none z-10 transition-all duration-300"
                style={{ opacity: afterLabelOpacity, transform: `translateX(${sliderPosition > 95 ? '10px' : '0'})` }}
              >
                AFTER
              </div>

              {/* Dirty Image (Left Side / Overlay) - using img for slider compatibility */}
              <div
                className="absolute inset-0 overflow-hidden z-20"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={beforeImage}
                  alt={`Before ${service.name.toLowerCase()}`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerWidth || '100%' }}
                  draggable={false}
                />

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
            <div className="lg:hidden text-center mt-3 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
              <ChevronLeft className="w-3 h-3" /> Drag to compare <ChevronRight className="w-3 h-3" />
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
                    <h4 className="text-slate-900 font-bold text-lg mb-0.5">{benefit.title}</h4>
                    <p className="text-slate-500 text-[15px] leading-relaxed">
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

               <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10 text-[15px] uppercase tracking-wide">
                 What&apos;s Included:
               </h4>
               <ul className="space-y-3 relative z-10">
                  {service.features.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
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
