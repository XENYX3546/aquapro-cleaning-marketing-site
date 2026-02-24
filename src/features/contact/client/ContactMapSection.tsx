'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const mapData = {
  title: 'Exterior Cleaning Coverage',
  description: 'Extensive coverage across Essex and surrounding counties for all exterior cleaning services including roof cleaning, pressure washing, driveway and patio cleaning, and gutter cleaning.',
  mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1270069.1125708574!2d-0.3807010203125!3d51.76485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d89760d54c8bf1%3A0xab0b9d60e893a6dd!2sEssex%2C%20UK!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus',
};

export function ContactMapSection() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load: only load iframe when element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-neutral-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
            Service Areas
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-8">
            Aquapro Cleaning <span className="text-primary-700">Coverage Areas</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative w-full h-[500px] bg-neutral-100 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
          {isVisible ? (
            <iframe
              src={mapData.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${mapData.title}`}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 animate-pulse flex items-center justify-center">
              <span className="text-neutral-400 text-sm">Loading map...</span>
            </div>
          )}

          {/* Info Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-lg border border-neutral-100 z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900">{mapData.title}</h4>
                <p className="text-sm text-neutral-500 mt-1">{mapData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
