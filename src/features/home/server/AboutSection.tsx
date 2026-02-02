import Image from 'next/image';
import { Icon } from '@/components/ui';
import { reviewStatsDisplay } from '@/lib/constants';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image Side - Left */}
          <div className="relative order-2 lg:order-1 mb-16 lg:mb-0">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[600px]">
              <Image
                src="/images/blake-van-image.jpg"
                alt="Aquapro Exterior Cleaning Team - Professional cleaners in Essex"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>

            {/* Decorative element behind */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-brand-100 rounded-3xl hidden lg:block" />
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-brand-50 rounded-full blur-3xl" />
          </div>

          {/* Text Side - Right */}
          <div className="order-1 lg:order-2">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-3 block">
              About Aquapro
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Dedicated to Excellence in <br className="hidden lg:block" />
              <span className="text-brand-500">Exterior Cleaning</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Founded on the principles of reliability, quality, and customer
              satisfaction, Aquapro has grown to become the trusted choice for
              homeowners and businesses alike.
            </p>

            {/* Accredited Partners */}
            <div className="mb-10 border-b border-slate-100 pb-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">
                Accredited Partners
              </span>
              <div className="flex flex-wrap gap-8 items-center opacity-70">
                {/* City & Guilds */}
                <div className="h-6">
                  <svg
                    viewBox="0 0 100 30"
                    className="h-full w-auto fill-slate-800"
                    aria-label="City & Guilds Accredited"
                  >
                    <text
                      x="0"
                      y="22"
                      fontFamily="sans-serif"
                      fontWeight="900"
                      fontSize="24"
                      letterSpacing="-1"
                    >
                      City<tspan fill="#1B9CB6">&amp;</tspan>Guilds
                    </text>
                  </svg>
                </div>

                {/* Checkatrade */}
                <div className="flex items-center gap-1.5 h-6">
                  <div className="h-5 w-5 rounded border-2 border-slate-800 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 fill-none stroke-slate-800 stroke-[3]"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-none">
                    Checkatrade
                  </span>
                </div>

                {/* SafeContractor */}
                <div className="flex items-center gap-1 h-6">
                  <span className="font-bold text-slate-800 text-lg leading-none tracking-tight">
                    SafeContractor
                  </span>
                  <div className="h-4 w-4 bg-[#1B9CB6] rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-2.5 h-2.5 fill-none stroke-white stroke-[3]"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {/* Stat 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Icon name="clock" size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl leading-none mb-1">
                    10+ Years
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    Experience
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Icon name="users" size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl leading-none mb-1">
                    2k+ Clients
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    Happy Customers
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Icon name="star" size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl leading-none mb-1">
                    5 Star Rated
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    {reviewStatsDisplay.totalReviews} Reviews
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Icon name="shield-check" size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl leading-none mb-1">
                    Fully Insured
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    100% Protection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
