'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

/**
 * Conditionally shows a clickable phone number during business hours
 * (Mon–Sat 08:00–20:00 UK time). Renders nothing outside those hours.
 *
 * Starts hidden to match SSR and avoid hydration mismatch.
 */
export function OpenPhoneNumber({
  variant = 'light',
  className = '',
}: {
  /** 'light' for dark backgrounds, 'dark' for light backgrounds */
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function checkOpen() {
      const now = new Date();
      const uk = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        hour12: false,
      }).formatToParts(now);
      const weekday = uk.find((p) => p.type === 'weekday')?.value ?? '';
      const hour = Number(uk.find((p) => p.type === 'hour')?.value ?? 0);
      const isSunday = weekday === 'Sun';
      return !isSunday && hour >= 8 && hour < 17;
    }
    setIsOpen(checkOpen());
    const id = setInterval(() => setIsOpen(checkOpen()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!isOpen) return null;

  const textColor = variant === 'light' ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700';

  return (
    <a
      href={siteConfig.contact.phoneHref}
      className={`inline-flex items-center justify-center gap-1.5 transition-colors ${textColor} ${className}`}
    >
      <Phone className="h-3.5 w-3.5 text-green-400" />
      <span className="text-xs font-semibold">or call {siteConfig.contact.phone}</span>
    </a>
  );
}
