'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Lock } from 'lucide-react';
import { ctaLinks, reviewStatsDisplay } from '@/lib/constants';

export function HeroSection() {
  return (
    <div
      id="hero"
      className="relative bg-[#0F172A] pt-8 pb-6 md:pb-12 lg:py-24 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blake-window-cleaning.jpg"
          alt="Aquapro professional window cleaning"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={65}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/95 to-[#0F172A]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left mb-8 lg:mb-0">
            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-slate-300 text-xs lg:text-sm font-medium">
                {reviewStatsDisplay.averageRating} based on {reviewStatsDisplay.totalReviews} verified reviews
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 lg:mb-6">
              Complete Interior & <br />
              <span className="text-brand-500">Exterior Cleaning Solutions</span>
            </h1>

            {/* Subtext */}
            <p className="text-base lg:text-lg font-medium text-slate-300 mb-8 lg:mb-12 max-w-lg sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              From sparkling windows to pristine offices, we restore every inch
              of your property. Professional, reliable, and fully insured
              services for homes and businesses.
            </p>

            {/* Logos Section - Accreditations */}
            <div className="flex flex-col items-center lg:items-start gap-4 pt-8">
              <span className="text-slate-500 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                Approved & Accredited By
              </span>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 items-center">
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

          {/* Right Content - Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 text-center lg:text-left">
                Get a Free Quote
              </h2>
              <p className="text-slate-500 text-sm mb-5 lg:mb-6 text-center lg:text-left">
                Enter your details below for a fast, fixed price.
              </p>

              <form
                className="space-y-3 lg:space-y-4"
                action="/contact"
                method="GET"
              >
                {/* Row 1: Full Name & Postcode */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50 text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50 text-sm lg:text-base"
                  />
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50 text-sm lg:text-base"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50 text-sm lg:text-base"
                  />
                </div>

                {/* Row 3: Service Details */}
                <div>
                  <textarea
                    name="message"
                    placeholder="What service do you need?"
                    rows={3}
                    className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-slate-50 resize-none text-sm lg:text-base"
                   />
                </div>

                <Link
                  href={ctaLinks.quote}
                  className="block w-full bg-cta hover:bg-cta-hover text-white font-bold py-3 lg:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base lg:text-lg text-center"
                >
                  Get Your Free Quote
                </Link>

                <div className="flex items-center justify-center gap-4 mt-3 lg:mt-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Takes under 60 seconds</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>No obligation quote</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
