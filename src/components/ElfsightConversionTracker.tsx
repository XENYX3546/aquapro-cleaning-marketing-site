'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a Google Ads conversion when an Elfsight form submission
 * is detected by intercepting fetch() calls to the form-submissions endpoint.
 */
export function ElfsightConversionTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = function (...args) {
      const url = typeof args[0] === 'string' ? args[0] : args[0] instanceof Request ? args[0].url : '';

      if (url.includes('form-submissions') && !firedRef.current) {
        return originalFetch.apply(this, args).then((response) => {
          if (response.ok && !firedRef.current) {
            firedRef.current = true;
            if (typeof window.gtag === 'function') {
              window.gtag('event', 'conversion', {
                send_to: 'AW-16686011342/z2LgCJHv54EcEM6nwZQ-',
                value: 1.0,
                currency: 'GBP',
              });
            }
          }
          return response;
        });
      }

      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
