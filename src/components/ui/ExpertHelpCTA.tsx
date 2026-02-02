'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, ctaLinks } from '@/lib/constants';

type ExpertHelpCTAProps = {
  /** 'link' navigates to quote page, 'scroll' scrolls to a form on the same page */
  variant?: 'link' | 'scroll';
  /** Target element ID for scroll variant (default: 'quote-form') */
  scrollTarget?: string;
  /** Additional className for the section */
  className?: string;
};

const AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    alt: 'Aquapro cleaning specialist',
  },
  {
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
    alt: 'Aquapro team manager',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200',
    alt: 'Aquapro cleaning technician',
  },
];

export function ExpertHelpCTA({
  variant = 'link',
  scrollTarget = 'quote-form',
  className = '',
}: ExpertHelpCTAProps) {
  const handleScroll = () => {
    const element = document.getElementById(scrollTarget);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buttonClasses =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-cta rounded-full shadow-lg hover:bg-cta-hover hover:shadow-xl transition-all transform hover:-translate-y-0.5';

  return (
    <section className={`py-8 md:py-10 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-50 rounded-[2rem] py-8 md:py-10 px-6 text-center overflow-hidden border border-slate-100 shadow-sm">
          {/* Subtle Abstract Background Shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 -left-10 w-64 h-64 bg-brand-100/40 rounded-full blur-3xl -translate-y-1/2 mix-blend-multiply" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl mix-blend-multiply" />
            <svg
              className="absolute inset-0 w-full h-full text-brand-900 opacity-[0.03]"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <circle cx="0" cy="150" r="250" fill="currentColor" />
              <circle cx="800" cy="300" r="150" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Avatars */}
            <div className="flex justify-center items-center -space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full border-[3px] border-slate-50 overflow-hidden relative z-10 shadow-sm">
                <Image
                  src={AVATARS[0].src}
                  alt={AVATARS[0].alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full border-[3px] border-slate-50 overflow-hidden relative z-20 shadow-md transform -translate-y-1">
                <Image
                  src={AVATARS[1].src}
                  alt={AVATARS[1].alt}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-slate-50 overflow-hidden relative z-10 shadow-sm">
                <Image
                  src={AVATARS[2].src}
                  alt={AVATARS[2].alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
              Need help from our experts?
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto">
              Not sure what you need? From stubborn carpet stains to mossy roofs, we&apos;ll recommend the right solution for your home or business.
            </p>

            {variant === 'link' ? (
              <Link href={ctaLinks.quote} className={buttonClasses}>
                Get a Free Quote
              </Link>
            ) : (
              <button onClick={handleScroll} className={buttonClasses}>
                Get a Free Quote
              </button>
            )}

            {/* Secondary contact info */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <a
                href={siteConfig.contact.phoneHref}
                className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <span className="hidden sm:inline text-slate-300">|</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
