'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, Check } from 'lucide-react';
import { ctaLinks, getAllReviews, type Review } from '@/lib/constants';

// Max characters for testimonial to fit in the overlay
const MAX_TESTIMONIAL_LENGTH = 120;

function getTopFittingReview(reviews: Review[]): Review {
  const fitting = reviews.filter(r => r.text.length <= MAX_TESTIMONIAL_LENGTH);
  return fitting[0] || reviews[0];
}

export function AboutStory() {
  const review = getTopFittingReview(getAllReviews());
  return (
    <div className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image Column (Left Side) */}
          <div className="order-1 lg:order-1 mb-16 lg:mb-0 relative group">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px] lg:h-[600px] w-full transform transition-transform duration-700 hover:scale-[1.01]">
              <Image
                src="/images/blake-carpet-cleaning.png"
                alt="Aquapro technician performing professional carpet cleaning"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Testimonial Overlay - Compact & Clean */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${review.bg}`}>
                      {review.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex text-[#FBBC05] mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-700 text-sm font-medium leading-relaxed mb-2 line-clamp-2">
                        &quot;{review.text}&quot;
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {review.name}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1">
                          <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-[10px] text-green-600 font-bold uppercase tracking-wide">
                            Verified Review
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-slate-200 rounded-[2rem] hidden lg:block" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl -z-10" />
          </div>

          {/* Content Column (Right Side) */}
          <div className="order-2 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-brand-500" />
              <span className="text-brand-500 font-bold text-xs tracking-[0.2em] uppercase">
                Who We Are
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Setting the Standard <br />
              in <span className="text-brand-500">Exterior Cleaning</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              What started as a small family operation has grown into
              Essex&apos;s most trusted exterior cleaning service. We believe in
              doing the job right the first time, using the best technology
              available.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              From delicate heritage roofs to commercial industrial units, our
              certified technicians bring the same level of care and attention
              to detail to every project.
            </p>

            {/* CTA Button */}
            <div className="mb-10">
              <Link
                href={ctaLinks.quote}
                className="bg-cta hover:bg-cta-hover text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 w-fit transition-all"
              >
                Get My Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats - Horizontal Row Layout */}
            <div className="flex flex-wrap gap-8 border-y border-slate-200 py-8">
              <div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  10+
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                  Years Active
                </div>
              </div>
              <div className="w-px bg-slate-200 h-auto hidden sm:block" />
              <div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  2k+
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                  Happy Clients
                </div>
              </div>
              <div className="w-px bg-slate-200 h-auto hidden sm:block" />
              <div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  100%
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
