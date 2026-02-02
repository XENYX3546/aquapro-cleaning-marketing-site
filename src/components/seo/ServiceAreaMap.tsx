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
  'stanway': { lat: 51.8789, lng: 0.8389 },
  'brightlingsea': { lat: 51.8117, lng: 1.0283 },
  'dedham': { lat: 51.9567, lng: 1.0017 },
  'marks-tey': { lat: 51.8756, lng: 0.7728 },
  'rowhedge': { lat: 51.8506, lng: 0.9428 },
  'great-horkesley': { lat: 51.9317, lng: 0.8756 },
  'boxted': { lat: 51.9489, lng: 0.9239 },
  'ardleigh': { lat: 51.9206, lng: 1.0028 },
  'thorpe-le-soken': { lat: 51.8439, lng: 1.1639 },
  'west-bergholt': { lat: 51.9089, lng: 0.8356 },
  'layer-de-la-haye': { lat: 51.8428, lng: 0.8494 },
  'clacton-on-sea': { lat: 51.7899, lng: 1.1567 },
  'harlow': { lat: 51.7727, lng: 0.1024 },
  'epping': { lat: 51.6990, lng: 0.1116 },
  'loughton': { lat: 51.6462, lng: 0.0554 },
  'chigwell': { lat: 51.6253, lng: 0.0764 },
  // High Priority Additions
  'harwich': { lat: 51.9450, lng: 1.2878 },
  'buckhurst-hill': { lat: 51.6267, lng: 0.0347 },
  'shenfield': { lat: 51.6308, lng: 0.3297 },
  'chingford': { lat: 51.6233, lng: -0.0097 },
  'rainham': { lat: 51.5208, lng: 0.1936 },
  'great-baddow': { lat: 51.7178, lng: 0.5017 },
  'broomfield': { lat: 51.7611, lng: 0.4539 },
  'springfield': { lat: 51.7478, lng: 0.4878 },
  'coggeshall': { lat: 51.8706, lng: 0.6878 },
  'shoeburyness': { lat: 51.5317, lng: 0.7989 },
  // Southend Area
  'thorpe-bay': { lat: 51.5367, lng: 0.7567 },
  'prittlewell': { lat: 51.5517, lng: 0.7017 },
  'great-wakering': { lat: 51.5533, lng: 0.8117 },
  'hullbridge': { lat: 51.6089, lng: 0.6728 },
  'hawkwell': { lat: 51.5972, lng: 0.6767 },
  // Thurrock
  'south-ockendon': { lat: 51.5139, lng: 0.2856 },
  'chafford-hundred': { lat: 51.4878, lng: 0.2817 },
  'chadwell-st-mary': { lat: 51.4717, lng: 0.3689 },
  // Tendring Coast
  'jaywick': { lat: 51.7778, lng: 1.1178 },
  'holland-on-sea': { lat: 51.8017, lng: 1.0978 },
  'dovercourt': { lat: 51.9317, lng: 1.2689 },
  'mistley': { lat: 51.9433, lng: 1.0817 },
  'weeley': { lat: 51.8517, lng: 1.1117 },
  // Central Essex
  'heybridge': { lat: 51.7389, lng: 0.6917 },
  'southminster': { lat: 51.6617, lng: 0.8417 },
  'hatfield-peverel': { lat: 51.7817, lng: 0.5917 },
  'stock': { lat: 51.6589, lng: 0.4278 },
  // West Essex
  'theydon-bois': { lat: 51.6717, lng: 0.1017 },
  'north-weald': { lat: 51.7217, lng: 0.1617 },
  'hainault': { lat: 51.6078, lng: 0.0917 },
  // Brentwood Area
  'hutton': { lat: 51.6217, lng: 0.3389 },
  // ===== Closing the Gap: All Referenced nearbyAreas =====
  // Basildon/South Essex
  'laindon': { lat: 51.5689, lng: 0.4217 },
  'south-benfleet': { lat: 51.5456, lng: 0.5556 },
  'eastwood': { lat: 51.5617, lng: 0.6317 },
  'shotgate': { lat: 51.6078, lng: 0.5478 },
  'ashingdon': { lat: 51.5917, lng: 0.7217 },
  'barling': { lat: 51.5617, lng: 0.8317 },
  'foulness': { lat: 51.5917, lng: 0.9117 },
  'great-burstead': { lat: 51.6117, lng: 0.4417 },
  // Thurrock Additional
  'purfleet': { lat: 51.4817, lng: 0.2378 },
  'aveley': { lat: 51.5117, lng: 0.2517 },
  'west-thurrock': { lat: 51.4778, lng: 0.2617 },
  'lakeside': { lat: 51.4856, lng: 0.2789 },
  'orsett': { lat: 51.5117, lng: 0.3717 },
  'horndon-on-the-hill': { lat: 51.5217, lng: 0.4017 },
  // Brentwood Additional
  'pilgrims-hatch': { lat: 51.6317, lng: 0.2817 },
  'warley': { lat: 51.6117, lng: 0.2917 },
  'ingrave': { lat: 51.6117, lng: 0.3517 },
  // Chelmsford Additional
  'galleywood': { lat: 51.7017, lng: 0.4717 },
  'great-waltham': { lat: 51.7817, lng: 0.4317 },
  'little-waltham': { lat: 51.7617, lng: 0.4617 },
  'boreham': { lat: 51.7617, lng: 0.5217 },
  'sandon': { lat: 51.7017, lng: 0.5217 },
  'terling': { lat: 51.8017, lng: 0.5617 },
  // Braintree Additional
  'bocking': { lat: 51.8917, lng: 0.5617 },
  // Maldon Additional
  'tollesbury': { lat: 51.7617, lng: 0.8417 },
  'tolleshunt-darcy': { lat: 51.7817, lng: 0.7917 },
  'goldhanger': { lat: 51.7517, lng: 0.7417 },
  'tillingham': { lat: 51.6817, lng: 0.8617 },
  'bradwell-on-sea': { lat: 51.7217, lng: 0.9017 },
  // Tendring/Colchester Additional
  'st-osyth': { lat: 51.7978, lng: 1.0817 },
  'great-bentley': { lat: 51.8617, lng: 1.0617 },
  'great-bromley': { lat: 51.9017, lng: 1.0417 },
  'little-clacton': { lat: 51.8217, lng: 1.1317 },
  'great-clacton': { lat: 51.7978, lng: 1.1417 },
  'lawford': { lat: 51.9417, lng: 1.0417 },
  'bradfield': { lat: 51.9517, lng: 1.1217 },
  'parkeston': { lat: 51.9417, lng: 1.2617 },
  'ramsey': { lat: 51.9317, lng: 1.2417 },
  'thorrington': { lat: 51.8317, lng: 1.0017 },
  'alresford': { lat: 51.8517, lng: 0.9817 },
  'copford': { lat: 51.8617, lng: 0.8117 },
  'fordham': { lat: 51.9217, lng: 0.8117 },
  'fingringhoe': { lat: 51.8317, lng: 0.9617 },
  'abberton': { lat: 51.8217, lng: 0.8817 },
  'birch': { lat: 51.8417, lng: 0.8217 },
  'langham': { lat: 51.9617, lng: 0.9617 },
  // West Essex Additional
  'abridge': { lat: 51.6517, lng: 0.0817 },
  'thornwood': { lat: 51.7117, lng: 0.1317 },
  // Greater London Border Additional
  'manor-park': { lat: 51.5517, lng: 0.0417 },
  'enfield': { lat: 51.6517, lng: -0.0817 },
  'cheshunt': { lat: 51.7017, lng: -0.0317 },
  'sawbridgeworth': { lat: 51.8117, lng: 0.1517 },
  'bishops-stortford': { lat: 51.8717, lng: 0.1617 },
  'hackney': { lat: 51.5467, lng: -0.0556 },
  'nayland': { lat: 51.9717, lng: 0.8717 },
  // ===== Final Gap Closure =====
  // Basildon/South Essex
  'langdon-hills': { lat: 51.5617, lng: 0.4317 },
  'rawreth': { lat: 51.5978, lng: 0.5617 },
  'battlesbridge': { lat: 51.6217, lng: 0.5617 },
  'canewdon': { lat: 51.6017, lng: 0.7417 },
  // Thurrock/Brentwood
  'bulphan': { lat: 51.5317, lng: 0.3517 },
  'childerditch': { lat: 51.5917, lng: 0.2817 },
  'herongate': { lat: 51.6017, lng: 0.3317 },
  'thorndon': { lat: 51.6017, lng: 0.3517 },
  'doddinghurst': { lat: 51.6517, lng: 0.2617 },
  'kelvedon-hatch': { lat: 51.6617, lng: 0.2517 },
  // Chelmsford
  'pleshey': { lat: 51.8017, lng: 0.4117 },
  'little-baddow': { lat: 51.7317, lng: 0.5417 },
  'howe-green': { lat: 51.6917, lng: 0.5117 },
  'fairstead': { lat: 51.8217, lng: 0.5917 },
  // Braintree
  'gosfield': { lat: 51.9217, lng: 0.5717 },
  'stisted': { lat: 51.8617, lng: 0.6117 },
  // Maldon/Dengie
  'dengie': { lat: 51.6717, lng: 0.8817 },
  'asheldham': { lat: 51.6617, lng: 0.8717 },
  'salcott': { lat: 51.7817, lng: 0.8117 },
  // Colchester/Tendring
  'aldham': { lat: 51.8917, lng: 0.7917 },
  'eight-ash-green': { lat: 51.8917, lng: 0.8117 },
  'easthorpe': { lat: 51.8517, lng: 0.7917 },
  'langenhoe': { lat: 51.8217, lng: 0.9317 },
  'peldon': { lat: 51.8017, lng: 0.8917 },
  'frating': { lat: 51.8717, lng: 1.0217 },
  'little-bromley': { lat: 51.9117, lng: 1.0617 },
  'little-oakley': { lat: 51.9217, lng: 1.2117 },
  'wrabness': { lat: 51.9517, lng: 1.1617 },
  'point-clear': { lat: 51.7917, lng: 1.0517 },
  // Suffolk border
  'stoke-by-nayland': { lat: 51.9817, lng: 0.9017 },
  'bures': { lat: 51.9717, lng: 0.7717 },
  'stratford-st-mary': { lat: 51.9717, lng: 0.9917 },
  // West Essex
  'coopersale': { lat: 51.7017, lng: 0.1217 },
  'stapleford-abbotts': { lat: 51.6317, lng: 0.1317 },
  // Greater London
  'forest-gate': { lat: 51.5517, lng: 0.0217 },
  'woodgrange-park': { lat: 51.5517, lng: 0.0317 },
  'clapton': { lat: 51.5617, lng: -0.0517 },
  'homerton': { lat: 51.5467, lng: -0.0417 },
  'edmonton': { lat: 51.6217, lng: -0.0617 },
  'southgate': { lat: 51.6317, lng: -0.1217 },
  // Hertfordshire
  'broxbourne': { lat: 51.7467, lng: -0.0117 },
  'hoddesdon': { lat: 51.7617, lng: -0.0117 },
  'sheering': { lat: 51.7917, lng: 0.1817 },
  'gilston': { lat: 51.7817, lng: 0.0817 },
  'takeley': { lat: 51.8617, lng: 0.2517 },
  'great-hallingbury': { lat: 51.8717, lng: 0.2217 },
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
