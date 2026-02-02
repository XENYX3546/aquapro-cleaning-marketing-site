import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, ctaLinks } from '@/lib/constants';

export function ExpertCTA() {
  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-50 rounded-[2rem] py-8 md:py-10 px-6 text-center overflow-hidden border border-slate-100 shadow-sm">
          {/* Subtle Abstract Background Shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Left large soft circle */}
            <div className="absolute top-1/2 -left-10 w-64 h-64 bg-brand-100/40 rounded-full blur-3xl -translate-y-1/2 mix-blend-multiply" />
            {/* Right large soft circle */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl mix-blend-multiply" />

            {/* Vector Circles */}
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
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Aquapro cleaning specialist"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full border-[3px] border-slate-50 overflow-hidden relative z-20 shadow-md transform -translate-y-1">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Aquapro team manager"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-slate-50 overflow-hidden relative z-10 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Aquapro cleaning technician"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
              Need help from our experts?
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              Call us on{' '}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-bold text-slate-900 hover:text-brand-600"
              >
                {siteConfig.contact.phone}
              </a>
              , lines open 8am-5pm Mon-Sat.{' '}
              <br className="hidden sm:inline" />
              Or email{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-bold text-slate-900 hover:text-brand-600"
              >
                {siteConfig.contact.email}
              </a>
            </p>

            <Link
              href={ctaLinks.quote}
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-cta rounded-full shadow-lg hover:bg-cta-hover hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
