'use client';

import { useState, useEffect, useRef } from 'react';
import { type Location } from '@/lib/constants';

type ServiceAreaMapProps = {
  location: Location;
  serviceName: string;
  className?: string;
  /** Render as a full background (no container styling) */
  asBackground?: boolean;
};

// Coordinates for Essex locations (approximate centers)
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  // Core locations
  'basildon': { lat: 51.5761, lng: 0.4886 },
  'southend-on-sea': { lat: 51.5459, lng: 0.7077 },
  'chelmsford': { lat: 51.7356, lng: 0.4685 },
  'brentwood': { lat: 51.6208, lng: 0.3058 },
  'billericay': { lat: 51.6282, lng: 0.4185 },
  'wickford': { lat: 51.6114, lng: 0.5237 },
  'rayleigh': { lat: 51.5865, lng: 0.6050 },
  'benfleet': { lat: 51.5489, lng: 0.5614 },
  'canvey-island': { lat: 51.5224, lng: 0.5853 },
  'grays': { lat: 51.4757, lng: 0.3251 },
  'stanford-le-hope': { lat: 51.5135, lng: 0.4254 },
  'tilbury': { lat: 51.4607, lng: 0.3586 },
  'leigh-on-sea': { lat: 51.5419, lng: 0.6538 },
  'westcliff-on-sea': { lat: 51.5365, lng: 0.6850 },
  'rochford': { lat: 51.5822, lng: 0.7071 },
  'hockley': { lat: 51.6032, lng: 0.6567 },
  'maldon': { lat: 51.7316, lng: 0.6755 },
  'witham': { lat: 51.7971, lng: 0.6380 },
  'braintree': { lat: 51.8782, lng: 0.5510 },
  'colchester': { lat: 51.8959, lng: 0.8919 },
  'wivenhoe': { lat: 51.8573, lng: 0.9573 },
  'west-mersea': { lat: 51.7811, lng: 0.9208 },
  'brightlingsea': { lat: 51.8117, lng: 1.0283 },
  'dedham': { lat: 51.9567, lng: 1.0017 },
  'clacton-on-sea': { lat: 51.7899, lng: 1.1567 },
  'harlow': { lat: 51.7727, lng: 0.1024 },
  'epping': { lat: 51.6990, lng: 0.1116 },
  'loughton': { lat: 51.6462, lng: 0.0554 },
  'chigwell': { lat: 51.6253, lng: 0.0764 },
  'harwich': { lat: 51.9450, lng: 1.2878 },
  'buckhurst-hill': { lat: 51.6267, lng: 0.0347 },
  'chingford': { lat: 51.6233, lng: -0.0097 },
  'rainham': { lat: 51.5208, lng: 0.1936 },
  'coggeshall': { lat: 51.8706, lng: 0.6878 },
  'danbury': { lat: 51.7178, lng: 0.5017 },
  'ingatestone': { lat: 51.6608, lng: 0.3858 },
  'south-woodham-ferrers': { lat: 51.6478, lng: 0.6078 },
  'waltham-abbey': { lat: 51.6867, lng: -0.0033 },
  'ongar': { lat: 51.7060, lng: 0.2445 },
  'saffron-walden': { lat: 52.0231, lng: 0.2432 },
  'great-dunmow': { lat: 51.8717, lng: 0.3617 },
  'halstead': { lat: 51.9444, lng: 0.6383 },
  'burnham-on-crouch': { lat: 51.6311, lng: 0.8178 },
  'frinton-on-sea': { lat: 51.8339, lng: 1.2456 },
  'walton-on-the-naze': { lat: 51.8489, lng: 1.2678 },
  'manningtree': { lat: 51.9450, lng: 1.0661 },
  'stansted-mountfitchet': { lat: 51.9017, lng: 0.1917 },
  'tiptree': { lat: 51.8217, lng: 0.7417 },
  // Greater London locations
  'romford': { lat: 51.5768, lng: 0.1801 },
  'hornchurch': { lat: 51.5565, lng: 0.2183 },
  'upminster': { lat: 51.5561, lng: 0.2508 },
  'ilford': { lat: 51.5588, lng: 0.0799 },
  'woodford': { lat: 51.6075, lng: 0.0216 },
  'barking': { lat: 51.5397, lng: 0.0808 },
  'dagenham': { lat: 51.5465, lng: 0.1465 },
  'stratford': { lat: 51.5423, lng: -0.0033 },
  'walthamstow': { lat: 51.5908, lng: -0.0217 },
  'leyton': { lat: 51.5667, lng: -0.0117 },
  'east-ham': { lat: 51.5317, lng: 0.0517 },
  'wanstead': { lat: 51.5808, lng: 0.0286 },
  // Boundary reference points (not served locations)
  'enfield': { lat: 51.6517, lng: -0.0817 },
  'cheshunt': { lat: 51.7017, lng: -0.0317 },
  'sawbridgeworth': { lat: 51.8117, lng: 0.1517 },
  'bishops-stortford': { lat: 51.8717, lng: 0.1617 },
  'hackney': { lat: 51.5467, lng: -0.0556 },
  'nayland': { lat: 51.9717, lng: 0.8717 },
  'stoke-by-nayland': { lat: 51.9817, lng: 0.9017 },
  'bures': { lat: 51.9717, lng: 0.7717 },
  'stratford-st-mary': { lat: 51.9717, lng: 0.9917 },
};

export function ServiceAreaMap({ location, serviceName, className = '', asBackground = false }: ServiceAreaMapProps) {
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
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const coords = locationCoordinates[location.slug];

  // Use the search-based embed which doesn't require API key
  const mapUrl = coords
    ? `https://www.google.com/maps?q=${encodeURIComponent(location.name + ', Essex, UK')}&output=embed`
    : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317838.05093978894!2d0.35937365!3d51.6282879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a5d5c7f3b7d7%3A0x3de4d6e4f9e6f0a0!2sEssex%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890';

  // Background mode: full coverage, no container styling
  if (asBackground) {
    return (
      <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
        <iframe
          src={mapUrl}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title={`${serviceName} service area in ${location.name}`}
        />
      </div>
    );
  }

  // Standard mode with container
  return (
    <div ref={containerRef} className={`bg-neutral-100 rounded-xl overflow-hidden ${className}`}>
      {isVisible ? (
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${serviceName} service area in ${location.name}`}
        />
      ) : (
        <div className="w-full h-[300px] bg-neutral-200 animate-pulse flex items-center justify-center">
          <span className="text-neutral-400 text-sm">Loading map...</span>
        </div>
      )}
      <div className="p-4 bg-white border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          We provide {serviceName.toLowerCase()} services throughout {location.name}
          {location.postcodeAreas && location.postcodeAreas.length > 0 && (
            <> covering postcodes {location.postcodeAreas.join(', ')}</>
          )}.
        </p>
      </div>
    </div>
  );
}
