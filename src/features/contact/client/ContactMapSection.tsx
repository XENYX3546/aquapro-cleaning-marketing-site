'use client';

import { useState, useEffect, useRef } from 'react';
import { Home, Shield, MapPin } from 'lucide-react';

type MapView = 'interior' | 'exterior';

const viewData = {
  interior: {
    title: 'Interior Cleaning Coverage',
    description: 'We cover the entire Essex county for all interior services including carpet cleaning, sofa cleaning, and upholstery cleaning.',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d635034.5562854287!2d0.11929897968750002!3d51.76485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d89760d54c8bf1%3A0xab0b9d60e893a6dd!2sEssex%2C%20UK!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus',
  },
  exterior: {
    title: 'Exterior Cleaning Coverage',
    description: 'Extensive coverage across Essex and surrounding counties for all exterior cleaning services including roof, pressure washing, and gutter cleaning.',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1270069.1125708574!2d-0.3807010203125!3d51.76485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d89760d54c8bf1%3A0xab0b9d60e893a6dd!2sEssex%2C%20UK!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus',
  },
};

const tabs = [
  { id: 'interior' as const, icon: Home, label: 'Interior Cleaning', sublabel: 'Essex Coverage' },
  { id: 'exterior' as const, icon: Shield, label: 'Exterior Cleaning', sublabel: 'Wide Area Coverage' },
];

export function ContactMapSection() {
  const [activeView, setActiveView] = useState<MapView>('interior');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentView = viewData[activeView];

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
            Our <span className="text-primary-700">Locations & Coverage</span>
          </h2>

          {/* Tab Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 max-w-4xl mx-auto mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3 group ${
                    isActive
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-neutral-100 bg-white hover:border-primary-200 hover:bg-neutral-50'
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-400 group-hover:text-primary-500'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                    <div className={`font-bold text-sm ${isActive ? 'text-neutral-900' : 'text-neutral-600'}`}>
                      {tab.label}
                    </div>
                    <div className="text-xs text-neutral-500">{tab.sublabel}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={containerRef} className="relative w-full h-[500px] bg-neutral-100 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
          {isVisible ? (
            <iframe
              src={currentView.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${currentView.title}`}
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
                <h4 className="font-bold text-neutral-900">{currentView.title}</h4>
                <p className="text-sm text-neutral-500 mt-1">{currentView.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
