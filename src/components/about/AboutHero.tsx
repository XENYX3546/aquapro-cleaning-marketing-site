'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { reviewStatsDisplay } from '@/lib/constants';

export function AboutHero() {
  return (
    <div className="relative bg-[#0F172A] pt-8 pb-6 md:pb-12 lg:py-24 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/blake-van-image.jpg"
          alt="Aquapro team with company van"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={65}
        />
        {/* Solid dark overlay to wash out the image */}
        <div className="absolute inset-0 bg-slate-900/85 mix-blend-multiply" />
        {/* Gradient to ensure left text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left mb-8 lg:mb-0">
            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300 text-xs lg:text-sm font-medium">
                {reviewStatsDisplay.averageRating} based on {reviewStatsDisplay.totalReviews} verified reviews
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 lg:mb-6">
              Professional Cleaning <br />
              <span className="text-brand-500">With a Personal Touch</span>
            </h1>

            {/* Subtext */}
            <p className="text-base lg:text-lg font-medium text-slate-300 mb-8 lg:mb-12 max-w-lg sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              We are a team of dedicated cleaning professionals committed to
              restoring the beauty of your property. Fully insured, highly
              trained, and trusted by hundreds of local businesses and
              homeowners.
            </p>

            {/* Badges Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-8">
              <span className="text-slate-500 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase whitespace-nowrap">
                Approved & Accredited By
              </span>

              <div className="hidden sm:block w-px h-8 bg-slate-700" />

              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center">
                {/* Google Guaranteed */}
                <div className="flex flex-col items-center group cursor-default">
                  <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-bold text-white">Google</span>
                  </div>
                  <div className="bg-green-700 text-[9px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1 shadow-sm">
                    Guaranteed
                  </div>
                </div>

                {/* Smart Seal */}
                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-lg font-black text-white italic tracking-tighter">
                    Smart
                  </span>
                  <span className="text-lg font-black text-slate-500 italic tracking-tighter">
                    Seal
                  </span>
                </div>

                {/* City & Guilds */}
                <div className="flex flex-col items-start leading-none opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex gap-0.5">
                    <span className="text-xs font-bold text-white">City&</span>
                  </div>
                  <span className="text-xs font-bold text-white">Guilds</span>
                  <div className="w-full h-[2px] bg-[#1B9CB6] mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Main Hero Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group transform transition-transform duration-500 hover:scale-[1.01] h-[500px]">
              <Image
                src="/images/blake-van-image.jpg"
                alt="Aquapro professional cleaning team at work"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={65}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <p className="text-white font-bold text-lg">
                    &quot;Excellence is not an act, but a habit.&quot;
                  </p>
                  <p className="text-brand-500 text-sm mt-1">The Aquapro Promise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
