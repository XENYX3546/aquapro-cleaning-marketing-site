'use client';

import { siteConfig } from '@/lib/constants';

export function PromoBanner() {
  return (
    <div className="bg-brand-500 text-white text-center py-2 font-medium">
      <div className="mx-auto w-[95%] md:w-[70%] whitespace-nowrap overflow-hidden text-ellipsis text-[11px] sm:text-[13px] md:text-[15px]">
        Available Mon–Sat, 8am–5pm |{' '}
        <a
          href={siteConfig.contact.phoneHref}
          className="underline hover:text-brand-50 transition-colors font-bold"
        >
          {siteConfig.contact.phone}
        </a>
      </div>
    </div>
  );
}
